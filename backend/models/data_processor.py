import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import Dict, List, Any
import logging

logger = logging.getLogger(__name__)

class DataProcessor:
    def __init__(self):
        self.merchant_risk_scores = {}
        self.location_risk_scores = {}
        self.user_profiles = {}
        
    def process_single_transaction(self, transaction: Dict[str, Any]) -> Dict[str, float]:
        """Process a single transaction into features for model input"""
        try:
            # Extract basic features
            amount = float(transaction.get('amount', 0))
            merchant = transaction.get('merchant', 'unknown')
            category = transaction.get('category', 'unknown')
            location = transaction.get('location', 'unknown')
            user_id = transaction.get('userId', 'unknown')
            device_id = transaction.get('deviceId', 'unknown')
            
            # Parse timestamp
            timestamp_str = transaction.get('timestamp')
            if timestamp_str:
                timestamp = datetime.fromisoformat(timestamp_str.replace('Z', '+00:00'))
            else:
                timestamp = datetime.utcnow()
            
            # Feature engineering
            features = {
                'amount': amount,
                'amount_log': np.log1p(amount),
                'hour': timestamp.hour,
                'day_of_week': timestamp.weekday(),
                'is_weekend': 1 if timestamp.weekday() >= 5 else 0,
                'is_night': 1 if timestamp.hour < 6 or timestamp.hour > 22 else 0,
                'merchant_risk': self._get_merchant_risk(merchant),
                'location_risk': self._get_location_risk(location),
                'category_risk': self._get_category_risk(category),
                'user_age_days': self._get_user_age_days(user_id),
                'transaction_frequency': self._get_transaction_frequency(user_id),
                'amount_zscore': self._calculate_amount_zscore(amount, user_id),
                'time_since_last': self._get_time_since_last_transaction(user_id),
                'device_risk': self._get_device_risk(device_id),
                'velocity_1h': self._get_velocity(user_id, hours=1),
                'velocity_24h': self._get_velocity(user_id, hours=24),
                'cross_border': self._is_cross_border_transaction(user_id, location),
                'high_amount': 1 if amount > 1000 else 0,
                'round_amount': 1 if amount % 100 == 0 else 0
            }
            
            return features
            
        except Exception as e:
            logger.error(f"Error processing transaction: {e}")
            # Return default features on error
            return self._get_default_features()
    
    def _get_merchant_risk(self, merchant: str) -> float:
        """Get risk score for merchant"""
        if merchant not in self.merchant_risk_scores:
            # Assign risk based on merchant name patterns
            risk = 0.1  # Default low risk
            
            if any(keyword in merchant.lower() for keyword in ['unknown', 'temp', 'test']):
                risk = 0.8
            elif any(keyword in merchant.lower() for keyword in ['casino', 'gambling', 'crypto']):
                risk = 0.7
            elif any(keyword in merchant.lower() for keyword in ['amazon', 'walmart', 'target']):
                risk = 0.1
            else:
                risk = np.random.uniform(0.1, 0.5)  # Random risk for demo
            
            self.merchant_risk_scores[merchant] = risk
        
        return self.merchant_risk_scores[merchant]
    
    def _get_location_risk(self, location: str) -> float:
        """Get risk score for location"""
        if location not in self.location_risk_scores:
            # Assign risk based on location patterns
            risk = 0.2  # Default risk
            
            if any(country in location.lower() for country in ['nigeria', 'russia', 'china']):
                risk = 0.8
            elif any(country in location.lower() for country in ['usa', 'canada', 'uk', 'germany']):
                risk = 0.1
            else:
                risk = np.random.uniform(0.1, 0.6)  # Random risk for demo
            
            self.location_risk_scores[location] = risk
        
        return self.location_risk_scores[location]
    
    def _get_category_risk(self, category: str) -> float:
        """Get risk score for transaction category"""
        category_risks = {
            'grocery': 0.05,
            'gas': 0.1,
            'restaurant': 0.1,
            'retail': 0.2,
            'online': 0.4,
            'other': 0.5
        }
        return category_risks.get(category.lower(), 0.3)
    
    def _get_user_age_days(self, user_id: str) -> float:
        """Get user account age in days"""
        if user_id not in self.user_profiles:
            # Mock user creation date
            days_ago = np.random.randint(1, 1000)
            self.user_profiles[user_id] = {
                'created_date': datetime.utcnow() - timedelta(days=days_ago),
                'transaction_count': 0,
                'total_amount': 0,
                'last_transaction': None
            }
        
        profile = self.user_profiles[user_id]
        age_days = (datetime.utcnow() - profile['created_date']).days
        return float(age_days)
    
    def _get_transaction_frequency(self, user_id: str) -> float:
        """Get user's transaction frequency"""
        if user_id in self.user_profiles:
            profile = self.user_profiles[user_id]
            age_days = (datetime.utcnow() - profile['created_date']).days
            if age_days > 0:
                return profile['transaction_count'] / age_days
        return 0.1  # Default frequency
    
    def _calculate_amount_zscore(self, amount: float, user_id: str) -> float:
        """Calculate z-score of amount relative to user's history"""
        if user_id in self.user_profiles:
            profile = self.user_profiles[user_id]
            if profile['transaction_count'] > 0:
                avg_amount = profile['total_amount'] / profile['transaction_count']
                # Simplified z-score calculation
                return (amount - avg_amount) / max(avg_amount * 0.5, 100)
        return 0.0
    
    def _get_time_since_last_transaction(self, user_id: str) -> float:
        """Get hours since last transaction"""
        if user_id in self.user_profiles:
            profile = self.user_profiles[user_id]
            if profile['last_transaction']:
                delta = datetime.utcnow() - profile['last_transaction']
                return delta.total_seconds() / 3600  # Convert to hours
        return 24.0  # Default 24 hours
    
    def _get_device_risk(self, device_id: str) -> float:
        """Get risk score for device"""
        # Mock device risk based on device ID patterns
        if 'unknown' in device_id.lower() or 'temp' in device_id.lower():
            return 0.8
        return np.random.uniform(0.1, 0.4)
    
    def _get_velocity(self, user_id: str, hours: int) -> float:
        """Get transaction velocity (transactions per hour)"""
        # Mock velocity calculation
        return np.random.uniform(0, 2)  # 0-2 transactions per hour
    
    def _is_cross_border_transaction(self, user_id: str, location: str) -> float:
        """Check if transaction is cross-border"""
        # Mock cross-border detection
        return 1.0 if np.random.random() < 0.1 else 0.0
    
    def _get_default_features(self) -> Dict[str, float]:
        """Return default features when processing fails"""
        return {
            'amount': 0.0,
            'amount_log': 0.0,
            'hour': 12,
            'day_of_week': 1,
            'is_weekend': 0,
            'is_night': 0,
            'merchant_risk': 0.3,
            'location_risk': 0.3,
            'category_risk': 0.3,
            'user_age_days': 30,
            'transaction_frequency': 0.1,
            'amount_zscore': 0.0,
            'time_since_last': 24.0,
            'device_risk': 0.3,
            'velocity_1h': 0.5,
            'velocity_24h': 5.0,
            'cross_border': 0.0,
            'high_amount': 0,
            'round_amount': 0
        }
    
    def update_user_profile(self, user_id: str, transaction: Dict[str, Any]):
        """Update user profile with new transaction"""
        if user_id not in self.user_profiles:
            self.user_profiles[user_id] = {
                'created_date': datetime.utcnow() - timedelta(days=30),
                'transaction_count': 0,
                'total_amount': 0,
                'last_transaction': None
            }
        
        profile = self.user_profiles[user_id]
        profile['transaction_count'] += 1
        profile['total_amount'] += float(transaction.get('amount', 0))
        profile['last_transaction'] = datetime.utcnow()