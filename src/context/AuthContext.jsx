import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const MOCK_ACCOUNTS = [
  { id: "admin-1", name: "System Admin", email: "admin@jumbotrades.demo", password: "admin", role: "admin" },
  { id: "cust-1", name: "Rahul Sharma", email: "rahul.sharma@example.com", password: "password123", role: "customer" },
  { id: "cust-2", name: "Priya Desai", email: "priya.desai@example.com", password: "password123", role: "customer" }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('jumboTrades_auth');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse auth state", e);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      if (user) {
        localStorage.setItem('jumboTrades_auth', JSON.stringify(user));
      } else {
        localStorage.removeItem('jumboTrades_auth');
      }
    }
  }, [user, loading]);

  const login = async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const account = MOCK_ACCOUNTS.find(acc => acc.email === email && acc.password === password);
    
    if (account) {
      const { password, ...userWithoutPassword } = account;
      setUser(userWithoutPassword);
      return { success: true, role: userWithoutPassword.role };
    }
    
    return { success: false, error: "Invalid email or password" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jumboTrades_auth');
    // Clear old keys to be safe during migration
    localStorage.removeItem('jumbo-auth-user');
    localStorage.removeItem('jumbo-auth-admin');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      loading, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
