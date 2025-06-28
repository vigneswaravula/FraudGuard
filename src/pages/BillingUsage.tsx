import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Download, Calendar, TrendingUp, ArrowLeft, DollarSign } from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';

interface BillingUsageProps {
  onBack: () => void;
}

const BillingUsage: React.FC<BillingUsageProps> = ({ onBack }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  const currentUsage = {
    predictions: 45230,
    limit: 100000,
    cost: 452.30,
    period: 'January 2024'
  };

  const billingHistory = [
    { month: 'December 2023', predictions: 38450, cost: 384.50, status: 'paid' },
    { month: 'November 2023', predictions: 42100, cost: 421.00, status: 'paid' },
    { month: 'October 2023', predictions: 39800, cost: 398.00, status: 'paid' },
    { month: 'September 2023', predictions: 35600, cost: 356.00, status: 'paid' }
  ];

  const usageData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'API Calls',
        data: [8500, 12300, 15200, 9230],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      }
    ]
  };

  const costBreakdown = {
    labels: ['Predictions', 'Model Training', 'Data Storage', 'API Calls'],
    datasets: [
      {
        data: [320, 85, 25, 22.30],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(168, 85, 247, 0.8)'
        ],
        borderWidth: 0
      }
    ]
  };

  const planFeatures = [
    { name: 'API Predictions', current: '100,000/month', upgrade: 'Unlimited' },
    { name: 'Model Retraining', current: '5/month', upgrade: 'Unlimited' },
    { name: 'Data Retention', current: '1 year', upgrade: '3 years' },
    { name: 'Support', current: 'Email', upgrade: '24/7 Phone + Email' },
    { name: 'SLA', current: '99.5%', upgrade: '99.9%' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Billing & Usage
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor your usage and manage billing information
          </p>
        </div>
      </div>

      {/* Current Usage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Current Usage
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Predictions</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {currentUsage.predictions.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${(currentUsage.predictions / currentUsage.limit) * 100}%` }}
              />
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {currentUsage.predictions.toLocaleString()} / {currentUsage.limit.toLocaleString()} ({Math.round((currentUsage.predictions / currentUsage.limit) * 100)}%)
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <DollarSign className="h-6 w-6 text-green-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Current Bill
            </h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            ${currentUsage.cost}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {currentUsage.period}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <CreditCard className="h-6 w-6 text-purple-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Plan
            </h3>
          </div>
          <div className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Premium
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Upgrade Plan
          </button>
        </div>
      </div>

      {/* Usage Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Weekly Usage Trend
          </h3>
          <div className="h-64">
            <Line 
              data={usageData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }} 
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Cost Breakdown
          </h3>
          <div className="h-64">
            <Bar 
              data={costBreakdown} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function(value) {
                        return '$' + value;
                      }
                    }
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Billing History
          </h3>
          <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
            <Download className="h-4 w-4 mr-1" />
            Download All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 font-medium text-gray-500 dark:text-gray-400">Period</th>
                <th className="text-left py-3 font-medium text-gray-500 dark:text-gray-400">Predictions</th>
                <th className="text-left py-3 font-medium text-gray-500 dark:text-gray-400">Amount</th>
                <th className="text-left py-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                <th className="text-left py-3 font-medium text-gray-500 dark:text-gray-400">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((bill, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3">{bill.month}</td>
                  <td className="py-3">{bill.predictions.toLocaleString()}</td>
                  <td className="py-3 font-medium">${bill.cost}</td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-xs rounded-full">
                      {bill.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Plan Comparison */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Plan Comparison
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Current Plan - Premium
              </h4>
              <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 text-xs px-2 py-1 rounded-full">
                Active
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              $0.01 <span className="text-sm font-normal text-gray-600 dark:text-gray-400">per prediction</span>
            </div>
            <div className="space-y-3">
              {planFeatures.map((feature, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{feature.name}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{feature.current}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-2 border-blue-500 rounded-lg p-4 relative">
            <div className="absolute -top-3 left-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
              Recommended
            </div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Enterprise Plan
              </h4>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              $0.008 <span className="text-sm font-normal text-gray-600 dark:text-gray-400">per prediction</span>
            </div>
            <div className="space-y-3 mb-6">
              {planFeatures.map((feature, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{feature.name}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{feature.upgrade}</span>
                </div>
              ))}
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Upgrade to Enterprise
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BillingUsage;