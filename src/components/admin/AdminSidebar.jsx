import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Box, Users, CreditCard, FileText, Star, MessageSquare, Settings, LogOut, Droplet, X } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

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
    <div className={`
      fixed md:static inset-y-0 left-0 z-30 flex flex-col h-full bg-brand-navy text-white transition-all duration-300 ease-in-out shrink-0
      ${isOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full md:translate-x-0'}
    `}>
      <div className="h-16 flex items-center justify-between px-5 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 bg-brand-gold rounded-xl flex items-center justify-center font-black text-white shrink-0 shadow-sm">
            JT
          </div>
          <span className={`font-black text-lg whitespace-nowrap transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 hidden md:block md:opacity-0'}`}>
            Admin
          </span>
        </div>
        <button 
          onClick={onClose}
          className="md:hidden text-white/50 hover:text-white p-1"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-6 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
        <nav className="space-y-1.5 px-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin'}
              onClick={() => {
                if (window.innerWidth < 768) onClose();
              }}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-3 py-3 rounded-xl text-sm font-bold transition-all group relative ${
                  isActive 
                    ? 'bg-brand-gold text-white shadow-md shadow-brand-gold/20' 
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`
              }
              title={!isOpen ? item.name : undefined}
            >
              <item.icon className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110`} />
              <span className={`whitespace-nowrap transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 hidden md:block md:opacity-0'}`}>
                {item.name}
              </span>
              
              {/* Tooltip for collapsed state */}
              {!isOpen && (
                <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-white/10 shrink-0">
        <button 
          onClick={handleLogout}
          className={`flex items-center gap-3.5 px-3 py-3 rounded-xl text-sm font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 w-full transition-all group relative ${isOpen ? 'justify-start' : 'justify-center md:justify-start'}`}
          title={!isOpen ? 'Logout' : undefined}
        >
          <LogOut className="w-5 h-5 shrink-0 group-hover:-translate-x-1 transition-transform" />
          <span className={`whitespace-nowrap transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 hidden md:block md:opacity-0'}`}>
            Logout
          </span>
          
          {!isOpen && (
            <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
              Logout
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
