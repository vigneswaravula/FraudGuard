import React, { useState } from 'react';
import { Save, Database, Trash2, Download, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

const DataSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    dataRetentionDays: 365,
    enableDataBackup: true,
    backupFrequency: 'daily',
    enableDataProfiling: true,
    maxBatchSize: 10000,
    enableDataValidation: true
  });

  const handleSave = () => {
    toast.success('Data settings saved successfully');
  };

  const handleBackup = () => {
    toast.success('Backup initiated successfully');
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all training data? This action cannot be undone.')) {
      toast.success('Training data cleared');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Data Retention Period (days)
          </label>
          <input
            type="number"
            min="30"
            max="1095"
            value={settings.dataRetentionDays}
            onChange={(e) => setSettings({...settings, dataRetentionDays: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Max Batch Size
          </label>
          <input
            type="number"
            min="1000"
            max="100000"
            step="1000"
            value={settings.maxBatchSize}
            onChange={(e) => setSettings({...settings, maxBatchSize: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
          Data Management Options
        </h4>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <Database className="h-5 w-5 text-blue-500" />
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">Enable Data Backup</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Automatically backup training data
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableDataBackup}
                onChange={(e) => setSettings({...settings, enableDataBackup: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <Upload className="h-5 w-5 text-green-500" />
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">Enable Data Profiling</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Analyze data quality and patterns
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableDataProfiling}
                onChange={(e) => setSettings({...settings, enableDataProfiling: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <Database className="h-5 w-5 text-purple-500" />
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">Enable Data Validation</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Validate incoming data quality
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableDataValidation}
                onChange={(e) => setSettings({...settings, enableDataValidation: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
          Data Operations
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleBackup}
            className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="mr-2 h-4 w-4" />
            Backup Data
          </button>
          
          <button
            onClick={() => toast.success('Data export initiated')}
            className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </button>
          
          <button
            onClick={handleClearData}
            className="flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Data
          </button>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleSave}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default DataSettings;