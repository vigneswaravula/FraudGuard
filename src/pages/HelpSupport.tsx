import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  MessageCircle, 
  Book, 
  Video, 
  ArrowLeft, 
  Search,
  ChevronRight,
  ExternalLink,
  Send
} from 'lucide-react';
import toast from 'react-hot-toast';

interface HelpSupportProps {
  onBack: () => void;
}

const HelpSupport: React.FC<HelpSupportProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [supportTicket, setSupportTicket] = useState({
    subject: '',
    category: 'technical',
    priority: 'medium',
    description: ''
  });

  const faqCategories = [
    { id: 'all', name: 'All Topics' },
    { id: 'getting-started', name: 'Getting Started' },
    { id: 'api', name: 'API Usage' },
    { id: 'models', name: 'Models & Training' },
    { id: 'billing', name: 'Billing' },
    { id: 'security', name: 'Security' }
  ];

  const faqs = [
    {
      id: 1,
      category: 'getting-started',
      question: 'How do I get started with fraud detection?',
      answer: 'Start by creating an API key, then use our prediction endpoint to analyze transactions. Check our Quick Start guide for detailed steps.'
    },
    {
      id: 2,
      category: 'api',
      question: 'What is the rate limit for API calls?',
      answer: 'Premium accounts have a rate limit of 1000 requests per minute. Enterprise accounts have higher limits. Contact support for custom limits.'
    },
    {
      id: 3,
      category: 'models',
      question: 'How often should I retrain my models?',
      answer: 'We recommend retraining models weekly or when you have 1000+ new labeled transactions. Our system can automatically retrain based on your preferences.'
    },
    {
      id: 4,
      category: 'billing',
      question: 'How is usage calculated?',
      answer: 'Usage is calculated per prediction request. Batch predictions count as individual requests. Model training and data storage have separate pricing.'
    },
    {
      id: 5,
      category: 'security',
      question: 'How is my data protected?',
      answer: 'All data is encrypted in transit and at rest using AES-256. We are SOC 2 Type II compliant and follow industry best practices for data security.'
    },
    {
      id: 6,
      category: 'api',
      question: 'What data format should I use for predictions?',
      answer: 'Send transaction data as JSON with required fields: amount, merchant, category, location, userId, and deviceId. See our API documentation for examples.'
    }
  ];

  const resources = [
    {
      title: 'API Documentation',
      description: 'Complete reference for all API endpoints',
      icon: Book,
      link: '#',
      type: 'documentation'
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      icon: Video,
      link: '#',
      type: 'video'
    },
    {
      title: 'Best Practices Guide',
      description: 'Tips for optimal fraud detection',
      icon: HelpCircle,
      link: '#',
      type: 'guide'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other users',
      icon: MessageCircle,
      link: '#',
      type: 'community'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const submitTicket = () => {
    if (!supportTicket.subject.trim() || !supportTicket.description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    toast.success('Support ticket submitted successfully');
    setSupportTicket({
      subject: '',
      category: 'technical',
      priority: 'medium',
      description: ''
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Help & Support
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Get help and find answers to common questions
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {resources.map((resource, index) => (
          <motion.a
            key={index}
            href={resource.link}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
          >
            <div className="flex items-center space-x-3 mb-3">
              <resource.icon className="h-6 w-6 text-blue-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {resource.title}
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {resource.description}
            </p>
            <div className="flex items-center text-blue-600 text-sm font-medium">
              <span>Learn more</span>
              <ExternalLink className="h-3 w-3 ml-1" />
            </div>
          </motion.a>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions
        </h3>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            {faqCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <details key={faq.id} className="group">
              <summary className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <span className="font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                <ChevronRight className="h-4 w-4 text-gray-500 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="p-4 text-gray-600 dark:text-gray-400">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-8">
            <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              No FAQs found matching your search.
            </p>
          </div>
        )}
      </div>

      {/* Contact Support */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Contact Support
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Methods */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">
              Get in Touch
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Live Chat</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Available 24/7</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <HelpCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Email Support</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">support@fraudguard.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Book className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Documentation</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Comprehensive guides</p>
                </div>
              </div>
            </div>
          </div>

          {/* Support Ticket Form */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">
              Submit a Ticket
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  value={supportTicket.subject}
                  onChange={(e) => setSupportTicket({ ...supportTicket, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Brief description of your issue"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={supportTicket.category}
                    onChange={(e) => setSupportTicket({ ...supportTicket, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing Question</option>
                    <option value="feature">Feature Request</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority
                  </label>
                  <select
                    value={supportTicket.priority}
                    onChange={(e) => setSupportTicket({ ...supportTicket, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  value={supportTicket.description}
                  onChange={(e) => setSupportTicket({ ...supportTicket, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Please provide detailed information about your issue..."
                />
              </div>

              <button
                onClick={submitTicket}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="mr-2 h-4 w-4" />
                Submit Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HelpSupport;