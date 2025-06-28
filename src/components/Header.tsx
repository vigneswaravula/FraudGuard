import React, { useState } from 'react';
import { Moon, Sun, Bell, User, Search, Command } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import NotificationCenter from './NotificationCenter';
import AccountMenu from './AccountMenu';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useAppContext();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock unread notification count
  const [unreadCount] = useState(3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Implement search functionality
    }
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Fraud Detection System
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Real-time anomaly detection and risk assessment
              </p>
            </div>
            
            {/* Global Search */}
            <form onSubmit={handleSearch} className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions, models, alerts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                />
                <div className="absolute right-3 top-2.5 flex items-center space-x-1">
                  <Command className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-400">K</span>
                </div>
              </div>
            </form>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Quick Stats */}
            <div className="hidden lg:flex items-center space-x-6 mr-6">
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                  97.2%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Accuracy
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                  145ms
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Response
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-green-600">
                  Online
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Status
                </div>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
            
            <button 
              onClick={() => setShowNotifications(true)}
              className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title="View notifications"
            >
              <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => setShowAccountMenu(true)}
              className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title="Account menu"
            >
              <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </header>

      <NotificationCenter 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
      
      <AccountMenu 
        isOpen={showAccountMenu} 
        onClose={() => setShowAccountMenu(false)} 
      />
    </>
  );
};

export default Header;