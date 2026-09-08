import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';
import { orders as initialOrders } from '../data/orders';

const MockDataContext = createContext();

export const useMockData = () => useContext(MockDataContext);

const STORAGE_KEY = 'jumboTrades_mockData_v1';

export const MockDataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse mock data", e);
      }
    }
    // Seed initial data
    return {
      products: initialProducts,
      orders: initialOrders,
      customers: [
        { id: 'cust-1', name: 'Rahul Sharma', email: 'rahul.sharma@example.com', phone: '+91 9876543210', status: 'Active', totalSpent: 1430, ordersCount: 1 },
        { id: 'cust-2', name: 'Priya Desai', email: 'priya.desai@example.com', phone: '+91 9123456780', status: 'Active', totalSpent: 660, ordersCount: 1 }
      ],
      enquiries: [
        { id: 'enq-1', customerName: 'Arun Kumar', email: 'arun@test.com', phone: '+91 9888877777', type: 'Bulk Order', message: 'Looking for 50L coconut oil for my restaurant.', status: 'New', date: new Date().toISOString() },
        { id: 'enq-2', customerName: 'Sanjay', email: 'sanjay@test.com', phone: '+91 9999999999', type: 'Dealership', message: 'Interested in becoming a distributor.', status: 'Read', date: new Date(Date.now() - 86400000).toISOString() }
      ],
      reviews: [
        { id: 'rev-1', customerName: 'Rahul Sharma', productId: 'coconut-oil', productName: 'Coconut Oil', rating: 5, review: 'Excellent quality! Highly recommended.', status: 'Approved', date: new Date().toISOString() },
        { id: 'rev-2', customerName: 'Priya Desai', productId: 'groundnut-oil', productName: 'Groundnut Oil', rating: 4, review: 'Good taste, packaging could be better.', status: 'Pending', date: new Date(Date.now() - 172800000).toISOString() }
      ]
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  // Generic updater
  const updateData = (key, newData) => {
    setData(prev => ({ ...prev, [key]: typeof newData === 'function' ? newData(prev[key]) : newData }));
  };

  // Product Actions
  const addProduct = (product) => {
    updateData('products', prev => [...prev, product]);
  };
  
  const updateProduct = (id, updates) => {
    updateData('products', prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };
  
  const deleteProduct = (id) => {
    updateData('products', prev => prev.filter(p => p.id !== id));
  };

  // Variant/Inventory Actions
  const updateVariant = (productId, variantId, updates) => {
    updateData('products', prev => prev.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          variants: p.variants.map(v => v.id === variantId ? { ...v, ...updates } : v)
        };
      }
      return p;
    }));
  };

  const deleteVariant = (productId, variantId) => {
    updateData('products', prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, variants: p.variants.filter(v => v.id !== variantId) };
      }
      return p;
    }));
  };

  // Order Actions
  const updateOrderStatus = (orderId, newStatus) => {
    updateData('orders', prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const updatePaymentStatus = (orderId, newStatus) => {
    updateData('orders', prev => prev.map(o => o.id === orderId ? { ...o, paymentStatus: newStatus } : o));
  };

  // Review & Enquiry Actions
  const updateReviewStatus = (reviewId, newStatus) => {
    updateData('reviews', prev => prev.map(r => r.id === reviewId ? { ...r, status: newStatus } : r));
  };

  const updateEnquiryStatus = (enquiryId, newStatus) => {
    updateData('enquiries', prev => prev.map(e => e.id === enquiryId ? { ...e, status: newStatus } : e));
  };
  
  const deleteReview = (reviewId) => {
    updateData('reviews', prev => prev.filter(r => r.id !== reviewId));
  };
  
  const deleteEnquiry = (enquiryId) => {
    updateData('enquiries', prev => prev.filter(e => e.id !== enquiryId));
  };

  return (
    <MockDataContext.Provider value={{
      ...data,
      addProduct,
      updateProduct,
      deleteProduct,
      updateVariant,
      deleteVariant,
      updateOrderStatus,
      updatePaymentStatus,
      updateReviewStatus,
      updateEnquiryStatus,
      deleteReview,
      deleteEnquiry,
      updateData
    }}>
      {children}
    </MockDataContext.Provider>
  );
};
