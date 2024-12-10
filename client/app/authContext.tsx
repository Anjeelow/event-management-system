'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from './axiosInstance';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  userId: number | null;
  setUserId: (userId: number) => void;
  handleLogout: () => void;
  setIsAuthenticated: (auth: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userId: null,
  setUserId: () => {},
  handleLogout: () => {},
  setIsAuthenticated: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setUserId(null);
    router.push('/');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('user_id');

    if (token) {
      axiosInstance.post('/api/verify-token')
        .then(() => {
          setIsAuthenticated(true);
          setUserId(Number(storedUserId));
        })
        .catch(() => handleLogout());
    } else {
      handleLogout();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, setUserId, handleLogout, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
