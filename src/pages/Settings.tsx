import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Shield, Bell, Database, Download } from 'lucide-react';
import ModelSettings from '../components/ModelSettings';
import NotificationSettings from '../components/NotificationSettings';
import DataSettings from '../components/DataSettings';
import ExportSettings from '../components/ExportSettings';

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('models');

  const sections = [
    { id: 'models', name: 'Model Configuration', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'data', name: 'Data Management', icon: Database },
    { id: 'export', name: 'Export & Reports', icon: Download }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          System Settings
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <section.icon className="mr-3 h-5 w-5" />
                  {section.name}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="lg:col-span-3">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeSection === 'models' && <ModelSettings />}
              {activeSection === 'notifications' && <NotificationSettings />}
              {activeSection === 'data' && <DataSettings />}
              {activeSection === 'export' && <ExportSettings />}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;