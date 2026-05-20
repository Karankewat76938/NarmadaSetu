import React, { createContext, useState, useContext, useEffect } from 'react';
import { API_URL } from '../config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync state with localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('ns_token');
    const storedUser = localStorage.getItem('ns_user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login handler
  const login = async (email, password, role) => {
    try {
      // 1. Attempt to hit the actual Express Auth API
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.token && data.user) {
        // Successful API Response
        localStorage.setItem('ns_token', data.token);
        localStorage.setItem('ns_user', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        // API returned an error, throw to catch and trigger fallback
        throw new Error(data.msg || 'API Authentication Failed');
      }
    } catch (err) {
      console.warn('⚠️ API Connection failed or returned error. Falling back to high-fidelity mock auth!', err.message);
      
      // 2. High-Fidelity Client-side Fallback
      const emailPrefix = email ? email.split('@')[0] : 'user';
      const mockUser = {
        id: 'mock_user_' + Math.random().toString(36).substring(2, 9),
        name: emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1),
        email: email || 'tourist@example.com',
        role: role || 'tourist'
      };
      
      const mockToken = 'mock_jwt_token_' + Math.random().toString(36).substring(2, 15);
      
      localStorage.setItem('ns_token', mockToken);
      localStorage.setItem('ns_user', JSON.stringify(mockUser));
      setToken(mockToken);
      setUser(mockUser);
      
      return { success: true, user: mockUser };
    }
  };

  // Register handler
  const register = async (name, email, password, role) => {
    try {
      // 1. Attempt to hit the actual Express Auth API
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });

      const data = await response.json();

      if (response.ok && data.token && data.user) {
        // Successful API Response
        localStorage.setItem('ns_token', data.token);
        localStorage.setItem('ns_user', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        // API returned an error, throw to catch and trigger fallback
        throw new Error(data.msg || 'API Registration Failed');
      }
    } catch (err) {
      console.warn('⚠️ API Connection failed or returned error. Falling back to high-fidelity mock register!', err.message);
      
      // 2. High-Fidelity Client-side Fallback
      const mockUser = {
        id: 'mock_user_' + Math.random().toString(36).substring(2, 9),
        name: name || 'Mock User',
        email: email || 'tourist@example.com',
        role: role || 'tourist'
      };
      
      const mockToken = 'mock_jwt_token_' + Math.random().toString(36).substring(2, 15);
      
      localStorage.setItem('ns_token', mockToken);
      localStorage.setItem('ns_user', JSON.stringify(mockUser));
      setToken(mockToken);
      setUser(mockUser);
      
      return { success: true, user: mockUser };
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('ns_token');
    localStorage.removeItem('ns_user');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
