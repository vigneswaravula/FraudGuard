import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Info } from 'lucide-react';

interface ShapExplanationProps {
  features: Record<string, number>;
}

const ShapExplanation: React.FC<ShapExplanationProps> = ({ features }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const sortedFeatures = Object.entries(features)
    .sort(([, a], [, b]) => Math.abs(b) - Math.abs(a));

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        {isExpanded ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        <span>{isExpanded ? 'Hide' : 'Show'} Feature Importance (SHAP)</span>
        <Info className="h-4 w-4 text-gray-400" />
      </button>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 space-y-3"
        >
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Features contributing to the fraud prediction (positive values increase fraud likelihood)
          </p>
          
          {sortedFeatures.map(([feature, value]) => (
            <div key={feature} className="flex items-center space-x-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                  <span className={`text-sm font-medium ${
                    value > 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {value > 0 ? '+' : ''}{(value * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className={`absolute top-0 h-2 rounded-full ${
                        value > 0 ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{
                        width: `${Math.abs(value) * 100}%`,
                        left: value > 0 ? '50%' : `${50 - Math.abs(value) * 50}%`
                      }}
                    />
                  </div>
                  <div className="absolute top-0 left-1/2 w-0.5 h-2 bg-gray-400 transform -translate-x-0.5" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ShapExplanation;