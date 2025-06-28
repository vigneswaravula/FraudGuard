import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Zap, Download, Eye } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import PredictionForm from '../components/PredictionForm';
import PredictionResults from '../components/PredictionResults';
import BatchUpload from '../components/BatchUpload';

const Predictions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'single' | 'batch'>('single');
  const [predictions, setPredictions] = useState<any[]>([]);

  const tabs = [
    { id: 'single', name: 'Single Prediction', icon: Zap },
    { id: 'batch', name: 'Batch Processing', icon: Upload }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Real-time Fraud Prediction
        </h2>
        
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'single' | 'batch')}
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

        {activeTab === 'single' ? (
          <PredictionForm onPredict={setPredictions} />
        ) : (
          <BatchUpload onResults={setPredictions} />
        )}
      </div>

      {predictions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PredictionResults predictions={predictions} />
        </motion.div>
      )}
    </div>
  );
};

export default Predictions;