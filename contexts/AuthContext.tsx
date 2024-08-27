import React, { createContext, useState, useContext, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      // Mock implementation for development without backend
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    if (email === "test@example.com" && password === "password123") {
      setUser({ id: "1", email, name: "Test User" });
      localStorage.setproduct("authToken", "mockToken");
      setError(null);
    } else {
      setError("Invalid email or password");
      throw new Error("Invalid email or password");
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeproduct("authToken");
  };

  const signup = async (email: string, password: string, name: string) => {
    // Mock implementation for development without backend
    setUser({ id: "2", email, name });
    localStorage.setproduct("authToken", "mockToken");
    setError(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    signup,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
