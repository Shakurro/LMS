import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  role: 'employee' | 'manager' | 'lms_manager' | 'admin';
  managerId?: string;
  position: string;
  avatar?: string;
  joinDate: string;
  country: string;
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
    role: 'employee' as const,
    position: 'KFZ-Mechaniker',
    joinDate: '2020-03-15',
    country: 'Germany'
  },
  {
    id: '2',
    name: 'Hans Weber',
    email: 'hans.weber@company.com',
    department: 'Wartung',
    role: 'employee' as const,
    position: 'NFZ-Mechaniker',
    joinDate: '2019-08-22',
    country: 'Germany'
  },
  {
    id: '3',
    name: 'Peter Schmidt',
    email: 'peter.schmidt@company.com',
    department: 'Wartung',
    role: 'employee' as const,
    position: 'KFZ-Mechaniker',
    joinDate: '2021-01-10',
    country: 'Germany'
  },
  {
    id: '4',
    name: 'Michael Fischer',
    email: 'michael.fischer@company.com',
    department: 'Wartung',
    role: 'employee' as const,
    position: 'NFZ-Mechaniker',
    joinDate: '2020-11-05',
    country: 'Germany'
  },
  // Manager
  {
    id: '5',
    name: 'Thomas Wagner',
    email: 'thomas.wagner@company.com',
    department: 'Wartung',
    role: 'manager' as const,
    position: 'Wartungsleiter NFZ',
    joinDate: '2018-06-12',
    country: 'Germany'
  },
  {
    id: '6',
    name: 'Andreas Meyer',
    email: 'andreas.meyer@company.com',
    department: 'Wartung',
    role: 'manager' as const,
    position: 'Wartungsleiter KFZ',
    joinDate: '2019-03-20',
    country: 'Germany'
  },
  // LMS Manager
  {
    id: '7',
    name: 'Sarah Müller',
    email: 'sarah.mueller@company.com',
    department: 'HR',
    role: 'lms_manager' as const,
    position: 'LMS Manager',
    joinDate: '2020-09-01',
    country: 'Germany'
  },
  {
    id: '8',
    name: 'Lisa Hoffmann',
    email: 'lisa.hoffmann@company.com',
    department: 'HR',
    role: 'lms_manager' as const,
    position: 'LMS Manager',
    joinDate: '2021-02-14',
    country: 'Germany'
  },
  // Admin Benutzer
  {
    id: '21',
    name: 'Admin User',
    email: 'admin@company.com',
    department: 'IT',
    role: 'admin' as const,
    position: 'System Administrator',
    joinDate: '2020-01-01',
    country: 'Germany'
  },
  {
    id: '22',
    name: 'Maria Admin',
    email: 'maria.admin@company.com',
    department: 'HR',
    role: 'admin' as const,
    position: 'HR Administrator',
    joinDate: '2021-03-15',
    country: 'Germany'
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