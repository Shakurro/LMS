import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUsers = [
  // Normale Mitarbeiter (Mechaniker)
  {
    id: '1',
    name: 'Klaus Müller',
    email: 'klaus.mueller@company.com',
    department: 'Wartung',
    role: 'employee'
  },
  {
    id: '2',
    name: 'Hans Weber',
    email: 'hans.weber@company.com',
    department: 'Wartung',
    role: 'employee'
  },
  {
    id: '3',
    name: 'Peter Schmidt',
    email: 'peter.schmidt@company.com',
    department: 'Wartung',
    role: 'employee'
  },
  {
    id: '4',
    name: 'Michael Fischer',
    email: 'michael.fischer@company.com',
    department: 'Wartung',
    role: 'employee'
  },
  // Manager
  {
    id: '5',
    name: 'Thomas Wagner',
    email: 'thomas.wagner@company.com',
    department: 'Wartung',
    role: 'manager'
  },
  {
    id: '6',
    name: 'Andreas Meyer',
    email: 'andreas.meyer@company.com',
    department: 'Wartung',
    role: 'manager'
  },
  // LMS Manager
  {
    id: '7',
    name: 'Sarah Müller',
    email: 'sarah.mueller@company.com',
    department: 'HR',
    role: 'lms_manager'
  },
  {
    id: '8',
    name: 'Lisa Hoffmann',
    email: 'lisa.hoffmann@company.com',
    department: 'HR',
    role: 'lms_manager'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('lms_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user by email (password is ignored for demo)
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('lms_user', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lms_user');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 