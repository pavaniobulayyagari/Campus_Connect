import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, UserRole } from '@/types';
import { mockUsers } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  register: (username: string, email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('campus_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback((username: string, password: string) => {

  const storedUser = localStorage.getItem('campus_user');

  if (!storedUser) return false;

  const found = JSON.parse(storedUser);

  if (found.username === username) {

    setUser(found);

    localStorage.setItem(
      'campus_token',
      `mock-jwt-${found.id}-${Date.now()}`
    );

    return true;
  }

  return false;

}, []);


  const register = useCallback((username: string, email: string, _password: string, role: UserRole) => {
    const newUser: User = { id: `u${Date.now()}`, username, email, role };
    setUser(newUser);
    localStorage.setItem('campus_user', JSON.stringify(newUser));
    localStorage.setItem('campus_token', `mock-jwt-${newUser.id}-${Date.now()}`);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('campus_user');
    localStorage.removeItem('campus_token');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
