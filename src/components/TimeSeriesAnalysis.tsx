import React from 'react';
import { Line } from 'react-chartjs-2';

interface TimeSeriesAnalysisProps {
  timeRange: string;
}

const TimeSeriesAnalysis: React.FC<TimeSeriesAnalysisProps> = ({ timeRange }) => {
  const generateData = () => {
    const labels = [];
    const fraudRateData = [];
    
    const points = timeRange === '24h' ? 24 : timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    
    for (let i = 0; i < points; i++) {
      labels.push(`${i + 1}`);
      fraudRateData.push((Math.random() * 2 + 0.5).toFixed(2));
    }
    
    return { labels, fraudRateData };
  };

  const { labels, fraudRateData } = generateData();

  const data = {
    labels,
    datasets: [
      {
        label: 'Fraud Rate (%)',
        data: fraudRateData,
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Fraud Rate Over Time',
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
        display: true,
        title: {
          display: true,
          text: 'Fraud Rate (%)',
        },
        beginAtZero: true,
        max: 5,
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

export default TimeSeriesAnalysis;