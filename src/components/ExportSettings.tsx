import React, { useState } from 'react';
import { Download, FileText, Calendar, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const ExportSettings: React.FC = () => {
  const [exportConfig, setExportConfig] = useState({
    format: 'csv',
    dateRange: '30d',
    includeFeatures: true,
    includeExplanations: false,
    riskLevelFilter: 'all'
  });

  const handleExport = (type: string) => {
    toast.success(`${type} export initiated`);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Export Format
          </label>
          <select
            value={exportConfig.format}
            onChange={(e) => setExportConfig({...exportConfig, format: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="csv">CSV</option>
            <option value="xlsx">Excel (XLSX)</option>
            <option value="json">JSON</option>
            <option value="pdf">PDF Report</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date Range
          </label>
          <select
            value={exportConfig.dateRange}
            onChange={(e) => setExportConfig({...exportConfig, dateRange: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Risk Level Filter
        </label>
        <select
          value={exportConfig.riskLevelFilter}
          onChange={(e) => setExportConfig({...exportConfig, riskLevelFilter: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All Risk Levels</option>
          <option value="high">High Risk Only</option>
          <option value="medium">Medium Risk Only</option>
          <option value="low">Low Risk Only</option>
          <option value="fraud">Fraud Cases Only</option>
        </select>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
          Export Options
        </h4>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-gray-900 dark:text-white">Include Feature Data</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Export detailed feature information for each transaction
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={exportConfig.includeFeatures}
                onChange={(e) => setExportConfig({...exportConfig, includeFeatures: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-gray-900 dark:text-white">Include SHAP Explanations</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Export model explan ations and feature importance scores
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={exportConfig.includeExplanations}
                onChange={(e) => setExportConfig({...exportConfig, includeExplanations: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
          Quick Export Actions
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => handleExport('Fraud Report')}
            className="flex flex-col items-center p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <FileText className="h-8 w-8 text-red-600 dark:text-red-400 mb-2" />
            <span className="text-sm font-medium text-red-800 dark:text-red-200">
              Fraud Report
            </span>
          </button>

          <button
            onClick={() => handleExport('Model Performance')}
            className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            <Download className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Model Metrics
            </span>
          </button>

          <button
            onClick={() => handleExport('Transaction Data')}
            className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
          >
            <Calendar className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
            <span className="text-sm font-medium text-green-800 dark:text-green-200">
              Transaction Data
            </span>
          </button>

          <button
            onClick={() => handleExport('Analytics Summary')}
            className="flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
          >
            <Filter className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" />
            <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
              Analytics Summary
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportSettings;