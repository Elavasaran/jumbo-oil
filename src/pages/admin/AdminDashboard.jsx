import React from 'react';
import { ShoppingBag, Users, DollarSign, Package, TrendingUp, AlertTriangle, ArrowRight, PlusCircle, LayoutList, MessageSquare } from 'lucide-react';
import { useMockData } from '../../context/MockDataContext';
import { Link, useNavigate } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, trend, colorGradient, iconBg, shadowColor }) => (
  <div className={`rounded-2xl p-6 border border-white/40 shadow-lg ${shadowColor} ${colorGradient} text-white flex items-center justify-between transition-all duration-300 hover:scale-[1.02]`}>
    <div>
      <p className="text-xs font-black uppercase tracking-wider mb-1 text-white/80">{title}</p>
      <h3 className="text-3xl font-black tracking-tight">{value}</h3>
      {trend !== undefined && (
        <p className="text-xs mt-2 flex items-center gap-1 font-extrabold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg w-fit text-white">
          <TrendingUp className={`w-3.5 h-3.5 ${trend < 0 && 'rotate-180'}`} />
          <span>{Math.abs(trend)}% from last month</span>
        </p>
      )}
    </div>
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${iconBg}`}>
      <Icon className="w-7 h-7 text-white" />
    </div>
  </div>
);

const AdminDashboard = () => {
  const { products, orders, customers } = useMockData();
  const navigate = useNavigate();

  // Dynamic KPI Calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalCustomers = customers.length;
  
  // Calculate total sales from delivered/paid orders
  const totalSales = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, order) => sum + (order.amount || 0), 0);
  
  // Calculate low stock variants dynamically
  const lowStockItems = [];
  products.forEach(p => {
    p.variants.forEach(v => {
      if (v.stock <= v.lowStockThreshold) {
        lowStockItems.push({ product: p.name, variant: v.size, stock: v.stock, sku: v.sku });
      }
    });
  });

  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-xs text-slate-500 mt-1">Welcome to Jumbo Trades E-Commerce Interactive Admin Console.</p>
        </div>
        <div className="text-xs font-bold text-slate-600 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm self-start sm:self-auto">
          Today: {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          title="Total Products" 
          value={totalProducts} 
          icon={Package} 
          trend={0}
          colorGradient="bg-gradient-to-br from-blue-600 to-indigo-700"
          iconBg="bg-white/20 backdrop-blur-sm"
          shadowColor="shadow-blue-500/20"
        />
        <StatCard 
          title="Total Orders" 
          value={totalOrders} 
          icon={ShoppingBag} 
          trend={14.2}
          colorGradient="bg-gradient-to-br from-emerald-500 to-teal-700"
          iconBg="bg-white/20 backdrop-blur-sm"
          shadowColor="shadow-emerald-500/20"
        />
        <StatCard 
          title="Total Customers" 
          value={totalCustomers} 
          icon={Users} 
          trend={9.5}
          colorGradient="bg-gradient-to-br from-purple-600 to-violet-800"
          iconBg="bg-white/20 backdrop-blur-sm"
          shadowColor="shadow-purple-500/20"
        />
        <StatCard 
          title="Total Sales" 
          value={`₹${totalSales.toLocaleString()}`} 
          icon={DollarSign} 
          trend={18.6}
          colorGradient="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600"
          iconBg="bg-white/20 backdrop-blur-sm"
          shadowColor="shadow-amber-500/25"
        />
      </div>

      {/* Quick Actions (Requested Feature) */}
      <div className="bg-white rounded-2xl p-4 md:p-6 border border-slate-200 shadow-sm">
        <h3 className="text-sm font-black text-slate-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Link to="/admin/products" className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50 transition-colors group">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PlusCircle className="w-4 h-4" />
            </div>
            <span className="font-bold text-xs text-slate-700">Add Product</span>
          </Link>
          <Link to="/admin/inventory" className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-colors group">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <LayoutList className="w-4 h-4" />
            </div>
            <span className="font-bold text-xs text-slate-700">Manage Inventory</span>
          </Link>
          <Link to="/admin/orders" className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 transition-colors group">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="font-bold text-xs text-slate-700">View Orders</span>
          </Link>
          <Link to="/admin/enquiries" className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50 transition-colors group">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageSquare className="w-4 h-4" />
            </div>
            <span className="font-bold text-xs text-slate-700">View Enquiries</span>
          </Link>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Sales Overview Bar Chart */}
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-900 text-sm md:text-base">Sales Overview</h3>
              <p className="text-[11px] md:text-xs text-slate-500 mt-0.5">Monthly revenue distribution</p>
            </div>
            <select className="text-xs font-bold bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-slate-600 outline-none">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>

          <div className="h-48 flex items-end justify-between gap-1.5 sm:gap-3 pt-6 px-1 border-b border-slate-100 overflow-x-auto overflow-y-hidden scrollbar-none">
            {[35, 55, 40, 75, 60, 90, 80, 95, 70, 85, 90, 100].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group min-w-[20px]">
                <div 
                  style={{ height: `${h}%` }} 
                  className="w-full bg-gradient-to-t from-amber-700 to-amber-500 rounded-t-md group-hover:from-amber-800 group-hover:to-amber-600 transition-all relative"
                >
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10 transition-opacity">
                    ₹{(h * 1000).toLocaleString()}
                  </div>
                </div>
                <span className="text-[9px] sm:text-[10px] text-slate-400 font-semibold">{i+1}d</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders Overview Line Chart */}
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-900 text-sm md:text-base">Orders Overview</h3>
              <p className="text-[11px] md:text-xs text-slate-500 mt-0.5">Order volume trend</p>
            </div>
            <select className="text-xs font-bold bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-slate-600 outline-none">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>

          <div className="h-48 flex items-end justify-between gap-1.5 sm:gap-3 pt-6 px-1 border-b border-slate-100 overflow-x-auto overflow-y-hidden scrollbar-none">
            {[45, 60, 50, 65, 80, 70, 85, 90, 75, 95, 100, 110].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group min-w-[20px]">
                <div 
                  style={{ height: `${Math.min(h * 0.8, 100)}%` }} 
                  className="w-full bg-gradient-to-t from-blue-700 to-blue-500 rounded-t-md group-hover:from-blue-800 group-hover:to-blue-600 transition-all relative"
                >
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10 transition-opacity">
                    {Math.floor(h/2)} Orders
                  </div>
                </div>
                <span className="text-[9px] sm:text-[10px] text-slate-400 font-semibold">{i+1}d</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Row: Recent Orders & Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        {/* Recent Orders Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 md:p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-sm md:text-base font-black text-slate-900">Recent Orders</h2>
            <Link to="/admin/orders" className="text-[11px] md:text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 group">
              View All <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="px-4 py-3 md:px-6">Order ID</th>
                  <th className="px-4 py-3 md:px-6">Customer</th>
                  <th className="px-4 py-3 md:px-6">Amount</th>
                  <th className="px-4 py-3 md:px-6">Status</th>
                  <th className="px-4 py-3 md:px-6">Date</th>
                  <th className="px-4 py-3 md:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {orders.slice(0, 5).map(order => {
                  const customer = customers.find(c => c.id === order.customerId);
                  return (
                    <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3.5 md:px-6 font-mono font-bold text-brand-navy">{order.id}</td>
                      <td className="px-4 py-3.5 md:px-6 text-slate-900 font-semibold">
                        {order.shippingAddress?.name || customer?.name || 'Unknown'}
                      </td>
                      <td className="px-4 py-3.5 md:px-6 font-black">₹{order.amount?.toLocaleString()}</td>
                      <td className="px-4 py-3.5 md:px-6">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                          order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                          order.status === 'Cancelled' ? 'bg-rose-100 text-rose-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 md:px-6 text-slate-500">
                        {new Date(order.date).toLocaleDateString('en-GB')}
                      </td>
                      <td className="px-4 py-3.5 md:px-6 text-right">
                        <button 
                          onClick={() => navigate('/admin/orders')}
                          className="px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-bold text-[11px] transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                      No recent orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-4 md:p-6 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-sm md:text-base font-black text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
              <span>Low Stock Alerts</span>
            </h2>
          </div>
          <div className="p-4 md:p-6 flex-1 overflow-y-auto max-h-[320px] scrollbar-thin scrollbar-thumb-slate-200">
            {lowStockItems.length > 0 ? (
              <div className="space-y-4">
                {lowStockItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs md:text-sm">{item.product}</h4>
                      <span className="text-[10px] md:text-[11px] text-slate-500 font-medium">{item.variant} • {item.sku}</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-md text-[10px] md:text-xs font-bold ${
                      item.stock === 0 ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {item.stock} left
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3">
                  <Package className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-slate-700">Stock Levels Healthy</p>
                <p className="text-xs text-slate-500 mt-1">No products are currently low on stock.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

