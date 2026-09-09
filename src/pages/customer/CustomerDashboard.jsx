import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { User, Package, MapPin, CreditCard, LogOut, LayoutDashboard, CheckCircle2, Clock, Eye } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const CustomerDashboard = () => {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-navy border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  // Load orders from localStorage or default mock orders
  const savedOrders = JSON.parse(localStorage.getItem('jumbo-orders') || '[]');
  const defaultOrders = [
    {
      orderId: 'JT2026001',
      date: '12 Sep 2026',
      itemsCount: 2,
      amount: 1509,
      status: 'Delivered',
      paymentMethod: 'Online Payment (UPI)',
      address: '42 Lotus Heights, Green Glen Layout, Chennai, Tamil Nadu - 600028'
    },
    {
      orderId: 'JT2026002',
      date: '05 Sep 2026',
      itemsCount: 1,
      amount: 879,
      status: 'Processing',
      paymentMethod: 'Cash on Delivery (COD)',
      address: '42 Lotus Heights, Green Glen Layout, Chennai, Tamil Nadu - 600028'
    },
    {
      orderId: 'JT2026003',
      date: '28 Aug 2026',
      itemsCount: 2,
      amount: 1200,
      status: 'Confirmed',
      paymentMethod: 'Online Payment (Card)',
      address: '42 Lotus Heights, Green Glen Layout, Chennai, Tamil Nadu - 600028'
    }
  ];

  const ordersList = savedOrders.length > 0 ? savedOrders : defaultOrders;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation matching Reference */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
              <div className="w-14 h-14 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center font-black text-xl shadow-sm">
                {user ? user.name.charAt(0) : 'K'}
              </div>
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Welcome Back!</span>
                <h3 className="text-lg font-black text-slate-900 leading-tight">
                  {user ? user.name : 'Karthik Kumar'}
                </h3>
                <span className="text-xs text-slate-500">{user ? user.email : 'karthik@example.com'}</span>
              </div>
            </div>

            <nav className="space-y-1 text-sm font-bold">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'orders', label: 'My Orders', icon: Package },
                { id: 'addresses', label: 'Addresses', icon: MapPin },
                { id: 'payments', label: 'Payment Methods', icon: CreditCard },
                { id: 'profile', label: 'My Profile', icon: User },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-amber-700 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all text-left pt-4 border-t border-slate-100 mt-4"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </nav>
          </div>

          {/* Main Dashboard Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-black text-brand-navy">My Orders</h2>
                  <span className="text-xs font-bold text-slate-500">{ordersList.length} Orders Placed</span>
                </div>

                <div className="space-y-4">
                  {ordersList.map((order, idx) => (
                    <div 
                      key={idx}
                      className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-amber-500/40 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-black text-slate-900">
                            #{order.orderId}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                            order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500">
                          Placed on {order.date} • {order.itemsCount || 1} items
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                        <div className="text-right">
                          <span className="text-xs text-slate-400 block">Total Amount</span>
                          <span className="font-black text-slate-900 text-base">₹{order.amount}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(order)}
                          className="px-4 py-2 bg-slate-100 hover:bg-amber-100 hover:text-amber-800 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DASHBOARD OVERVIEW TAB */}
            {activeTab === 'dashboard' && (
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-xl font-black text-brand-navy">Account Dashboard</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200">
                    <span className="text-xs font-bold text-slate-500 uppercase block mb-1">Total Orders</span>
                    <span className="text-3xl font-black text-brand-navy">{ordersList.length}</span>
                  </div>
                  <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200">
                    <span className="text-xs font-bold text-slate-500 uppercase block mb-1">Total Spent</span>
                    <span className="text-3xl font-black text-emerald-800">
                      ₹{ordersList.reduce((acc, o) => acc + o.amount, 0)}
                    </span>
                  </div>
                  <div className="p-5 bg-blue-50 rounded-2xl border border-blue-200">
                    <span className="text-xs font-bold text-slate-500 uppercase block mb-1">Saved Addresses</span>
                    <span className="text-3xl font-black text-blue-800">2</span>
                  </div>
                </div>
              </div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-xl font-black text-brand-navy">Saved Addresses</h2>
                <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50 text-xs space-y-1">
                  <span className="font-bold text-slate-900 block text-sm">Default Shipping Address</span>
                  <p className="text-slate-600">42 Lotus Heights, Green Glen Layout</p>
                  <p className="text-slate-600">Chennai, Tamil Nadu - 600028</p>
                  <p className="text-slate-600">Phone: +91 98765 43210</p>
                </div>
              </div>
            )}

            {/* PAYMENTS TAB */}
            {activeTab === 'payments' && (
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-xl font-black text-brand-navy">Saved Payment Methods</h2>
                <p className="text-xs text-slate-500">Your mock payment methods are listed below.</p>
                <div className="p-4 border border-slate-200 rounded-xl flex items-center justify-between text-xs font-bold">
                  <span>UPI ID: rahul@upi</span>
                  <span className="text-emerald-600">Verified</span>
                </div>
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-xl font-black text-brand-navy">Profile Details</h2>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                    <input type="text" readOnly value={user ? user.name : 'Karthik Kumar'} className="w-full p-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-800" />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                    <input type="text" readOnly value={user ? user.email : 'karthik@example.com'} className="w-full p-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-800" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* View Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full space-y-4 border border-slate-200 shadow-2xl">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="font-black text-slate-900 text-lg">Order Details #{selectedOrder.orderId}</h3>
                <button type="button" onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-slate-800">✕</button>
              </div>
              <div className="text-xs space-y-2 text-slate-600">
                <div><strong>Date:</strong> {selectedOrder.date}</div>
                <div><strong>Status:</strong> {selectedOrder.status}</div>
                <div><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</div>
                <div><strong>Total Amount:</strong> ₹{selectedOrder.amount}</div>
                <div><strong>Delivery Address:</strong> {selectedOrder.address}</div>
              </div>
              <div className="pt-4 text-right">
                <button type="button" onClick={() => setSelectedOrder(null)} className="bg-brand-navy text-white px-6 py-2.5 rounded-xl font-bold text-xs">Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
