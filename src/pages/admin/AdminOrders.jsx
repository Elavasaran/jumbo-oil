import React from 'react';
import { orders } from '../../data/orders';
import { Eye, Edit } from 'lucide-react';

const AdminOrders = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <div className="flex gap-2">
          <select className="border border-gray-200 rounded-lg p-2 text-sm bg-gray-50 focus:ring-brand-gold outline-none">
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Delivered</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Payment</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-brand-navy">{order.id}</td>
                  <td className="px-6 py-4 text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-medium">{order.shippingAddress.name}</td>
                  <td className="px-6 py-4 font-bold">₹{order.amount}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-500">{order.paymentMethod}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold w-fit ${
                        order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select className={`border-0 rounded-full px-3 py-1 text-xs font-bold ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`} defaultValue={order.status}>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 text-gray-400">
                      <button className="hover:text-brand-navy" title="View Order Details"><Eye className="w-4 h-4" /></button>
                      <button className="hover:text-blue-500" title="Edit Order"><Edit className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
