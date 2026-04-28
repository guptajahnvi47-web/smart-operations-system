import React, { createContext, useContext, useState, useEffect } from "react";
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check if user exists in local storage
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    setUser(response.data);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  };

  const signup = async (name, email, password, role) => {
    const response = await api.post('/auth/signup', { name, email, password, role });
    setUser(response.data);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};