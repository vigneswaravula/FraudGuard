import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const RecentTransactions: React.FC = () => {
  const transactions = [
    {
      id: 'TXN-001',
      amount: 1250.00,
      merchant: 'Amazon',
      timestamp: '2024-01-15T14:30:00Z',
      risk: 'low',
      score: 0.15,
      status: 'approved'
    },
    {
      id: 'TXN-002',
      amount: 5000.00,
      merchant: 'Unknown Online Store',
      timestamp: '2024-01-15T14:28:00Z',
      risk: 'high',
      score: 0.89,
      status: 'flagged'
    },
    {
      id: 'TXN-003',
      amount: 75.50,
      merchant: 'Starbucks',
      timestamp: '2024-01-15T14:25:00Z',
      risk: 'low',
      score: 0.08,
      status: 'approved'
    },
    {
      id: 'TXN-004',
      amount: 320.00,
      merchant: 'Best Buy',
      timestamp: '2024-01-15T14:22:00Z',
      risk: 'medium',
      score: 0.45,
      status: 'pending'
    },
    {
      id: 'TXN-005',
      amount: 2500.00,
      merchant: 'Luxury Goods Co.',
      timestamp: '2024-01-15T14:20:00Z',
      risk: 'high',
      score: 0.76,
      status: 'flagged'
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'flagged': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent Transactions
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">
                Transaction ID
              </th>
              <th className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">
                Amount
              </th>
              <th className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">
                Merchant
              </th>
              <th className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">
                Risk Level
              </th>
              <th className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">
                Score
              </th>
              <th className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <motion.tr
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="py-3 px-2 font-mono text-sm">
                  {transaction.id}
                </td>
                <td className="py-3 px-2 font-semibold">
                  ${transaction.amount.toFixed(2)}
                </td>
                <td className="py-3 px-2">
                  {transaction.merchant}
                </td>
                <td className="py-3 px-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(transaction.risk)}`}>
                    {transaction.risk}
                  </span>
                </td>
                <td className="py-3 px-2 font-mono">
                  {transaction.score.toFixed(2)}
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center">
                    {getStatusIcon(transaction.status)}
                    <span className="ml-2 capitalize">{transaction.status}</span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions;