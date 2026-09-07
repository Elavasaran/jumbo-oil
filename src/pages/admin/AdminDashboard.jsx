import React from 'react';
import { ShoppingBag, Users, DollarSign, Package, TrendingUp, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { orders } from '../../data/orders';
import { products } from '../../data/products';

const StatCard = ({ title, value, icon: Icon, trend, colorClass }) => (
  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{title}</p>
      <h3 className="text-2xl font-black text-slate-900">{value}</h3>
      {trend && (
        <p className={`text-xs mt-2 flex items-center gap-1 font-bold ${trend > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
          <TrendingUp className={`w-3.5 h-3.5 ${trend < 0 && 'rotate-180'}`} />
          <span>{Math.abs(trend)}% from last month</span>
        </p>
      )}
    </div>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
      <Icon className="w-6 h-6" />
    </div>
  </div>
);

const AdminDashboard = () => {
  const totalRevenue = 124560; // Matching reference design
  
  // Calculate low stock variants
  const lowStockItems = [];
  products.forEach(p => {
    p.variants.forEach(v => {
      if (v.stock <= v.lowStockThreshold) {
        lowStockItems.push({ product: p.name, variant: v.size, stock: v.stock, sku: v.sku });
      }
    });
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Dashboard</h1>
          <p className="text-xs text-slate-500">Welcome to Jumbo Trades E-Commerce Admin Console.</p>
        </div>
        <div className="text-xs font-bold text-slate-500 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm">
          Today: {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
      </div>

      {/* KPI Stats Grid matching Reference */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Products" 
          value={products.length} 
          icon={Package} 
          trend={0}
          colorClass="bg-blue-100 text-blue-700"
        />
        <StatCard 
          title="Total Orders" 
          value="125" 
          icon={ShoppingBag} 
          trend={14.2}
          colorClass="bg-emerald-100 text-emerald-700"
        />
        <StatCard 
          title="Total Customers" 
          value="89" 
          icon={Users} 
          trend={9.5}
          colorClass="bg-purple-100 text-purple-700"
        />
        <StatCard 
          title="Total Sales" 
          value={`₹${totalRevenue.toLocaleString()}`} 
          icon={DollarSign} 
          trend={18.6}
          colorClass="bg-amber-100 text-amber-800"
        />
      </div>

      {/* Charts Row matching Reference */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Overview Bar Chart */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Sales Overview</h3>
              <p className="text-xs text-slate-500">Monthly revenue distribution</p>
            </div>
            <span className="text-xs font-bold bg-slate-100 px-3 py-1 rounded-lg text-slate-600">This Month</span>
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-100">
            {[35, 55, 40, 75, 60, 90, 80, 95, 70, 85, 90, 100].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div 
                  style={{ height: `${h}%` }} 
                  className="w-full bg-gradient-to-t from-amber-700 to-amber-500 rounded-t-md group-hover:from-amber-800 group-hover:to-amber-600 transition-all"
                ></div>
                <span className="text-[10px] text-slate-400 font-semibold">{i+1}d</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders Overview Line Chart */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Orders Overview</h3>
              <p className="text-xs text-slate-500">Order volume trend</p>
            </div>
            <span className="text-xs font-bold bg-slate-100 px-3 py-1 rounded-lg text-slate-600">This Month</span>
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-100">
            {[45, 60, 50, 65, 80, 70, 85, 90, 75, 95, 100, 110].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div 
                  style={{ height: `${h * 0.8}%` }} 
                  className="w-full bg-gradient-to-t from-blue-700 to-blue-500 rounded-t-md group-hover:from-blue-800 group-hover:to-blue-600 transition-all"
                ></div>
                <span className="text-[10px] text-slate-400 font-semibold">{i+1}d</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Row: Recent Orders & Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Orders Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-black text-slate-900">Recent Orders</h2>
            <span className="text-xs font-bold text-amber-700 hover:underline cursor-pointer">View All</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {[
                  { id: '#JT2026001', customer: 'Karthik Kumar', amount: 1509, status: 'Delivered', date: '12 Sep 2026' },
                  { id: '#JT2026002', customer: 'Priya S', amount: 879, status: 'Processing', date: '10 Sep 2026' },
                  { id: '#JT2026003', customer: 'Arun M', amount: 1200, status: 'Confirmed', date: '08 Sep 2026' },
                ].map(order => (
                  <tr key={order.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-mono font-bold text-brand-navy">{order.id}</td>
                    <td className="px-6 py-4 text-slate-900 font-semibold">{order.customer}</td>
                    <td className="px-6 py-4 font-black">₹{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{order.date}</td>
                    <td className="px-6 py-4">
                      <button className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-bold text-[11px]">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>Low Stock Alerts</span>
            </h2>
          </div>
          <div className="p-6 flex-1 overflow-y-auto">
            <div className="space-y-4">
              {lowStockItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-slate-100 pb-3 last:border-0">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{item.product}</h4>
                    <span className="text-[11px] text-slate-500">{item.variant} • {item.sku}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                    item.stock === 0 ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.stock} left
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
