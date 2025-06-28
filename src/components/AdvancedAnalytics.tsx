import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, PieChart, Calendar, Download, Filter } from 'lucide-react';
import { Line, Bar, Doughnut, Scatter } from 'react-chartjs-2';

const AdvancedAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('fraud-rate');

  // Advanced analytics data
  const fraudPatterns = {
    labels: ['0-2', '2-6', '6-10', '10-14', '14-18', '18-22', '22-24'],
    datasets: [
      {
        label: 'Fraud Incidents by Hour',
        data: [12, 8, 5, 15, 25, 45, 38],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1
      }
    ]
  };

  const riskSegmentation = {
    labels: ['Low Risk', 'Medium Risk', 'High Risk', 'Critical Risk'],
    datasets: [
      {
        data: [65, 25, 8, 2],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderWidth: 0
      }
    ]
  };

  const modelPerformance = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Precision',
        data: [94.2, 95.1, 96.3, 97.2],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      },
      {
        label: 'Recall',
        data: [91.8, 92.5, 93.7, 94.1],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4
      },
      {
        label: 'F1 Score',
        data: [93.0, 93.8, 95.0, 95.6],
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.4
      }
    ]
  };

  const anomalyDetection = {
    datasets: [
      {
        label: 'Normal Transactions',
        data: Array.from({ length: 100 }, () => ({
          x: Math.random() * 100,
          y: Math.random() * 100
        })),
        backgroundColor: 'rgba(34, 197, 94, 0.6)',
        pointRadius: 3
      },
      {
        label: 'Anomalies',
        data: Array.from({ length: 15 }, () => ({
          x: Math.random() * 100,
          y: Math.random() * 100
        })),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        pointRadius: 5
      }
    ]
  };

  const merchantRiskAnalysis = {
    labels: ['E-commerce', 'Retail', 'Financial', 'Gaming', 'Travel', 'Other'],
    datasets: [
      {
        label: 'Fraud Rate (%)',
        data: [2.3, 1.1, 0.8, 4.2, 1.9, 2.1],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.9)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(156, 163, 175, 0.8)'
        ],
        borderWidth: 0
      }
    ]
  };

  const kpiMetrics = [
    { name: 'Detection Rate', value: '97.2%', change: '+2.1%', trend: 'up' },
    { name: 'False Positive Rate', value: '0.8%', change: '-0.3%', trend: 'down' },
    { name: 'Avg Investigation Time', value: '4.2min', change: '-1.1min', trend: 'down' },
    { name: 'Cost Savings', value: '$2.4M', change: '+$340K', trend: 'up' }
  ];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Advanced Analytics Dashboard
          </h2>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiMetrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              {metric.name}
            </h3>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {metric.value}
              </div>
              <div className={`flex items-center text-sm ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className={`h-4 w-4 mr-1 ${
                  metric.trend === 'down' ? 'rotate-180' : ''
                }`} />
                {metric.change}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fraud Patterns by Time */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Fraud Patterns by Hour
          </h3>
          <div className="h-64">
            <Bar 
              data={fraudPatterns}
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

        {/* Risk Segmentation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Risk Segmentation
          </h3>
          <div className="h-64">
            <Doughnut 
              data={riskSegmentation}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Model Performance Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Model Performance Trends
          </h3>
          <div className="h-64">
            <Line 
              data={modelPerformance}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top'
                  }
                },
                scales: {
                  y: {
                    beginAtZero: false,
                    min: 85,
                    max: 100
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Merchant Risk Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Merchant Category Risk
          </h3>
          <div className="h-64">
            <Bar 
              data={merchantRiskAnalysis}
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
                    title: {
                      display: true,
                      text: 'Fraud Rate (%)'
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Anomaly Detection Visualization */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Anomaly Detection Visualization
        </h3>
        <div className="h-96">
          <Scatter 
            data={anomalyDetection}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top'
                },
                title: {
                  display: true,
                  text: 'Transaction Amount vs. Frequency Anomaly Detection'
                }
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Transaction Amount (normalized)'
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: 'Transaction Frequency (normalized)'
                  }
                }
              }
            }}
          />
        </div>
      </div>

      {/* Insights and Recommendations */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          AI-Powered Insights & Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                🎯 Pattern Detection
              </h4>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                Fraud activity peaks between 6-10 PM. Consider implementing stricter validation during these hours.
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">
                📈 Performance Improvement
              </h4>
              <p className="text-green-800 dark:text-green-200 text-sm">
                Model accuracy improved by 2.1% this month. Current ensemble approach is performing optimally.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <h4 className="font-medium text-yellow-900 dark:text-yellow-300 mb-2">
                ⚠️ Risk Alert
              </h4>
              <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                Gaming merchants show 4.2% fraud rate. Recommend enhanced monitoring for this category.
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-medium text-purple-900 dark:text-purple-300 mb-2">
                🔮 Predictive Insight
              </h4>
              <p className="text-purple-800 dark:text-purple-200 text-sm">
                Based on current trends, expect 15% increase in fraud attempts during holiday season.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;