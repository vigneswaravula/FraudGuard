import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Activity, 
  Brain, 
  BarChart3, 
  Settings,
  Zap,
  Monitor,
  Star
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Activity },
  { name: 'Predictions', href: '/predictions', icon: Zap },
  { name: 'Models', href: '/models', icon: Brain },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Monitoring', href: '/monitoring', icon: Monitor },
  { name: 'Enterprise', href: '/enterprise', icon: Star },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              FraudGuard
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Enterprise Edition
            </p>
          </div>
        </div>
      </div>
      
      <nav className="mt-8">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-600 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <item.icon className={`mr-3 h-5 w-5 ${
                isActive ? 'text-blue-600 dark:text-blue-400' : ''
              }`} />
              {item.name}
              {item.name === 'Enterprise' && (
                <span className="ml-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  PRO
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* System Status */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-green-800 dark:text-green-200">
              All Systems Operational
            </span>
          </div>
          <div className="text-xs text-green-600 dark:text-green-400 mt-1">
            99.98% Uptime • 145ms Avg Response
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;