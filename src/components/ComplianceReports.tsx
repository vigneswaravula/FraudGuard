import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';

const ComplianceReports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('pci-dss');

  const complianceMetrics = {
    'pci-dss': {
      score: 98.5,
      status: 'compliant',
      lastAudit: '2024-01-10',
      nextAudit: '2024-04-10',
      requirements: [
        { name: 'Data Encryption', status: 'compliant', score: 100 },
        { name: 'Access Control', status: 'compliant', score: 98 },
        { name: 'Network Security', status: 'compliant', score: 97 },
        { name: 'Monitoring', status: 'compliant', score: 99 }
      ]
    },
    'sox': {
      score: 96.2,
      status: 'compliant',
      lastAudit: '2024-01-05',
      nextAudit: '2024-07-05',
      requirements: [
        { name: 'Financial Controls', status: 'compliant', score: 98 },
        { name: 'Data Integrity', status: 'compliant', score: 95 },
        { name: 'Audit Trail', status: 'compliant', score: 97 },
        { name: 'Risk Assessment', status: 'compliant', score: 94 }
      ]
    },
    'gdpr': {
      score: 94.8,
      status: 'compliant',
      lastAudit: '2024-01-15',
      nextAudit: '2024-04-15',
      requirements: [
        { name: 'Data Protection', status: 'compliant', score: 96 },
        { name: 'Consent Management', status: 'compliant', score: 93 },
        { name: 'Data Retention', status: 'compliant', score: 95 },
        { name: 'Breach Notification', status: 'compliant', score: 95 }
      ]
    }
  };

  const reports = [
    { id: 'pci-dss', name: 'PCI DSS Compliance', icon: Shield },
    { id: 'sox', name: 'SOX Compliance', icon: FileText },
    { id: 'gdpr', name: 'GDPR Compliance', icon: Shield }
  ];

  const currentMetrics = complianceMetrics[selectedReport as keyof typeof complianceMetrics];

  const complianceTrend = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Compliance Score',
        data: [92, 94, 96, 95, 97, 98.5],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
      }
    ]
  };

  const requirementsChart = {
    labels: currentMetrics.requirements.map(req => req.name),
    datasets: [
      {
        data: currentMetrics.requirements.map(req => req.score),
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(251, 191, 36, 0.8)'
        ],
        borderWidth: 0
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Compliance Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Compliance Dashboard
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {reports.map((report) => (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedReport === report.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <report.icon className="h-6 w-6 text-blue-600" />
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {report.name}
                </h4>
              </div>
              <div className="text-2xl font-bold text-green-600 mb-1">
                {complianceMetrics[report.id as keyof typeof complianceMetrics].score}%
              </div>
              <div className="flex items-center text-sm text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                Compliant
              </div>
            </button>
          ))}
        </div>

        {/* Selected Report Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">
              Compliance Trend
            </h4>
            <div className="h-64">
              <Line 
                data={complianceTrend}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: false,
                      min: 90,
                      max: 100
                    }
                  }
                }}
              />
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">
              Requirements Breakdown
            </h4>
            <div className="h-64">
              <Bar 
                data={requirementsChart}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: false,
                      min: 90,
                      max: 100
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Requirements Details */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {reports.find(r => r.id === selectedReport)?.name} Requirements
          </h3>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Last Audit: {currentMetrics.lastAudit}
            </span>
            <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              <Download className="h-4 w-4 mr-1" />
              Export Report
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {currentMetrics.requirements.map((requirement, index) => (
            <motion.div
              key={requirement.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {requirement.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Score: {requirement.score}%
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-sm rounded-full">
                {requirement.status}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <h4 className="font-medium text-blue-900 dark:text-blue-300">
              Next Audit Scheduled
            </h4>
          </div>
          <p className="text-blue-800 dark:text-blue-200">
            {currentMetrics.nextAudit} - Ensure all requirements maintain compliance scores above 95%
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComplianceReports;