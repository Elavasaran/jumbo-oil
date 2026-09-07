import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Box, Users, CreditCard, FileText, Star, MessageSquare, Settings, LogOut, Droplet } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = () => {
  const { logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Box },
    { name: 'Variants', path: '/admin/variants', icon: Droplet },
    { name: 'Inventory', path: '/admin/inventory', icon: ShoppingBag },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Payments', path: '/admin/payments', icon: CreditCard },
    { name: 'Invoices', path: '/admin/invoices', icon: FileText },
    { name: 'Reviews', path: '/admin/reviews', icon: Star },
    { name: 'Enquiries', path: '/admin/enquiries', icon: MessageSquare },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-brand-navy text-white flex flex-col h-full hidden md:flex shrink-0">
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="w-8 h-8 bg-brand-gold rounded flex items-center justify-center font-bold">
          JT
        </div>
        <span className="font-bold text-lg">{siteConfig.brandName}</span>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-brand-gold text-white' 
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-white/10">
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-white/10 w-full transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
