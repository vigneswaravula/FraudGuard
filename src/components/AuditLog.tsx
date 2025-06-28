import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, User, Key, AlertTriangle, Clock, Filter, Download, Search } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface AuditEvent {
  id: string;
  timestamp: Date;
  user: string;
  action: string;
  resource: string;
  details: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  ipAddress: string;
  userAgent: string;
}

const AuditLog: React.FC = () => {
  const [events] = useState<AuditEvent[]>([
    {
      id: '1',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      user: 'john.anderson@company.com',
      action: 'MODEL_RETRAIN',
      resource: 'XGBoost Classifier',
      details: 'Model retrained with 5,000 new samples',
      severity: 'medium',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      user: 'system',
      action: 'FRAUD_DETECTED',
      resource: 'Transaction TXN-789123',
      details: 'High-risk transaction flagged (score: 0.94)',
      severity: 'high',
      ipAddress: '10.0.0.1',
      userAgent: 'FraudGuard-API/1.0'
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      user: 'admin@company.com',
      action: 'API_KEY_CREATED',
      resource: 'Production API Key',
      details: 'New API key created with read/predict permissions',
      severity: 'medium',
      ipAddress: '192.168.1.50',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    },
    {
      id: '4',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      user: 'jane.smith@company.com',
      action: 'LOGIN_FAILED',
      resource: 'User Account',
      details: 'Failed login attempt - invalid password',
      severity: 'critical',
      ipAddress: '203.0.113.1',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'LOGIN_FAILED':
      case 'FRAUD_DETECTED':
        return <AlertTriangle className="h-4 w-4" />;
      case 'API_KEY_CREATED':
      case 'API_KEY_DELETED':
        return <Key className="h-4 w-4" />;
      case 'MODEL_RETRAIN':
        return <Shield className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === 'all' || event.severity === filter;
    const matchesSearch = event.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Security Audit Log
        </h3>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Severity</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
          <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            <Download className="h-4 w-4 mr-1" />
            Export
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className={`p-2 rounded-lg ${getSeverityColor(event.severity)}`}>
              {getActionIcon(event.action)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-gray-900 dark:text-white">
                  {event.action.replace(/_/g, ' ')}
                </p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(event.severity)}`}>
                  {event.severity}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {event.details}
              </p>
              <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  {event.user}
                </span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDistanceToNow(event.timestamp, { addSuffix: true })}
                </span>
                <span>IP: {event.ipAddress}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AuditLog;