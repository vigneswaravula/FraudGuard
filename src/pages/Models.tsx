import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Settings, RefreshCw } from 'lucide-react';
import ModelCard from '../components/ModelCard';
import ModelComparison from '../components/ModelComparison';
import ModelMetrics from '../components/ModelMetrics';

const Models: React.FC = () => {
  const [models, setModels] = useState([
    {
      id: 'isolation-forest',
      name: 'Isolation Forest',
      type: 'Unsupervised',
      status: 'active',
      accuracy: 94.2,
      precision: 87.5,
      recall: 92.1,
      f1Score: 89.7,
      lastTrained: '2024-01-15T10:30:00Z',
      description: 'Tree-based anomaly detection for identifying outliers in transaction patterns'
    },
    {
      id: 'one-class-svm',
      name: 'One-Class SVM',
      type: 'Unsupervised',
      status: 'active',
      accuracy: 91.8,
      precision: 85.2,
      recall: 88.9,
      f1Score: 87.0,
      lastTrained: '2024-01-15T10:30:00Z',
      description: 'Support Vector Machine for novelty detection in high-dimensional spaces'
    },
    {
      id: 'xgboost',
      name: 'XGBoost Classifier',
      type: 'Supervised',
      status: 'active',
      accuracy: 96.5,
      precision: 94.1,
      recall: 89.3,
      f1Score: 91.6,
      lastTrained: '2024-01-15T11:45:00Z',
      description: 'Gradient boosting model trained on labeled fraud data'
    },
    {
      id: 'autoencoder',
      name: 'Neural Autoencoder',
      type: 'Deep Learning',
      status: 'training',
      accuracy: 93.7,
      precision: 88.9,
      recall: 91.4,
      f1Score: 90.1,
      lastTrained: '2024-01-15T09:15:00Z',
      description: 'Deep neural network for reconstruction-based anomaly detection'
    },
    {
      id: 'ensemble',
      name: 'Ensemble Model',
      type: 'Ensemble',
      status: 'active',
      accuracy: 97.2,
      precision: 95.8,
      recall: 92.6,
      f1Score: 94.2,
      lastTrained: '2024-01-15T12:00:00Z',
      description: 'Weighted combination of multiple models for optimal performance'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Model Management
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Monitor and manage your fraud detection models
            </p>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retrain All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ModelCard model={model} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <ModelComparison models={models} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <ModelMetrics models={models} />
        </motion.div>
      </div>
    </div>
  );
};

export default Models;