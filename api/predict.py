"""
Vercel Python Serverless Function - Prediction
"""

import os
import sys
import json
import numpy as np
import pandas as pd
from pathlib import Path

# Add backend to path
backend_path = Path(__file__).resolve().parent.parent / "backend"
sys.path.insert(0, str(backend_path))

# Global model storage (persists across warm invocations)
_model = None
_pipeline = None
_metadata = {}

def load_model():
    """Load model and metadata lazily."""
    global _model, _pipeline, _metadata

    import joblib
    from preprocessing import CombinedAttributesAdder

    MODEL_FILE = backend_path / "final_model.pkl"
    PIPELINE_FILE = backend_path / "preprocessing_pipeline.pkl"
    METADATA_FILE = backend_path / "model_metadata.json"

    if _model is None and MODEL_FILE.exists() and PIPELINE_FILE.exists():
        _model = joblib.load(MODEL_FILE)
        _pipeline = joblib.load(PIPELINE_FILE)

    if not _metadata and METADATA_FILE.exists():
        _metadata = json.loads(METADATA_FILE.read_text())

    return _model is not None, bool(_metadata)

def handler(request):
    """Vercel serverless function handler."""
    model_loaded, metadata_loaded = load_model()

    if not model_loaded:
        return {
            "statusCode": 503,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "detail": "Model not loaded. Check server logs."
            })
        }

    # Parse request body
    try:
        if hasattr(request, 'body'):
            body = request.body
        else:
            body = request.get('body', '{}')

        if isinstance(body, str):
            features = json.loads(body)
        else:
            features = body
    except json.JSONDecodeError:
        return {
            "statusCode": 400,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({"detail": "Invalid JSON"})
        }

    # Validate required fields
    required_fields = [
        "longitude", "latitude", "housing_median_age", "total_rooms",
        "total_bedrooms", "population", "households", "median_income",
        "ocean_proximity"
    ]

    for field in required_fields:
        if field not in features:
            return {
                "statusCode": 400,
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                "body": json.dumps({"detail": f"Missing field: {field}"})
            }

    try:
        # Create input DataFrame
        input_df = pd.DataFrame([{
            "longitude": float(features["longitude"]),
            "latitude": float(features["latitude"]),
            "housing_median_age": float(features["housing_median_age"]),
            "total_rooms": float(features["total_rooms"]),
            "total_bedrooms": float(features["total_bedrooms"]),
            "population": float(features["population"]),
            "households": float(features["households"]),
            "median_income": float(features["median_income"]),
            "ocean_proximity": str(features["ocean_proximity"]),
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

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "predicted_price": prediction,
                "lower_bound": lower_bound,
                "upper_bound": upper_bound,
                "confidence": confidence,
            })
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({"detail": f"Prediction failed: {str(e)}"})
        }

if __name__ == "__main__":
    class MockRequest:
        body = json.dumps({
            "longitude": -122.23,
            "latitude": 37.88,
            "housing_median_age": 41,
            "total_rooms": 880,
            "total_bedrooms": 129,
            "population": 322,
            "households": 126,
            "median_income": 8.3252,
            "ocean_proximity": "NEAR BAY"
        })
    print(json.dumps(handler(MockRequest()), indent=2))