import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Activity, Clock, Settings } from 'lucide-react';

interface ModelCardProps {
  model: {
    id: string;
    name: string;
    type: string;
    status: string;
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
    lastTrained: string;
    description: string;
  };
}

const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'training': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {model.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {model.type}
            </p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(model.status)}`}>
          {model.status}
        </span>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {model.description}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Accuracy</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {model.accuracy}%
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">F1 Score</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {model.f1Score}%
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Precision</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {model.precision}%
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Recall</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {model.recall}%
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Clock className="h-3 w-3 mr-1" />
          Last trained: {new Date(model.lastTrained).toLocaleDateString()}
        </div>
        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
          <Settings className="h-4 w-4 text-gray-500" />
        </button>
      </div>
    </motion.div>
  );
};

export default ModelCard;