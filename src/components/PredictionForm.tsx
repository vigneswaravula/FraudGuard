import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, AlertTriangle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface PredictionFormProps {
  onPredict: (predictions: any[]) => void;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onPredict }) => {
  const [formData, setFormData] = useState({
    amount: '',
    merchant: '',
    category: '',
    location: '',
    time: '',
    userId: '',
    deviceId: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock prediction result
      const fraudScore = Math.random();
      const prediction = {
        id: Date.now().toString(),
        ...formData,
        amount: parseFloat(formData.amount),
        fraudScore,
        riskLevel: fraudScore > 0.7 ? 'high' : fraudScore > 0.3 ? 'medium' : 'low',
        isFraud: fraudScore > 0.5,
        confidence: 0.85 + Math.random() * 0.15,
        modelUsed: 'Ensemble',
        timestamp: new Date().toISOString(),
        features: {
          'Amount Anomaly': Math.random(),
          'Time Pattern': Math.random(),
          'Location Risk': Math.random(),
          'Merchant Risk': Math.random(),
          'User Pattern': Math.random()
        }
      };

      onPredict([prediction]);
      
      if (prediction.isFraud) {
        toast.error('🚨 Fraud detected! High risk transaction');
      } else {
        toast.success('✅ Transaction approved');
      }
    } catch (error) {
      toast.error('Failed to process prediction');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Transaction Amount ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="1250.00"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Merchant
          </label>
          <input
            type="text"
            value={formData.merchant}
            onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Amazon"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="">Select category</option>
            <option value="retail">Retail</option>
            <option value="grocery">Grocery</option>
            <option value="gas">Gas Station</option>
            <option value="restaurant">Restaurant</option>
            <option value="online">Online</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="New York, NY"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            User ID
          </label>
          <input
            type="text"
            value={formData.userId}
            onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="USER123"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Device ID
          </label>
          <input
            type="text"
            value={formData.deviceId}
            onChange={(e) => setFormData({ ...formData, deviceId: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="DEV456"
            required
          />
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </>
        ) : (
          <>
            <Zap className="mr-2 h-5 w-5" />
            Predict Fraud Risk
          </>
        )}
      </motion.button>
    </form>
  );
};

export default PredictionForm;