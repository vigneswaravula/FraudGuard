import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Predictions from './pages/Predictions';
import Models from './pages/Models';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import SystemMonitoring from './pages/SystemMonitoring';
import EnterpriseFeatures from './components/EnterpriseFeatures';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/predictions" element={<Predictions />} />
              <Route path="/models" element={<Models />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/monitoring" element={<SystemMonitoring />} />
              <Route path="/enterprise" element={<EnterpriseFeatures />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;