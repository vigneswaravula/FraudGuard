import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface BatchUploadProps {
  onResults: (results: any[]) => void;
}

const BatchUpload: React.FC<BatchUploadProps> = ({ onResults }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/json': ['.json']
    },
    multiple: false
  });

  const removeFile = () => {
    setFiles([]);
  };

  const processBatch = async () => {
    if (files.length === 0) {
      toast.error('Please select a file first');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate batch processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock batch results
      const mockResults = Array.from({ length: 50 }, (_, i) => ({
        id: `BATCH-${i + 1}`,
        amount: Math.random() * 5000,
        merchant: ['Amazon', 'Walmart', 'Target', 'Best Buy', 'Unknown Store'][Math.floor(Math.random() * 5)],
        category: ['retail', 'grocery', 'online', 'gas', 'restaurant'][Math.floor(Math.random() * 5)],
        location: ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX'][Math.floor(Math.random() * 4)],
        userId: `USER${Math.floor(Math.random() * 1000)}`,
        deviceId: `DEV${Math.floor(Math.random() * 1000)}`,
        fraudScore: Math.random(),
        riskLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.3 ? 'medium' : 'low',
        isFraud: Math.random() > 0.8,
        confidence: 0.8 + Math.random() * 0.2,
        modelUsed: 'Ensemble',
        timestamp: new Date().toISOString(),
        features: {
          'Amount Anomaly': Math.random() - 0.5,
          'Time Pattern': Math.random() - 0.5,
          'Location Risk': Math.random() - 0.5,
          'Merchant Risk': Math.random() - 0.5,
          'User Pattern': Math.random() - 0.5
        }
      }));

      onResults(mockResults);
      toast.success(`Processed ${mockResults.length} transactions`);
    } catch (error) {
      toast.error('Failed to process batch');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Drop CSV or JSON file here
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          or click to browse files
        </p>
      </div>

      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-blue-500" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {files[0].name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {(files[0].size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </motion.div>
      )}

      <motion.button
        onClick={processBatch}
        disabled={files.length === 0 || isProcessing}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing Batch...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-5 w-5" />
            Process Batch
          </>
        )}
      </motion.button>
    </div>
  );
};

export default BatchUpload;