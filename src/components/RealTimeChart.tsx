import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RealTimeChart: React.FC = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Total Transactions',
        data: [],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Fraud Detected',
        data: [],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
      }
    ]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeLabel = now.toLocaleTimeString();
      
      setData(prev => {
        const newLabels = [...prev.labels, timeLabel].slice(-20);
        const newTransactions = [...prev.datasets[0].data, Math.floor(Math.random() * 100) + 50].slice(-20);
        const newFraud = [...prev.datasets[1].data, Math.floor(Math.random() * 5)].slice(-20);
        
        return {
          labels: newLabels,
          datasets: [
            {
              ...prev.datasets[0],
              data: newTransactions
            },
            {
              ...prev.datasets[1],
              data: newFraud
            }
          ]
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Real-time Transaction Monitoring',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    animation: {
      duration: 300,
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

export default RealTimeChart;