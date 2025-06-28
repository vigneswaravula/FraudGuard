import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Transaction {
  id: string;
  amount: number;
  timestamp: string;
  merchant: string;
  category: string;
  location: string;
  is_fraud: boolean;
  fraud_score: number;
  risk_level: 'low' | 'medium' | 'high';
}

interface ModelMetrics {
  name: string;
  precision: number;
  recall: number;
  f1_score: number;
  auc: number;
  accuracy: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar?: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
  };
}

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  models: ModelMetrics[];
  setModels: (models: ModelMetrics[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  notifications: any[];
  setNotifications: (notifications: any[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [models, setModels] = useState<ModelMetrics[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'John Anderson',
    email: 'john.anderson@company.com',
    role: 'Fraud Analyst',
    department: 'Risk Management',
    preferences: {
      theme: theme,
      notifications: {
        email: true,
        push: true,
        sms: false
      }
    }
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update user preferences
    if (user) {
      setUser({
        ...user,
        preferences: {
          ...user.preferences,
          theme: newTheme
        }
      });
    }
  };

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      transactions,
      setTransactions,
      models,
      setModels,
      isLoading,
      setIsLoading,
      user,
      setUser,
      notifications,
      setNotifications
    }}>
      <div className={theme}>
        {children}
      </div>
    </AppContext.Provider>
  );
};