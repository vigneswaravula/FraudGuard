import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, TrendingUp, Zap, Globe, Server } from 'lucide-react';
import { Line } from 'react-chartjs-2';

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

const RealTimeMonitoring: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { name: 'API Response Time', value: 145, unit: 'ms', status: 'healthy', trend: 'stable' },
    { name: 'Prediction Accuracy', value: 97.2, unit: '%', status: 'healthy', trend: 'up' },
    { name: 'System Load', value: 68, unit: '%', status: 'warning', trend: 'up' },
    { name: 'Memory Usage', value: 72, unit: '%', status: 'healthy', trend: 'stable' },
    { name: 'Active Connections', value: 1247, unit: '', status: 'healthy', trend: 'up' },
    { name: 'Error Rate', value: 0.02, unit: '%', status: 'healthy', trend: 'down' }
  ]);

  const [realtimeData, setRealtimeData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Predictions/min',
        data: [],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Fraud Detected/min',
        data: [],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
      }
    ]
  });

  const [alerts] = useState([
    {
      id: '1',
      type: 'warning',
      message: 'High system load detected (68%)',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      acknowledged: false
    },
    {
      id: '2',
      type: 'info',
      message: 'Model retrained successfully',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      acknowledged: true
    },
    {
      id: '3',
      type: 'critical',
      message: 'Unusual fraud pattern detected',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      acknowledged: false
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update metrics with simulated real-time data
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.value + (Math.random() - 0.5) * (metric.value * 0.05)
      })));

      // Update real-time chart
      setRealtimeData(prev => {
        const now = new Date().toLocaleTimeString();
        const newLabels = [...prev.labels, now].slice(-20);
        const newPredictions = [...prev.datasets[0].data, Math.floor(Math.random() * 50) + 100].slice(-20);
        const newFraud = [...prev.datasets[1].data, Math.floor(Math.random() * 5) + 1].slice(-20);

        return {
          labels: newLabels,
          datasets: [
            {
              ...prev.datasets[0],
              data: newPredictions
            },
            {
              ...prev.datasets[1],
              data: newFraud
            }
          ]
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {metric.name}
              </h3>
              {getTrendIcon(metric.trend)}
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metric.value.toFixed(metric.name.includes('Rate') ? 2 : 0)}
                  <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-1">
                    {metric.unit}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                  {metric.status}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Real-time Activity Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Real-time Activity
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Live</span>
          </div>
        </div>
        <div className="h-80">
          <Line 
            data={realtimeData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top' as const,
                }
              },
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Time'
                  }
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Count'
                  }
                }
              },
              animation: {
                duration: 300
              }
            }}
          />
        </div>
      </div>

      {/* System Alerts */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          System Alerts
        </h3>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex items-center space-x-3 p-4 rounded-lg ${
                alert.acknowledged 
                  ? 'bg-gray-50 dark:bg-gray-700 opacity-60' 
                  : 'bg-red-50 dark:bg-red-900/20'
              }`}
            >
              {getAlertIcon(alert.type)}
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">
                  {alert.message}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {alert.timestamp.toLocaleTimeString()}
                </p>
              </div>
              {!alert.acknowledged && (
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                  Acknowledge
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Infrastructure Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Server className="h-6 w-6 text-blue-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              API Servers
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Primary</span>
              <span className="text-green-600 font-medium">Online</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Secondary</span>
              <span className="text-green-600 font-medium">Online</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Load Balancer</span>
              <span className="text-green-600 font-medium">Healthy</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="h-6 w-6 text-green-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Global Status
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">US East</span>
              <span className="text-green-600 font-medium">Operational</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">US West</span>
              <span className="text-green-600 font-medium">Operational</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Europe</span>
              <span className="text-yellow-600 font-medium">Degraded</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="h-6 w-6 text-purple-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Performance
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Uptime</span>
              <span className="text-green-600 font-medium">99.98%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Avg Response</span>
              <span className="text-green-600 font-medium">145ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Throughput</span>
              <span className="text-green-600 font-medium">2.4K/min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitoring;