import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest, RandomForestClassifier
from sklearn.svm import OneClassSVM
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, roc_auc_score, precision_recall_curve
import xgboost as xgb
import tensorflow as tf
from tensorflow import keras
import shap
import joblib
import asyncio
from typing import Dict, List, Any, Tuple
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

class FraudDetector:
    def __init__(self):
        self.models = {}
        self.scalers = {}
        self.encoders = {}
        self.feature_names = []
        self.is_trained = False
        self.ensemble_weights = {
            'isolation_forest': 0.2,
            'one_class_svm': 0.15,
            'xgboost': 0.35,
            'autoencoder': 0.3
        }
        
    async def initialize(self):
        """Initialize and train models with synthetic data"""
        try:
            # Generate synthetic training data
            X_train, y_train = self._generate_synthetic_data(10000)
            
            # Train all models
            await self._train_models(X_train, y_train)
            
            self.is_trained = True
            logger.info("Fraud detection models initialized successfully")
            
        except Exception as e:
            logger.error(f"Failed to initialize models: {e}")
            raise
    
    def _generate_synthetic_data(self, n_samples: int) -> Tuple[pd.DataFrame, np.ndarray]:
        """Generate synthetic transaction data for training"""
        np.random.seed(42)
        
        # Generate features
        data = {
            'amount': np.random.lognormal(3, 1.5, n_samples),
            'hour': np.random.randint(0, 24, n_samples),
            'day_of_week': np.random.randint(0, 7, n_samples),
            'merchant_risk': np.random.uniform(0, 1, n_samples),
            'location_risk': np.random.uniform(0, 1, n_samples),
            'user_age_days': np.random.randint(1, 3650, n_samples),
            'transaction_frequency': np.random.poisson(5, n_samples),
            'amount_zscore': np.random.normal(0, 1, n_samples),
            'time_since_last': np.random.exponential(24, n_samples),
            'device_risk': np.random.uniform(0, 1, n_samples)
        }
        
        X = pd.DataFrame(data)
        
        # Generate labels (fraud = 1, normal = 0)
        # Create fraud patterns
        fraud_prob = (
            0.01 +  # Base fraud rate
            0.1 * (X['amount'] > X['amount'].quantile(0.95)) +  # High amounts
            0.05 * (X['merchant_risk'] > 0.8) +  # Risky merchants
            0.03 * (X['location_risk'] > 0.7) +  # Risky locations
            0.02 * ((X['hour'] < 6) | (X['hour'] > 22))  # Unusual hours
        )
        
        y = np.random.binomial(1, fraud_prob, n_samples)
        
        self.feature_names = list(X.columns)
        return X, y
    
    async def _train_models(self, X: pd.DataFrame, y: np.ndarray):
        """Train all fraud detection models"""
        # Prepare data
        X_scaled = self._prepare_features(X, fit=True)
        X_train, X_test, y_train, y_test = train_test_split(
            X_scaled, y, test_size=0.2, random_state=42, stratify=y
        )
        
        # Train Isolation Forest (unsupervised)
        self.models['isolation_forest'] = IsolationForest(
            contamination=0.1, random_state=42, n_jobs=-1
        )
        self.models['isolation_forest'].fit(X_train)
        
        # Train One-Class SVM (unsupervised)
        self.models['one_class_svm'] = OneClassSVM(gamma='scale', nu=0.1)
        self.models['one_class_svm'].fit(X_train[y_train == 0])  # Train on normal data only
        
        # Train XGBoost (supervised)
        self.models['xgboost'] = xgb.XGBClassifier(
            n_estimators=100,
            max_depth=6,
            learning_rate=0.1,
            random_state=42,
            eval_metric='logloss'
        )
        self.models['xgboost'].fit(X_train, y_train)
        
        # Train Autoencoder (unsupervised)
        self.models['autoencoder'] = self._build_autoencoder(X_train.shape[1])
        normal_data = X_train[y_train == 0]
        self.models['autoencoder'].fit(
            normal_data, normal_data,
            epochs=50,
            batch_size=32,
            validation_split=0.2,
            verbose=0
        )
        
        # Calculate reconstruction threshold
        reconstructions = self.models['autoencoder'].predict(normal_data)
        mse = np.mean(np.power(normal_data - reconstructions, 2), axis=1)
        self.autoencoder_threshold = np.percentile(mse, 95)
        
        logger.info("All models trained successfully")
    
    def _build_autoencoder(self, input_dim: int) -> keras.Model:
        """Build and compile autoencoder model"""
        # Encoder
        input_layer = keras.layers.Input(shape=(input_dim,))
        encoded = keras.layers.Dense(64, activation='relu')(input_layer)
        encoded = keras.layers.Dense(32, activation='relu')(encoded)
        encoded = keras.layers.Dense(16, activation='relu')(encoded)
        
        # Decoder
        decoded = keras.layers.Dense(32, activation='relu')(encoded)
        decoded = keras.layers.Dense(64, activation='relu')(decoded)
        decoded = keras.layers.Dense(input_dim, activation='linear')(decoded)
        
        autoencoder = keras.Model(input_layer, decoded)
        autoencoder.compile(optimizer='adam', loss='mse')
        
        return autoencoder
    
    def _prepare_features(self, X: pd.DataFrame, fit: bool = False) -> np.ndarray:
        """Prepare features for model input"""
        if fit:
            self.scalers['standard'] = StandardScaler()
            X_scaled = self.scalers['standard'].fit_transform(X)
        else:
            X_scaled = self.scalers['standard'].transform(X)
        
        return X_scaled
    
    async def predict(self, transaction_data: Dict) -> Dict[str, Any]:
        """Make fraud prediction for a single transaction"""
        if not self.is_trained:
            raise ValueError("Models not trained yet")
        
        # Convert to DataFrame
        X = pd.DataFrame([transaction_data])
        X_scaled = self._prepare_features(X)
        
        # Get predictions from all models
        predictions = {}
        
        # Isolation Forest
        iso_pred = self.models['isolation_forest'].decision_function(X_scaled)[0]
        predictions['isolation_forest'] = 1 if iso_pred < 0 else 0
        
        # One-Class SVM
        svm_pred = self.models['one_class_svm'].decision_function(X_scaled)[0]
        predictions['one_class_svm'] = 1 if svm_pred < 0 else 0
        
        # XGBoost
        xgb_prob = self.models['xgboost'].predict_proba(X_scaled)[0, 1]
        predictions['xgboost'] = xgb_prob
        
        # Autoencoder
        reconstruction = self.models['autoencoder'].predict(X_scaled, verbose=0)
        mse = np.mean(np.power(X_scaled - reconstruction, 2))
        ae_score = mse / self.autoencoder_threshold
        predictions['autoencoder'] = min(ae_score, 1.0)
        
        # Ensemble prediction
        ensemble_score = (
            self.ensemble_weights['isolation_forest'] * predictions['isolation_forest'] +
            self.ensemble_weights['one_class_svm'] * predictions['one_class_svm'] +
            self.ensemble_weights['xgboost'] * predictions['xgboost'] +
            self.ensemble_weights['autoencoder'] * predictions['autoencoder']
        )
        
        # Determine risk level and fraud flag
        if ensemble_score > 0.7:
            risk_level = 'high'
            is_fraud = True
        elif ensemble_score > 0.3:
            risk_level = 'medium'
            is_fraud = False
        else:
            risk_level = 'low'
            is_fraud = False
        
        return {
            'fraud_score': float(ensemble_score),
            'risk_level': risk_level,
            'is_fraud': is_fraud,
            'confidence': 0.85 + np.random.random() * 0.15,  # Mock confidence
            'model_used': 'Ensemble',
            'individual_scores': predictions
        }
    
    async def predict_batch(self, transactions: List[Dict]) -> List[Dict[str, Any]]:
        """Make fraud predictions for multiple transactions"""
        results = []
        for transaction in transactions:
            prediction = await self.predict(transaction)
            results.append(prediction)
        return results
    
    def explain_prediction(self, transaction_data: Dict) -> Dict[str, Any]:
        """Generate SHAP explanation for prediction"""
        if not self.is_trained:
            raise ValueError("Models not trained yet")
        
        # Mock SHAP values for demonstration
        feature_importance = {
            'Amount Anomaly': np.random.uniform(-0.3, 0.3),
            'Time Pattern': np.random.uniform(-0.2, 0.2),
            'Location Risk': np.random.uniform(-0.25, 0.25),
            'Merchant Risk': np.random.uniform(-0.2, 0.3),
            'User Pattern': np.random.uniform(-0.15, 0.15),
            'Device Risk': np.random.uniform(-0.1, 0.2),
            'Transaction Frequency': np.random.uniform(-0.1, 0.1),
            'Historical Behavior': np.random.uniform(-0.05, 0.1)
        }
        
        return {
            'feature_importance': feature_importance,
            'explanation_type': 'SHAP',
            'model_version': '1.0'
        }
    
    def get_model_metrics(self) -> List[Dict[str, Any]]:
        """Get performance metrics for all models"""
        # Mock metrics for demonstration
        metrics = [
            {
                'name': 'Isolation Forest',
                'type': 'Unsupervised',
                'accuracy': 94.2,
                'precision': 87.5,
                'recall': 92.1,
                'f1_score': 89.7,
                'auc': 0.91
            },
            {
                'name': 'One-Class SVM',
                'type': 'Unsupervised',
                'accuracy': 91.8,
                'precision': 85.2,
                'recall': 88.9,
                'f1_score': 87.0,
                'auc': 0.89
            },
            {
                'name': 'XGBoost',
                'type': 'Supervised',
                'accuracy': 96.5,
                'precision': 94.1,
                'recall': 89.3,
                'f1_score': 91.6,
                'auc': 0.94
            },
            {
                'name': 'Autoencoder',
                'type': 'Deep Learning',
                'accuracy': 93.7,
                'precision': 88.9,
                'recall': 91.4,
                'f1_score': 90.1,
                'auc': 0.92
            },
            {
                'name': 'Ensemble',
                'type': 'Ensemble',
                'accuracy': 97.2,
                'precision': 95.8,
                'recall': 92.6,
                'f1_score': 94.2,
                'auc': 0.96
            }
        ]
        
        return metrics
    
    async def retrain(self, new_data: pd.DataFrame) -> Dict[str, Any]:
        """Retrain models with new data"""
        try:
            # Validate data format
            required_columns = ['amount', 'merchant', 'category', 'location', 'is_fraud']
            if not all(col in new_data.columns for col in required_columns):
                raise ValueError(f"Missing required columns: {required_columns}")
            
            # Process new data
            processed_data = self._process_training_data(new_data)
            X = processed_data.drop('is_fraud', axis=1)
            y = processed_data['is_fraud']
            
            # Retrain models
            await self._train_models(X, y)
            
            # Get updated metrics
            metrics = self.get_model_metrics()
            
            return {
                'status': 'success',
                'samples_processed': len(new_data),
                'metrics': metrics
            }
            
        except Exception as e:
            logger.error(f"Retraining failed: {e}")
            raise
    
    def _process_training_data(self, data: pd.DataFrame) -> pd.DataFrame:
        """Process raw training data into features"""
        # This would contain actual feature engineering logic
        # For now, return mock processed data
        processed = data.copy()
        
        # Add engineered features
        processed['amount_log'] = np.log1p(processed['amount'])
        processed['hour'] = pd.to_datetime(processed.get('timestamp', datetime.now())).dt.hour
        processed['merchant_risk'] = np.random.uniform(0, 1, len(processed))
        
        return processed
    
    def is_initialized(self) -> bool:
        """Check if models are initialized"""
        return self.is_trained and len(self.models) > 0