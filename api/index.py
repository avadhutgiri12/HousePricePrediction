"""
Unified FastAPI Application for House Price Prediction API
"""

import json
import sys
from pathlib import Path
from typing import Any, Dict, List, Optional

import joblib
import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator

# Add backend to path
backend_path = Path(__file__).resolve().parent.parent / "backend"
sys.path.insert(0, str(backend_path))

from preprocessing import CombinedAttributesAdder

# ============================================================================
# Pydantic Models
# ============================================================================

class PredictionRequest(BaseModel):
    """Request model for price prediction."""
    longitude: float = Field(..., description="Longitude of the property")
    latitude: float = Field(..., description="Latitude of the property")
    housing_median_age: float = Field(..., description="Median age of housing in the area")
    total_rooms: float = Field(..., description="Total number of rooms")
    total_bedrooms: float = Field(..., description="Total number of bedrooms")
    population: float = Field(..., description="Population of the area")
    households: float = Field(..., description="Number of households")
    median_income: float = Field(..., description="Median income in the area")
    ocean_proximity: str = Field(..., description="Proximity to ocean")

    @field_validator("ocean_proximity")
    @classmethod
    def validate_ocean_proximity(cls, v: str) -> str:
        valid_categories = [
            "<1H OCEAN",
            "INLAND",
            "ISLAND",
            "NEAR BAY",
            "NEAR OCEAN"
        ]
        if v not in valid_categories:
            raise ValueError(f"Invalid ocean_proximity. Must be one of: {valid_categories}")
        return v


class PredictionResponse(BaseModel):
    """Response model for price prediction."""
    predicted_price: float = Field(..., description="Predicted median house value")
    lower_bound: float = Field(..., description="Lower bound of 95% prediction interval")
    upper_bound: float = Field(..., description="Upper bound of 95% prediction interval")
    confidence: float = Field(..., description="Confidence percentage (0-100)")


class MetadataResponse(BaseModel):
    """Response model for model metadata."""
    numeric_ranges: Dict[str, Dict[str, float]] = Field(..., description="Numeric feature ranges")
    ocean_proximity_categories: List[str] = Field(..., description="Valid ocean proximity categories")
    target: str = Field(..., description="Target variable name")
    test_rmse: Optional[float] = Field(None, description="Test RMSE")
    train_rows: Optional[int] = Field(None, description="Training set size")
    test_rows: Optional[int] = Field(None, description="Test set size")


class HealthResponse(BaseModel):
    """Response model for health check."""
    status: str = Field(..., description="Service status")
    model_loaded: bool = Field(..., description="Whether the model is loaded")
    metadata_loaded: bool = Field(..., description="Whether metadata is loaded")


# ============================================================================
# Global State
# ============================================================================

_model: Any = None
_pipeline: Any = None
_metadata: Dict[str, Any] = {}


def load_model() -> tuple[bool, bool]:
    """Load model, pipeline, and metadata lazily."""
    global _model, _pipeline, _metadata

    MODEL_FILE = backend_path / "final_model.pkl"
    PIPELINE_FILE = backend_path / "preprocessing_pipeline.pkl"
    METADATA_FILE = backend_path / "model_metadata.json"

    if _model is None and MODEL_FILE.exists() and PIPELINE_FILE.exists():
        _model = joblib.load(MODEL_FILE)
        _pipeline = joblib.load(PIPELINE_FILE)

    if not _metadata and METADATA_FILE.exists():
        _metadata = json.loads(METADATA_FILE.read_text())

    return _model is not None, bool(_metadata)


# ============================================================================
# FastAPI Application
# ============================================================================

app = FastAPI(
    title="House Price Prediction API",
    description="API for predicting California housing prices using a trained Random Forest model",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
)

# CORS middleware - allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================================
# API Routes (all prefixed with /api)
# ============================================================================

@app.get("/api/health", response_model=HealthResponse, tags=["Health"])
async def health_check() -> HealthResponse:
    """
    Health check endpoint.
    Returns service status and whether model/metadata are loaded.
    """
    model_loaded, metadata_loaded = load_model()

    return HealthResponse(
        status="ok",
        model_loaded=model_loaded,
        metadata_loaded=metadata_loaded,
    )


@app.get("/api/metadata", response_model=MetadataResponse, tags=["Metadata"])
async def get_metadata() -> MetadataResponse:
    """
    Get model metadata including feature ranges and categories.
    """
    model_loaded, metadata_loaded = load_model()

    if not metadata_loaded:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Metadata not available. Run train_model.py first."
        )

    return MetadataResponse(
        numeric_ranges=_metadata.get("numeric_ranges", {}),
        ocean_proximity_categories=_metadata.get("ocean_proximity_categories", []),
        target=_metadata.get("target", "median_house_value"),
        test_rmse=_metadata.get("test_rmse"),
        train_rows=_metadata.get("train_rows"),
        test_rows=_metadata.get("test_rows"),
    )


@app.post("/api/predict", response_model=PredictionResponse, tags=["Prediction"])
async def predict(request: PredictionRequest) -> PredictionResponse:
    """
    Predict house price based on property features.
    Returns predicted price with confidence interval.
    """
    model_loaded, metadata_loaded = load_model()

    if not model_loaded:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Model not loaded. Check server logs."
        )

    try:
        # Create input DataFrame
        input_df = pd.DataFrame([{
            "longitude": request.longitude,
            "latitude": request.latitude,
            "housing_median_age": request.housing_median_age,
            "total_rooms": request.total_rooms,
            "total_bedrooms": request.total_bedrooms,
            "population": request.population,
            "households": request.households,
            "median_income": request.median_income,
            "ocean_proximity": request.ocean_proximity,
        }])

        # Transform using preprocessing pipeline
        prepared = _pipeline.transform(input_df)

        # Main prediction
        prediction = float(_model.predict(prepared)[0])

        # Confidence estimation from tree agreement
        if hasattr(_model, "estimators_") and len(_model.estimators_) > 0:
            tree_predictions = np.array([
                float(tree.predict(prepared)[0])
                for tree in _model.estimators_
            ])

            prediction = float(np.mean(tree_predictions))
            prediction_std = float(np.std(tree_predictions))

            # Approximate 95% prediction interval
            lower_bound = max(0.0, prediction - 1.96 * prediction_std)
            upper_bound = prediction + 1.96 * prediction_std

            # Relative uncertainty -> confidence
            relative_uncertainty = prediction_std / max(abs(prediction), 1.0)
            confidence = 100.0 * (1.0 - min(relative_uncertainty, 0.95))
            confidence = max(0.0, min(confidence, 100.0))
        else:
            lower_bound = prediction
            upper_bound = prediction
            confidence = 0.0

        return PredictionResponse(
            predicted_price=prediction,
            lower_bound=lower_bound,
            upper_bound=upper_bound,
            confidence=confidence,
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Prediction failed: {str(e)}"
        )


# ============================================================================
# Entry Point
# ============================================================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)