"""
Vercel Python Serverless Function - Health Check
"""

import os
import sys
import json
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

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps({
            "status": "ok",
            "model_loaded": model_loaded,
            "metadata_loaded": metadata_loaded
        })
    }

# For local testing
if __name__ == "__main__":
    class MockRequest:
        pass
    print(json.dumps(handler(MockRequest()), indent=2))