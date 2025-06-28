import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  Activity,
  DollarSign,
  Users,
  Clock,
  CheckCircle
} from 'lucide-react';
import StatCard from '../components/StatCard';
import RealTimeChart from '../components/RealTimeChart';
import RecentTransactions from '../components/RecentTransactions';
import RiskDistribution from '../components/RiskDistribution';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalTransactions: 0,
    fraudDetected: 0,
    avgResponseTime: 0,
    accuracy: 0,
    totalAmount: 0,
    activeUsers: 0
  });

  useEffect(() => {
    // Simulate real-time stats updates
    const interval = setInterval(() => {
      setStats(prev => ({
        totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 10) + 1,
        fraudDetected: prev.fraudDetected + (Math.random() > 0.95 ? 1 : 0),
        avgResponseTime: 120 + Math.random() * 100,
        accuracy: 96.5 + Math.random() * 2,
        totalAmount: prev.totalAmount + Math.random() * 10000,
        activeUsers: 1200 + Math.floor(Math.random() * 100)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Transactions"
          value={stats.totalTransactions.toLocaleString()}
          icon={Activity}
          color="blue"
          change="+12.5%"
        />
        <StatCard
          title="Fraud Detected"
          value={stats.fraudDetected.toString()}
          icon={AlertTriangle}
          color="red"
          change="+2.1%"
        />
        <StatCard
          title="Avg Response Time"
          value={`${Math.round(stats.avgResponseTime)}ms`}
          icon={Clock}
          color="green"
          change="-5.2%"
        />
        <StatCard
          title="Model Accuracy"
          value={`${stats.accuracy.toFixed(1)}%`}
          icon={CheckCircle}
          color="purple"
          change="+0.8%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <RealTimeChart />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <RiskDistribution />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <RecentTransactions />
      </motion.div>
    </div>
  );
};

export default Dashboard;