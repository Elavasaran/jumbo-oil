import React, { useState } from 'react';
import { useMockData } from '../../context/MockDataContext';
import { Eye, Edit, Search, AlertCircle, X, ChevronDown, Check } from 'lucide-react';

const AdminOrders = () => {
  const { orders, customers, updateOrderStatus, updatePaymentStatus } = useMockData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter(o => {
    const customer = customers.find(c => c.id === o.customerId);
    const matchesSearch = 
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.shippingAddress?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Shipped': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Cancelled': return 'bg-rose-100 text-rose-800 border-rose-200';
      default: return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  const getPaymentStatusColor = (status) => {
    return status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900">Orders</h1>
          <p className="text-xs text-slate-500 mt-1">Manage and track customer orders</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Order ID or Customer..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-48 p-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="px-4 py-3 md:px-6">Order ID</th>
                <th className="px-4 py-3 md:px-6">Date</th>
                <th className="px-4 py-3 md:px-6">Customer</th>
                <th className="px-4 py-3 md:px-6">Amount</th>
                <th className="px-4 py-3 md:px-6">Payment</th>
                <th className="px-4 py-3 md:px-6">Order Status</th>
                <th className="px-4 py-3 md:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredOrders.map(order => {
                const customer = customers.find(c => c.id === order.customerId);
                return (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3.5 md:px-6 font-mono font-bold text-brand-navy">{order.id}</td>
                    <td className="px-4 py-3.5 md:px-6 text-slate-500">{new Date(order.date).toLocaleDateString('en-GB')}</td>
                    <td className="px-4 py-3.5 md:px-6">
                      <p className="font-bold text-slate-900">{order.shippingAddress?.name || customer?.name || 'Unknown'}</p>
                      <p className="text-[10px] text-slate-500">{order.shippingAddress?.city}</p>
                    </td>
                    <td className="px-4 py-3.5 md:px-6 font-black text-slate-800">₹{order.amount?.toLocaleString()}</td>
                    <td className="px-4 py-3.5 md:px-6">
                      <div className="flex flex-col gap-1 items-start">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">{order.paymentMethod}</span>
                        <select 
                          value={order.paymentStatus}
                          onChange={(e) => updatePaymentStatus(order.id, e.target.value)}
                          className={`px-2 py-0.5 rounded border outline-none text-[10px] font-bold cursor-pointer ${getPaymentStatusColor(order.paymentStatus)} border-transparent hover:border-current`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Paid">Paid</option>
                          <option value="Failed">Failed</option>
                          <option value="Refunded">Refunded</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 md:px-6">
                      <select 
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className={`border rounded-lg px-2.5 py-1 text-xs font-bold outline-none cursor-pointer transition-colors ${getStatusColor(order.status)}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-4 py-3.5 md:px-6 text-right">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="px-3 py-1.5 bg-white border border-slate-200 hover:border-brand-navy hover:bg-brand-navy hover:text-white text-slate-700 rounded-lg font-bold text-[11px] transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-500">
                      <AlertCircle className="w-8 h-8 text-slate-300 mb-3" />
                      <p className="text-sm font-bold text-slate-700">No orders found</p>
                      <p className="text-xs mt-1">Adjust filters or search query.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 md:p-6 border-b border-slate-100 bg-slate-50/50 shrink-0">
              <div>
                <h2 className="text-lg font-black text-slate-900">Order Details</h2>
                <p className="text-xs text-slate-500 font-mono mt-1">{selectedOrder.id}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 md:p-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Customer Details</h3>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="font-bold text-slate-900">{selectedOrder.shippingAddress?.name}</p>
                    <p className="text-sm text-slate-600 mt-1">{selectedOrder.shippingAddress?.address}</p>
                    <p className="text-sm text-slate-600">{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state}</p>
                    <p className="text-sm text-slate-600">{selectedOrder.shippingAddress?.pincode}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Payment Info</h3>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">Method</span>
                      <span className="text-sm font-bold text-slate-900">{selectedOrder.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">Status</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                        {selectedOrder.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Order Items</h3>
                <div className="border border-slate-100 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-bold text-[10px] uppercase">
                      <tr>
                        <th className="px-4 py-2">Item</th>
                        <th className="px-4 py-2">Size</th>
                        <th className="px-4 py-2 text-center">Qty</th>
                        <th className="px-4 py-2 text-right">Price</th>
                        <th className="px-4 py-2 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedOrder.products.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-3 font-bold text-slate-900">{item.name}</td>
                          <td className="px-4 py-3 text-slate-600">{item.size}</td>
                          <td className="px-4 py-3 text-center font-medium">{item.quantity}</td>
                          <td className="px-4 py-3 text-right text-slate-600">₹{item.price}</td>
                          <td className="px-4 py-3 text-right font-black text-slate-900">₹{item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-end">
                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-500 uppercase">Order Total</p>
                      <p className="text-xl font-black text-brand-navy">₹{selectedOrder.amount?.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 md:p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end shrink-0 gap-3">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors text-sm bg-white shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
