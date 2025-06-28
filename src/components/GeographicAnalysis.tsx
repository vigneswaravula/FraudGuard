import React from 'react';
import { MapPin, TrendingUp, AlertTriangle } from 'lucide-react';

const GeographicAnalysis: React.FC = () => {
  const regions = [
    { name: 'North America', fraudRate: 1.2, riskLevel: 'low', transactions: 45000 },
    { name: 'Europe', fraudRate: 0.8, riskLevel: 'low', transactions: 32000 },
    { name: 'Asia Pacific', fraudRate: 2.1, riskLevel: 'medium', transactions: 28000 },
    { name: 'Latin America', fraudRate: 3.4, riskLevel: 'high', transactions: 15000 },
    { name: 'Middle East', fraudRate: 2.8, riskLevel: 'medium', transactions: 8000 },
    { name: 'Africa', fraudRate: 4.2, riskLevel: 'high', transactions: 5000 },
  ];

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return <TrendingUp className="h-4 w-4" />;
      case 'medium': return <MapPin className="h-4 w-4" />;
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Geographic Risk Analysis
      </h3>
      
      <div className="space-y-4">
        {regions.map((region) => (
          <div key={region.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${getRiskColor(region.riskLevel)}`}>
                {getRiskIcon(region.riskLevel)}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {region.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {region.transactions.toLocaleString()} transactions
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {region.fraudRate}%
              </p>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(region.riskLevel)}`}>
                {region.riskLevel} risk
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeographicAnalysis;