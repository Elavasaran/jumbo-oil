import React, { useState } from 'react';
import { useMockData } from '../../context/MockDataContext';
import { Search, AlertCircle, Eye, Edit, UserX } from 'lucide-react';

const AdminCustomers = () => {
  const { customers, orders } = useMockData();
  const [searchTerm, setSearchTerm] = useState('');

  // Dynamically calculate order counts and total spent
  const enrichedCustomers = customers.map(customer => {
    const customerOrders = orders.filter(o => o.customerId === customer.id && o.status !== 'Cancelled');
    const ordersCount = customerOrders.length;
    const totalSpent = customerOrders.reduce((sum, order) => sum + (order.amount || 0), 0);
    
    return {
      ...customer,
      ordersCount,
      totalSpent
    };
  });

  const filteredCustomers = enrichedCustomers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900">Customers</h1>
          <p className="text-xs text-slate-500 mt-1">Manage customer profiles and history</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, email, or phone..." 
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
                <th className="px-4 py-3 md:px-6">Customer</th>
                <th className="px-4 py-3 md:px-6">Contact Info</th>
                <th className="px-4 py-3 md:px-6 text-center">Orders</th>
                <th className="px-4 py-3 md:px-6 text-right">Total Spent</th>
                <th className="px-4 py-3 md:px-6">Status</th>
                <th className="px-4 py-3 md:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredCustomers.map(customer => (
                <tr key={customer.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3.5 md:px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-black shrink-0 border border-slate-200 shadow-sm">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{customer.name}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5 font-mono">{customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 md:px-6 text-slate-600">
                    <div className="font-medium">{customer.email}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{customer.phone}</div>
                  </td>
                  <td className="px-4 py-3.5 md:px-6 text-center">
                    <span className="inline-flex items-center justify-center min-w-[2rem] h-6 px-2 bg-slate-100 text-slate-700 rounded-md text-xs font-bold border border-slate-200">
                      {customer.ordersCount}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 md:px-6 font-black text-slate-900 text-right">
                    ₹{customer.totalSpent.toLocaleString()}
                  </td>
                  <td className="px-4 py-3.5 md:px-6">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                      customer.status === 'Active' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 md:px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-brand-navy hover:bg-slate-100 rounded-lg transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Customer">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Deactivate">
                        <UserX className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-500">
                      <AlertCircle className="w-8 h-8 text-slate-300 mb-3" />
                      <p className="text-sm font-bold text-slate-700">No customers found</p>
                      <p className="text-xs mt-1">Adjust search query.</p>
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

export default AdminCustomers;
