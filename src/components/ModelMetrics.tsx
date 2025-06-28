import React from 'react';
import { TrendingUp, Target, Shield, Zap } from 'lucide-react';

interface ModelMetricsProps {
  models: any[];
}

const ModelMetrics: React.FC<ModelMetricsProps> = ({ models }) => {
  const bestModel = models.reduce((best, current) => 
    current.f1Score > best.f1Score ? current : best
  );

  const avgAccuracy = models.reduce((sum, model) => sum + model.accuracy, 0) / models.length;
  const avgPrecision = models.reduce((sum, model) => sum + model.precision, 0) / models.length;
  const avgRecall = models.reduce((sum, model) => sum + model.recall, 0) / models.length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Performance Metrics
      </h3>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Best Performing Model
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {bestModel.name}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {bestModel.f1Score}%
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">F1 Score</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Average Accuracy
              </span>
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {avgAccuracy.toFixed(1)}%
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Average Precision
              </span>
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {avgPrecision.toFixed(1)}%
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Average Recall
              </span>
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {avgRecall.toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Active Models: {models.filter(m => m.status === 'active').length} / {models.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModelMetrics;