import React from 'react';
import { Bar } from 'react-chartjs-2';

const FeatureImportance: React.FC = () => {
  const features = [
    'Transaction Amount',
    'Time of Day',
    'Merchant Risk Score',
    'Location Anomaly',
    'User Behavior Pattern',
    'Device Fingerprint',
    'Transaction Frequency',
    'Payment Method'
  ];

  const importance = [0.85, 0.72, 0.68, 0.61, 0.55, 0.49, 0.41, 0.33];

  const data = {
    labels: features,
    datasets: [
      {
        label: 'Feature Importance',
        data: importance,
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(20, 184, 166, 0.8)',
          'rgba(156, 163, 175, 0.8)',
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(251, 191, 36, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(20, 184, 166, 1)',
          'rgba(156, 163, 175, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    plugins: {
      title: {
        display: true,
        text: 'Feature Importance (SHAP Values)',
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 1,
        title: {
          display: true,
          text: 'Importance Score',
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="h-80">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default FeatureImportance;