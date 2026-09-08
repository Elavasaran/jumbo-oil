import React, { useState } from 'react';
import { useMockData } from '../../context/MockDataContext';
import { Search, AlertCircle, FileText, Download, CheckCircle, Clock, XCircle } from 'lucide-react';

const AdminPayments = () => {
  const { orders, customers, updatePaymentStatus } = useMockData();
  const [searchTerm, setSearchTerm] = useState('');

  // Extract payment records from orders
  const payments = orders.map(order => {
    const customer = customers.find(c => c.id === order.customerId);
    return {
      paymentId: `PAY-${order.id.replace('ORD-', '')}`,
      orderId: order.id,
      date: order.date,
      customerName: order.shippingAddress?.name || customer?.name || 'Unknown',
      amount: order.amount,
      method: order.paymentMethod,
      status: order.paymentStatus
    };
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredPayments = payments.filter(p => 
    p.paymentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Paid': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'Failed': return <XCircle className="w-4 h-4 text-rose-500" />;
      default: return <Clock className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900">Payments</h1>
          <p className="text-xs text-slate-500 mt-1">Track and manage customer payments</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Payment ID, Order ID, or Customer..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="px-4 py-3 md:px-6">Transaction ID</th>
                <th className="px-4 py-3 md:px-6">Order ID</th>
                <th className="px-4 py-3 md:px-6">Date</th>
                <th className="px-4 py-3 md:px-6">Customer</th>
                <th className="px-4 py-3 md:px-6">Amount</th>
                <th className="px-4 py-3 md:px-6">Method</th>
                <th className="px-4 py-3 md:px-6">Status</th>
                <th className="px-4 py-3 md:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredPayments.map(payment => (
                <tr key={payment.paymentId} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3.5 md:px-6 font-mono font-bold text-brand-navy">{payment.paymentId}</td>
                  <td className="px-4 py-3.5 md:px-6 text-slate-500 font-mono text-xs">{payment.orderId}</td>
                  <td className="px-4 py-3.5 md:px-6 text-slate-500">{new Date(payment.date).toLocaleDateString('en-GB')}</td>
                  <td className="px-4 py-3.5 md:px-6 font-bold text-slate-900">{payment.customerName}</td>
                  <td className="px-4 py-3.5 md:px-6 font-black text-slate-800">₹{payment.amount?.toLocaleString()}</td>
                  <td className="px-4 py-3.5 md:px-6">
                    <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                      {payment.method}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 md:px-6">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(payment.status)}
                      <select 
                        value={payment.status}
                        onChange={(e) => updatePaymentStatus(payment.orderId, e.target.value)}
                        className={`text-xs font-bold outline-none cursor-pointer bg-transparent ${
                          payment.status === 'Paid' ? 'text-emerald-700' :
                          payment.status === 'Failed' ? 'text-rose-700' : 'text-amber-700'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Failed">Failed</option>
                        <option value="Refunded">Refunded</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 md:px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                        <FileText className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Download Receipt">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-500">
                      <AlertCircle className="w-8 h-8 text-slate-300 mb-3" />
                      <p className="text-sm font-bold text-slate-700">No payments found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPayments;
