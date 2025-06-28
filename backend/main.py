from fastapi import FastAPI, HTTPException, Depends, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import pandas as pd
import numpy as np
import joblib
import json
import asyncio
from datetime import datetime, timedelta
import logging
from models.fraud_detector import FraudDetector
from models.data_processor import DataProcessor
from utils.auth import verify_token
from utils.metrics import calculate_metrics

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="FraudGuard API",
    description="Advanced Fraud Detection System API",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Global instances
fraud_detector = FraudDetector()
data_processor = DataProcessor()

# Pydantic models
class TransactionRequest(BaseModel):
    amount: float
    merchant: str
    category: str
    location: str
    userId: str
    deviceId: str
    timestamp: Optional[str] = None

class PredictionResponse(BaseModel):
    id: str
    fraudScore: float
    riskLevel: str
    isFraud: bool
    confidence: float
    modelUsed: str
    timestamp: str
    features: Dict[str, float]
    explanation: Optional[Dict[str, Any]] = None

class BatchPredictionRequest(BaseModel):
    transactions: List[TransactionRequest]

class ModelMetrics(BaseModel):
    name: str
    accuracy: float
    precision: float
    recall: float
    f1_score: float
    auc: float

@app.on_event("startup")
async def startup_event():
    """Initialize models and load pre-trained weights"""
    try:
        await fraud_detector.initialize()
        logger.info("Fraud detection models initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize models: {e}")

@app.get("/")
async def root():
    return {
        "message": "FraudGuard API",
        "version": "1.0.0",
        "status": "operational",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "models_loaded": fraud_detector.is_initialized()
    }

@app.post("/predict", response_model=PredictionResponse)
async def predict_fraud(
    transaction: TransactionRequest,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Predict fraud for a single transaction"""
    try:
        # Verify authentication (optional - remove if not needed)
        # user = verify_token(credentials.credentials)
        
        # Process transaction
        processed_data = data_processor.process_single_transaction(transaction.dict())
        
        # Make prediction
        prediction = await fraud_detector.predict(processed_data)
        
        # Generate explanation
        explanation = fraud_detector.explain_prediction(processed_data)
        
        response = PredictionResponse(
            id=f"TXN-{datetime.utcnow().strftime('%Y%m%d%H%M%S')}-{np.random.randint(1000, 9999)}",
            fraudScore=prediction['fraud_score'],
            riskLevel=prediction['risk_level'],
            isFraud=prediction['is_fraud'],
            confidence=prediction['confidence'],
            modelUsed=prediction['model_used'],
            timestamp=datetime.utcnow().isoformat(),
            features=explanation['feature_importance'],
            explanation=explanation
        )
        
        logger.info(f"Prediction completed for transaction {response.id}")
        return response
        
    except Exception as e:
        logger.error(f"Prediction failed: {e}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@app.post("/predict/batch")
async def predict_batch(
    request: BatchPredictionRequest,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Predict fraud for multiple transactions"""
    try:
        # Process all transactions
        processed_data = [
            data_processor.process_single_transaction(txn.dict()) 
            for txn in request.transactions
        ]
        
        # Make batch predictions
        predictions = await fraud_detector.predict_batch(processed_data)
        
        responses = []
        for i, (txn, pred) in enumerate(zip(request.transactions, predictions)):
            explanation = fraud_detector.explain_prediction(processed_data[i])
            
            response = PredictionResponse(
                id=f"BATCH-{datetime.utcnow().strftime('%Y%m%d%H%M%S')}-{i+1:04d}",
                fraudScore=pred['fraud_score'],
                riskLevel=pred['risk_level'],
                isFraud=pred['is_fraud'],
                confidence=pred['confidence'],
                modelUsed=pred['model_used'],
                timestamp=datetime.utcnow().isoformat(),
                features=explanation['feature_importance'],
                explanation=explanation
            )
            responses.append(response)
        
        logger.info(f"Batch prediction completed for {len(responses)} transactions")
        return {"predictions": responses, "total": len(responses)}
        
    except Exception as e:
        logger.error(f"Batch prediction failed: {e}")
        raise HTTPException(status_code=500, detail=f"Batch prediction failed: {str(e)}")

@app.get("/models/metrics")
async def get_model_metrics():
    """Get performance metrics for all models"""
    try:
        metrics = fraud_detector.get_model_metrics()
        return {"metrics": metrics, "timestamp": datetime.utcnow().isoformat()}
    except Exception as e:
        logger.error(f"Failed to get model metrics: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to get metrics: {str(e)}")

@app.post("/models/retrain")
async def retrain_models(
    file: UploadFile = File(...),
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Retrain models with new data"""
    try:
        # Read uploaded file
        content = await file.read()
        
        if file.filename.endswith('.csv'):
            df = pd.read_csv(io.StringIO(content.decode('utf-8')))
        elif file.filename.endswith('.json'):
            data = json.loads(content.decode('utf-8'))
            df = pd.DataFrame(data)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format")
        
        # Retrain models
        result = await fraud_detector.retrain(df)
        
        logger.info("Models retrained successfully")
        return {
            "message": "Models retrained successfully",
            "metrics": result,
            "timestamp": datetime.utcnow().isoformat()
        }
        
    except Exception as e:
        logger.error(f"Model retraining failed: {e}")
        raise HTTPException(status_code=500, detail=f"Retraining failed: {str(e)}")

@app.get("/analytics/trends")
async def get_fraud_trends(
    time_range: str = "7d",
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Get fraud trends over time"""
    try:
        # Generate mock trend data (replace with actual data retrieval)
        trends = generate_mock_trends(time_range)
        return {
            "trends": trends,
            "time_range": time_range,
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        logger.error(f"Failed to get trends: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to get trends: {str(e)}")

@app.get("/analytics/geographic")
async def get_geographic_analysis(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Get geographic fraud analysis"""
    try:
        # Generate mock geographic data
        geographic_data = generate_mock_geographic_data()
        return {
            "geographic_analysis": geographic_data,
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        logger.error(f"Failed to get geographic analysis: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to get geographic analysis: {str(e)}")

def generate_mock_trends(time_range: str) -> List[Dict]:
    """Generate mock trend data"""
    points = {"24h": 24, "7d": 7, "30d": 30, "90d": 90}[time_range]
    
    trends = []
    for i in range(points):
        trends.append({
            "timestamp": (datetime.utcnow() - timedelta(hours=i)).isoformat(),
            "fraud_count": np.random.randint(5, 25),
            "total_transactions": np.random.randint(200, 800),
            "fraud_rate": np.random.uniform(0.5, 3.0)
        })
    
    return trends

def generate_mock_geographic_data() -> List[Dict]:
    """Generate mock geographic data"""
    regions = [
        {"name": "North America", "fraud_rate": 1.2, "risk_level": "low"},
        {"name": "Europe", "fraud_rate": 0.8, "risk_level": "low"},
        {"name": "Asia Pacific", "fraud_rate": 2.1, "risk_level": "medium"},
        {"name": "Latin America", "fraud_rate": 3.4, "risk_level": "high"},
        {"name": "Middle East", "fraud_rate": 2.8, "risk_level": "medium"},
        {"name": "Africa", "fraud_rate": 4.2, "risk_level": "high"},
    ]
    
    return regions

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)