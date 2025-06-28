import React, { useState } from 'react';
import { Save, RefreshCw, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

const ModelSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    fraudThreshold: 0.5,
    ensembleWeights: {
      isolationForest: 0.2,
      oneClassSVM: 0.15,
      xgboost: 0.35,
      autoencoder: 0.3
    },
    retrainingInterval: 24,
    minTrainingData: 1000,
    enableRealTimeUpdates: true,
    enableExplanations: true
  });

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  const handleReset = () => {
    setSettings({
      fraudThreshold: 0.5,
      ensembleWeights: {
        isolationForest: 0.2,
        oneClassSVM: 0.15,
        xgboost: 0.35,
        autoencoder: 0.3
      },
      retrainingInterval: 24,
      minTrainingData: 1000,
      enableRealTimeUpdates: true,
      enableExplanations: true
    });
    toast.success('Settings reset to defaults');
  };

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2" />
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            Changes to model settings will affect all future predictions. Use caution when modifying these values.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Fraud Detection Threshold
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={settings.fraudThreshold}
            onChange={(e) => setSettings({...settings, fraudThreshold: parseFloat(e.target.value)})}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0.0 (Strict)</span>
            <span>{settings.fraudThreshold}</span>
            <span>1.0 (Permissive)</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Retraining Interval (hours)
          </label>
          <input
            type="number"
            min="1"
            max="168"
            value={settings.retrainingInterval}
            onChange={(e) => setSettings({...settings, retrainingInterval: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Ensemble Model Weights
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(settings.ensembleWeights).map(([model, weight]) => (
            <div key={model}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {model.charAt(0).toUpperCase() + model.slice(1)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={weight}
                onChange={(e) => setSettings({
                  ...settings,
                  ensembleWeights: {
                    ...settings.ensembleWeights,
                    [model]: parseFloat(e.target.value)
                  }
                })}
                className="w-full"
              />
              <div className="text-right text-xs text-gray-500 mt-1">
                {weight.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Real-time Model Updates
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Automatically update models with new fraud patterns
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.enableRealTimeUpdates}
              onChange={(e) => setSettings({...settings, enableRealTimeUpdates: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Enable SHAP Explanations
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Provide feature importance explanations for predictions
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.enableExplanations}
              onChange={(e) => setSettings({...settings, enableExplanations: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <div className="flex space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleSave}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </button>
        <button
          onClick={handleReset}
          className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default ModelSettings;