import React from 'react';
import { Line } from 'react-chartjs-2';

interface FraudTrendsProps {
  timeRange: string;
}

const FraudTrends: React.FC<FraudTrendsProps> = ({ timeRange }) => {
  const generateData = () => {
    const labels = [];
    const fraudData = [];
    const transactionData = [];
    
    const points = timeRange === '24h' ? 24 : timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    
    for (let i = 0; i < points; i++) {
      labels.push(`${i + 1}`);
      fraudData.push(Math.floor(Math.random() * 20) + 5);
      transactionData.push(Math.floor(Math.random() * 500) + 200);
    }
    
    return { labels, fraudData, transactionData };
  };

  const { labels, fraudData, transactionData } = generateData();

  const data = {
    labels,
    datasets: [
      {
        label: 'Fraud Cases',
        data: fraudData,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        label: 'Total Transactions',
        data: transactionData,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: 'Fraud Detection Trends',
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: timeRange === '24h' ? 'Hours' : 'Days',
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Fraud Cases',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Total Transactions',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default FraudTrends;