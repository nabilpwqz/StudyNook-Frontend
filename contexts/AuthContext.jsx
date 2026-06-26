import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authAPI.getProfile();
        if (response.data.success) {
          setUser(response.data.data);
        }
      } catch (err) {
        // User not authenticated
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const register = async (formData) => {
    try {
      setError(null);
      const response = await authAPI.register(formData);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed";
      setError(errorMsg);
      throw err;
    }
  };

  const login = async (formData) => {
    try {
      setError(null);
      const response = await authAPI.login(formData);
      if (response.data.success) {
        setUser(response.data.user);
      }
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed";
      setError(errorMsg);
      throw err;
    }
  };

  const refreshUser = async () => {
    try {
      const response = await authAPI.getProfile();
      if (response.data.success) {
        setUser(response.data.data);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
      setError(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
