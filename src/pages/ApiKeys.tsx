import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Plus, Copy, Eye, EyeOff, Trash2, ArrowLeft, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

interface ApiKeysProps {
  onBack: () => void;
}

interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  created: Date;
  lastUsed: Date | null;
  status: 'active' | 'inactive';
}

const ApiKeys: React.FC<ApiKeysProps> = ({ onBack }) => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Production API',
      key: 'fgd_live_sk_1234567890abcdef',
      permissions: ['read', 'predict'],
      created: new Date('2024-01-01'),
      lastUsed: new Date('2024-01-15'),
      status: 'active'
    },
    {
      id: '2',
      name: 'Development API',
      key: 'fgd_test_sk_abcdef1234567890',
      permissions: ['read', 'predict', 'retrain'],
      created: new Date('2024-01-10'),
      lastUsed: null,
      status: 'active'
    },
    {
      id: '3',
      name: 'Analytics Dashboard',
      key: 'fgd_live_sk_fedcba0987654321',
      permissions: ['read'],
      created: new Date('2023-12-15'),
      lastUsed: new Date('2024-01-14'),
      status: 'inactive'
    }
  ]);

  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKey, setNewKey] = useState({
    name: '',
    permissions: [] as string[]
  });

  const permissions = [
    { id: 'read', name: 'Read', description: 'View transactions and analytics' },
    { id: 'predict', name: 'Predict', description: 'Make fraud predictions' },
    { id: 'retrain', name: 'Retrain', description: 'Retrain models' },
    { id: 'admin', name: 'Admin', description: 'Full administrative access' }
  ];

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('API key copied to clipboard');
  };

  const deleteApiKey = (keyId: string) => {
    if (window.confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      setApiKeys(prev => prev.filter(key => key.id !== keyId));
      toast.success('API key deleted');
    }
  };

  const createApiKey = () => {
    if (!newKey.name.trim()) {
      toast.error('Please enter a name for the API key');
      return;
    }
    if (newKey.permissions.length === 0) {
      toast.error('Please select at least one permission');
      return;
    }

    const generatedKey = `fgd_live_sk_${Math.random().toString(36).substr(2, 16)}`;
    const apiKey: ApiKey = {
      id: Date.now().toString(),
      name: newKey.name,
      key: generatedKey,
      permissions: newKey.permissions,
      created: new Date(),
      lastUsed: null,
      status: 'active'
    };

    setApiKeys(prev => [apiKey, ...prev]);
    setNewKey({ name: '', permissions: [] });
    setShowCreateModal(false);
    toast.success('API key created successfully');
  };

  const togglePermission = (permission: string) => {
    setNewKey(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const maskKey = (key: string) => {
    return key.substring(0, 12) + '•'.repeat(key.length - 16) + key.substring(key.length - 4);
  };

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
            API Keys
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage API access tokens for your applications
          </p>
        </div>
      </div>

      {/* Create New Key Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New API Key
        </button>
      </div>

      {/* API Keys List */}
      <div className="space-y-4">
        {apiKeys.map((apiKey) => (
          <div key={apiKey.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Key className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {apiKey.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      apiKey.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                    }`}>
                      {apiKey.status}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Created {apiKey.created.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => deleteApiKey(apiKey.id)}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {/* API Key Display */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <code className="text-sm font-mono text-gray-900 dark:text-white">
                  {showKeys[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                </code>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleKeyVisibility(apiKey.id)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                  >
                    {showKeys[apiKey.id] ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                  <button
                    onClick={() => copyToClipboard(apiKey.key)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                  >
                    <Copy className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Permissions
              </h4>
              <div className="flex flex-wrap gap-2">
                {apiKey.permissions.map((permission) => (
                  <span
                    key={permission}
                    className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 text-xs rounded-full"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </div>

            {/* Usage Info */}
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="h-4 w-4 mr-1" />
              Last used: {apiKey.lastUsed ? apiKey.lastUsed.toLocaleDateString() : 'Never'}
            </div>
          </div>
        ))}
      </div>

      {/* Create API Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Create New API Key
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Key Name
                </label>
                <input
                  type="text"
                  value={newKey.name}
                  onChange={(e) => setNewKey({ ...newKey, name: e.target.value })}
                  placeholder="e.g., Production API"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Permissions
                </label>
                <div className="space-y-2">
                  {permissions.map((permission) => (
                    <label key={permission.id} className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={newKey.permissions.includes(permission.id)}
                        onChange={() => togglePermission(permission.id)}
                        className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {permission.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {permission.description}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createApiKey}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Key
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default ApiKeys;