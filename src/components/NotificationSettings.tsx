import React, { useState } from 'react';
import { Save, Mail, MessageSquare, Bell } from 'lucide-react';
import toast from 'react-hot-toast';

const NotificationSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    fraudAlerts: true,
    modelUpdates: false,
    systemMaintenance: true,
    thresholds: {
      highRisk: 0.8,
      mediumRisk: 0.5
    },
    contacts: {
      email: 'admin@company.com',
      phone: '+1234567890'
    }
  });

  const handleSave = () => {
    toast.success('Notification settings saved successfully');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={settings.contacts.email}
            onChange={(e) => setSettings({
              ...settings,
              contacts: { ...settings.contacts, email: e.target.value }
            })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={settings.contacts.phone}
            onChange={(e) => setSettings({
              ...settings,
              contacts: { ...settings.contacts, phone: e.target.value }
            })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
          Notification Channels
        </h4>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-blue-500" />
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">Email Notifications</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive alerts via email
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-5 w-5 text-green-500" />
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">SMS Notifications</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive alerts via SMS
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={(e) => setSettings({...settings, smsNotifications: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-purple-500" />
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">Push Notifications</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive browser push notifications
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={(e) => setSettings({...settings, pushNotifications: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
          Alert Thresholds
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              High Risk Threshold
            </label>
            <input
              type="range"
              min="0.5"
              max="1"
              step="0.05"
              value={settings.thresholds.highRisk}
              onChange={(e) => setSettings({
                ...settings,
                thresholds: { ...settings.thresholds, highRisk: parseFloat(e.target.value) }
              })}
              className="w-full"
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {settings.thresholds.highRisk}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Medium Risk Threshold
            </label>
            <input
              type="range"
              min="0.1"
              max="0.8"
              step="0.05"
              value={settings.thresholds.mediumRisk}
              onChange={(e) => setSettings({
                ...settings,
                thresholds: { ...settings.thresholds, mediumRisk: parseFloat(e.target.value) }
              })}
              className="w-full"
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {settings.thresholds.mediumRisk}
            </div>
          </div>
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

export default NotificationSettings;