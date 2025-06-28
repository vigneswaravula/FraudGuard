import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Users, 
  Globe, 
  Zap, 
  Lock, 
  Database,
  Cloud,
  Settings,
  CheckCircle,
  Star
} from 'lucide-react';

const EnterpriseFeatures: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState('security');

  const features = [
    {
      id: 'security',
      name: 'Advanced Security',
      icon: Shield,
      description: 'Enterprise-grade security with SOC 2 Type II compliance',
      details: [
        'End-to-end encryption (AES-256)',
        'Multi-factor authentication',
        'Role-based access control',
        'Security audit logging',
        'Penetration testing reports',
        'GDPR & PCI DSS compliance'
      ]
    },
    {
      id: 'scalability',
      name: 'Global Scalability',
      icon: Globe,
      description: 'Scale to millions of transactions with global infrastructure',
      details: [
        'Auto-scaling infrastructure',
        'Global CDN deployment',
        'Multi-region redundancy',
        '99.99% uptime SLA',
        'Load balancing',
        'Edge computing optimization'
      ]
    },
    {
      id: 'performance',
      name: 'High Performance',
      icon: Zap,
      description: 'Sub-100ms prediction latency with optimized ML models',
      details: [
        'Real-time inference (<100ms)',
        'Batch processing capabilities',
        'Model optimization',
        'Caching strategies',
        'Performance monitoring',
        'Custom hardware acceleration'
      ]
    },
    {
      id: 'collaboration',
      name: 'Team Collaboration',
      icon: Users,
      description: 'Advanced team management and collaboration tools',
      details: [
        'Multi-tenant architecture',
        'Team workspaces',
        'Permission management',
        'Audit trails',
        'Shared dashboards',
        'API key management'
      ]
    },
    {
      id: 'integration',
      name: 'Enterprise Integration',
      icon: Database,
      description: 'Seamless integration with enterprise systems',
      details: [
        'REST & GraphQL APIs',
        'Webhook notifications',
        'SAML/SSO integration',
        'Custom connectors',
        'Data pipeline tools',
        'Legacy system support'
      ]
    },
    {
      id: 'deployment',
      name: 'Flexible Deployment',
      icon: Cloud,
      description: 'Deploy on-premises, cloud, or hybrid environments',
      details: [
        'Cloud deployment (AWS, GCP, Azure)',
        'On-premises installation',
        'Hybrid cloud setup',
        'Kubernetes support',
        'Docker containers',
        'Air-gapped environments'
      ]
    }
  ];

  const certifications = [
    { name: 'SOC 2 Type II', status: 'certified' },
    { name: 'ISO 27001', status: 'certified' },
    { name: 'PCI DSS Level 1', status: 'certified' },
    { name: 'GDPR Compliant', status: 'certified' },
    { name: 'HIPAA Ready', status: 'certified' },
    { name: 'FedRAMP', status: 'in-progress' }
  ];

  const selectedFeatureData = features.find(f => f.id === selectedFeature);

  return (
    <div className="space-y-6">
      {/* Feature Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Enterprise-Grade Fraud Detection
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Built for scale, security, and performance. Our enterprise platform provides 
            everything you need to protect your business from fraud at any scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.button
              key={feature.id}
              onClick={() => setSelectedFeature(feature.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                selectedFeature === feature.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <feature.icon className={`h-8 w-8 mb-4 ${
                selectedFeature === feature.id ? 'text-blue-600' : 'text-gray-600'
              }`} />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {feature.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Selected Feature Details */}
      {selectedFeatureData && (
        <motion.div
          key={selectedFeature}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <selectedFeatureData.icon className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {selectedFeatureData.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedFeatureData.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedFeatureData.details.map((detail, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{detail}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Certifications & Compliance */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Security Certifications & Compliance
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  cert.status === 'certified' 
                    ? 'bg-green-100 dark:bg-green-900/20' 
                    : 'bg-yellow-100 dark:bg-yellow-900/20'
                }`}>
                  {cert.status === 'certified' ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <Settings className="h-5 w-5 text-yellow-600" />
                  )}
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {cert.name}
                </span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                cert.status === 'certified'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
              }`}>
                {cert.status === 'certified' ? 'Certified' : 'In Progress'}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enterprise Support */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">
              Enterprise Support & Services
            </h3>
            <p className="text-blue-100 mb-4">
              Get dedicated support, custom integrations, and professional services
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span>24/7 Priority Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-200" />
                <span>Dedicated Customer Success Manager</span>
              </div>
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-blue-200" />
                <span>Custom Model Training</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-blue-200" />
                <span>On-premises Deployment</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseFeatures;