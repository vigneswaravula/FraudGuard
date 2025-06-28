import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Mail, MessageSquare, Smartphone, ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';

interface NotificationPreferencesProps {
  onBack: () => void;
}

const NotificationPreferences: React.FC<NotificationPreferencesProps> = ({ onBack }) => {
  const [preferences, setPreferences] = useState({
    channels: {
      email: true,
      push: true,
      sms: false,
      inApp: true
    },
    types: {
      fraudAlerts: {
        email: true,
        push: true,
        sms: true,
        inApp: true
      },
      systemUpdates: {
        email: true,
        push: false,
        sms: false,
        inApp: true
      },
      modelUpdates: {
        email: false,
        push: true,
        sms: false,
        inApp: true
      },
      weeklyReports: {
        email: true,
        push: false,
        sms: false,
        inApp: false
      },
      maintenanceAlerts: {
        email: true,
        push: true,
        sms: false,
        inApp: true
      }
    },
    thresholds: {
      fraudScore: 0.8,
      transactionAmount: 10000,
      dailyAlerts: 50
    },
    schedule: {
      quietHours: {
        enabled: true,
        start: '22:00',
        end: '08:00'
      },
      weekends: {
        enabled: false
      }
    }
  });

  const handleSave = () => {
    toast.success('Notification preferences saved successfully');
  };

  const notificationTypes = [
    {
      id: 'fraudAlerts',
      name: 'Fraud Alerts',
      description: 'High-priority fraud detection notifications',
      icon: '🚨',
      critical: true
    },
    {
      id: 'systemUpdates',
      name: 'System Updates',
      description: 'System maintenance and updates',
      icon: '⚙️',
      critical: false
    },
    {
      id: 'modelUpdates',
      name: 'Model Updates',
      description: 'ML model training and performance updates',
      icon: '🧠',
      critical: false
    },
    {
      id: 'weeklyReports',
      name: 'Weekly Reports',
      description: 'Weekly fraud detection summaries',
      icon: '📊',
      critical: false
    },
    {
      id: 'maintenanceAlerts',
      name: 'Maintenance Alerts',
      description: 'Scheduled maintenance notifications',
      icon: '🔧',
      critical: false
    }
  ];

  const channels = [
    { id: 'email', name: 'Email', icon: Mail, color: 'text-blue-600' },
    { id: 'push', name: 'Push', icon: Bell, color: 'text-green-600' },
    { id: 'sms', name: 'SMS', icon: MessageSquare, color: 'text-purple-600' },
    { id: 'inApp', name: 'In-App', icon: Smartphone, color: 'text-orange-600' }
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
            Notification Preferences
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Configure how and when you receive notifications
          </p>
        </div>
      </div>

      {/* Notification Channels */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Notification Channels
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {channels.map((channel) => (
            <div key={channel.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <channel.icon className={`h-5 w-5 ${channel.color}`} />
                <span className="font-medium text-gray-900 dark:text-white">
                  {channel.name}
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.channels[channel.id as keyof typeof preferences.channels]}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    channels: {
                      ...preferences.channels,
                      [channel.id]: e.target.checked
                    }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Types */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Notification Types
        </h3>
        
        <div className="space-y-6">
          {notificationTypes.map((type) => (
            <div key={type.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{type.icon}</span>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {type.name}
                      {type.critical && (
                        <span className="ml-2 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 text-xs px-2 py-1 rounded-full">
                          Critical
                        </span>
                      )}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {type.description}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {channels.map((channel) => (
                  <label key={channel.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={preferences.types[type.id as keyof typeof preferences.types][channel.id as keyof typeof preferences.types.fraudAlerts]}
                      onChange={(e) => setPreferences({
                        ...preferences,
                        types: {
                          ...preferences.types,
                          [type.id]: {
                            ...preferences.types[type.id as keyof typeof preferences.types],
                            [channel.id]: e.target.checked
                          }
                        }
                      })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {channel.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alert Thresholds */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Alert Thresholds
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Fraud Score Threshold
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={preferences.thresholds.fraudScore}
              onChange={(e) => setPreferences({
                ...preferences,
                thresholds: {
                  ...preferences.thresholds,
                  fraudScore: parseFloat(e.target.value)
                }
              })}
              className="w-full"
            />
            <div className="text-right text-sm text-gray-600 dark:text-gray-400 mt-1">
              {preferences.thresholds.fraudScore}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Transaction Amount ($)
            </label>
            <input
              type="number"
              min="1000"
              max="100000"
              step="1000"
              value={preferences.thresholds.transactionAmount}
              onChange={(e) => setPreferences({
                ...preferences,
                thresholds: {
                  ...preferences.thresholds,
                  transactionAmount: parseInt(e.target.value)
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Daily Alert Limit
            </label>
            <input
              type="number"
              min="10"
              max="200"
              step="10"
              value={preferences.thresholds.dailyAlerts}
              onChange={(e) => setPreferences({
                ...preferences,
                thresholds: {
                  ...preferences.thresholds,
                  dailyAlerts: parseInt(e.target.value)
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Schedule Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Schedule Settings
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Quiet Hours
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Reduce non-critical notifications during specified hours
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.schedule.quietHours.enabled}
                onChange={(e) => setPreferences({
                  ...preferences,
                  schedule: {
                    ...preferences.schedule,
                    quietHours: {
                      ...preferences.schedule.quietHours,
                      enabled: e.target.checked
                    }
                  }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {preferences.schedule.quietHours.enabled && (
            <div className="grid grid-cols-2 gap-4 ml-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={preferences.schedule.quietHours.start}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    schedule: {
                      ...preferences.schedule,
                      quietHours: {
                        ...preferences.schedule.quietHours,
                        start: e.target.value
                      }
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={preferences.schedule.quietHours.end}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    schedule: {
                      ...preferences.schedule,
                      quietHours: {
                        ...preferences.schedule.quietHours,
                        end: e.target.value
                      }
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Weekend Notifications
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receive notifications during weekends
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.schedule.weekends.enabled}
                onChange={(e) => setPreferences({
                  ...preferences,
                  schedule: {
                    ...preferences.schedule,
                    weekends: {
                      enabled: e.target.checked
                    }
                  }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Preferences
        </button>
      </div>
    </motion.div>
  );
};

export default NotificationPreferences;