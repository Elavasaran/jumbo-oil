import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('jumbo-auth-user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    const saved = localStorage.getItem('jumbo-auth-admin');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('jumbo-auth-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('jumbo-auth-user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('jumbo-auth-admin', JSON.stringify(isAdmin));
  }, [isAdmin]);

  const loginCustomer = (email, password) => {
    // Mock login
    setUser({ id: "cust-1", name: "Rahul Sharma", email });
    setIsAdmin(false);
  };

  const loginAdmin = (email, password) => {
    // Mock admin login
    setUser({ id: "admin-1", name: "System Admin", email });
    setIsAdmin(true);
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('jumbo-auth-user');
    localStorage.removeItem('jumbo-auth-admin');
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loginCustomer, loginAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
