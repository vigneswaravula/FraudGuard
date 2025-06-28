import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Settings, 
  LogOut, 
  Shield, 
  Bell, 
  Key, 
  CreditCard,
  HelpCircle,
  Moon,
  Sun,
  ChevronRight
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ProfileSettings from '../pages/ProfileSettings';
import SecuritySettings from '../pages/SecuritySettings';
import NotificationPreferences from '../pages/NotificationPreferences';
import ApiKeys from '../pages/ApiKeys';
import BillingUsage from '../pages/BillingUsage';
import HelpSupport from '../pages/HelpSupport';

interface AccountMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ isOpen, onClose }) => {
  const { theme, toggleTheme, user } = useAppContext();
  const [currentView, setCurrentView] = useState<string | null>(null);

  const menuItems = [
    {
      icon: User,
      label: 'Profile Settings',
      description: 'Manage your personal information',
      action: () => setCurrentView('profile'),
      component: ProfileSettings
    },
    {
      icon: Shield,
      label: 'Security',
      description: 'Password and authentication',
      action: () => setCurrentView('security'),
      component: SecuritySettings
    },
    {
      icon: Bell,
      label: 'Notification Preferences',
      description: 'Configure alerts and notifications',
      action: () => setCurrentView('notifications'),
      component: NotificationPreferences
    },
    {
      icon: Key,
      label: 'API Keys',
      description: 'Manage API access tokens',
      action: () => setCurrentView('api-keys'),
      component: ApiKeys
    },
    {
      icon: CreditCard,
      label: 'Billing & Usage',
      description: 'View usage and billing information',
      action: () => setCurrentView('billing'),
      component: BillingUsage
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      description: 'Get help and contact support',
      action: () => setCurrentView('help'),
      component: HelpSupport
    }
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      // Implement logout logic here
      console.log('User logged out');
      onClose();
    }
  };

  const handleBack = () => {
    setCurrentView(null);
  };

  // If a specific view is selected, render that component
  if (currentView) {
    const selectedItem = menuItems.find(item => 
      item.action.toString().includes(currentView)
    );
    
    if (selectedItem) {
      const Component = selectedItem.component;
      return (
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={onClose}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-4 bg-white dark:bg-gray-900 rounded-xl shadow-2xl z-50 overflow-hidden"
              >
                <div className="h-full overflow-y-auto p-6">
                  <Component onBack={handleBack} />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      );
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="fixed top-16 right-6 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-50 border border-gray-200 dark:border-gray-700"
          >
            {/* User Profile Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {user?.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {user?.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user?.email}
                  </p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-1 rounded-full">
                      {user?.role}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Department</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {user?.department}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Account Type</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Premium
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="w-full px-6 py-3 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <item.icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </button>
              ))}
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-full px-6 py-3 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                )}
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Switch to {theme === 'light' ? 'dark' : 'light'} theme
                  </p>
                </div>
                <div className={`w-10 h-6 rounded-full transition-colors ${
                  theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'
                }`}>
                  <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${
                    theme === 'dark' ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="font-medium">Sign Out</span>
              </button>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
                Last login: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AccountMenu;