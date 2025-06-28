import numpy as np
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    roc_auc_score, confusion_matrix, classification_report
)
from typing import Dict, List, Any

def calculate_metrics(y_true: np.ndarray, y_pred: np.ndarray, y_prob: np.ndarray = None) -> Dict[str, float]:
    """Calculate comprehensive classification metrics"""
    metrics = {
        'accuracy': accuracy_score(y_true, y_pred),
        'precision': precision_score(y_true, y_pred, average='binary'),
        'recall': recall_score(y_true, y_pred, average='binary'),
        'f1_score': f1_score(y_true, y_pred, average='binary'),
    }
    
    if y_prob is not None:
        metrics['auc'] = roc_auc_score(y_true, y_prob)
    
    return metrics

def calculate_confusion_matrix(y_true: np.ndarray, y_pred: np.ndarray) -> Dict[str, int]:
    """Calculate confusion matrix components"""
    tn, fp, fn, tp = confusion_matrix(y_true, y_pred).ravel()
    
    return {
        'true_negatives': int(tn),
        'false_positives': int(fp),
        'false_negatives': int(fn),
        'true_positives': int(tp)
    }

def calculate_model_performance(predictions: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Calculate performance metrics from prediction results"""
    if not predictions:
        return {}
    
    # Extract actual vs predicted (mock data for demo)
    fraud_scores = [p.get('fraudScore', 0) for p in predictions]
    risk_levels = [p.get('riskLevel', 'low') for p in predictions]
    
    # Calculate statistics
    avg_fraud_score = np.mean(fraud_scores)
    high_risk_count = sum(1 for level in risk_levels if level == 'high')
    medium_risk_count = sum(1 for level in risk_levels if level == 'medium')
    low_risk_count = sum(1 for level in risk_levels if level == 'low')
    
    return {
        'total_predictions': len(predictions),
        'average_fraud_score': avg_fraud_score,
        'high_risk_count': high_risk_count,
        'medium_risk_count': medium_risk_count,
        'low_risk_count': low_risk_count,
        'high_risk_percentage': (high_risk_count / len(predictions)) * 100,
        'fraud_detection_rate': (high_risk_count / len(predictions)) * 100
    }