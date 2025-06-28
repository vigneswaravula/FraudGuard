import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, Eye } from 'lucide-react';
import ShapExplanation from './ShapExplanation';

interface PredictionResultsProps {
  predictions: any[];
}

const PredictionResults: React.FC<PredictionResultsProps> = ({ predictions }) => {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getRiskIcon = (isFraud: boolean) => {
    return isFraud ? (
      <AlertTriangle className="h-6 w-6 text-red-600" />
    ) : (
      <CheckCircle className="h-6 w-6 text-green-600" />
    );
  };

  return (
    <div className="space-y-6">
      {predictions.map((prediction, index) => (
        <motion.div
          key={prediction.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              {getRiskIcon(prediction.isFraud)}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {prediction.isFraud ? 'Fraud Detected' : 'Transaction Approved'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Model: {prediction.modelUsed} | Confidence: {(prediction.confidence * 100).toFixed(1)}%
                </p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(prediction.riskLevel)}`}>
              {prediction.riskLevel} risk
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Fraud Score
              </h4>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      prediction.fraudScore > 0.7 ? 'bg-red-500' : 
                      prediction.fraudScore > 0.3 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${prediction.fraudScore * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {(prediction.fraudScore * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Transaction Details
              </h4>
              <p className="text-sm text-gray-900 dark:text-white">
                ${prediction.amount} at {prediction.merchant}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {prediction.location} | {prediction.category}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                User Information
              </h4>
              <p className="text-sm text-gray-900 dark:text-white">
                User: {prediction.userId}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Device: {prediction.deviceId}
              </p>
            </div>
          </div>

          <ShapExplanation features={prediction.features} />
        </motion.div>
      ))}
    </div>
  );
};

export default PredictionResults;