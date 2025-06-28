import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield, BarChart3, AlertTriangle } from 'lucide-react';
import RealTimeMonitoring from '../components/RealTimeMonitoring';
import AuditLog from '../components/AuditLog';
import ComplianceReports from '../components/ComplianceReports';
import AdvancedAnalytics from '../components/AdvancedAnalytics';

const SystemMonitoring: React.FC = () => {
  const [activeTab, setActiveTab] = useState('monitoring');

  const tabs = [
    { id: 'monitoring', name: 'Real-time Monitoring', icon: Activity },
    { id: 'analytics', name: 'Advanced Analytics', icon: BarChart3 },
    { id: 'audit', name: 'Audit Log', icon: Shield },
    { id: 'compliance', name: 'Compliance', icon: AlertTriangle }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'monitoring':
        return <RealTimeMonitoring />;
      case 'analytics':
        return <AdvancedAnalytics />;
      case 'audit':
        return <AuditLog />;
      case 'compliance':
        return <ComplianceReports />;
      default:
        return <RealTimeMonitoring />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          System Monitoring & Analytics
        </h2>
        
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="mr-2 h-4 w-4" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>
    </div>
  );
};

export default SystemMonitoring;