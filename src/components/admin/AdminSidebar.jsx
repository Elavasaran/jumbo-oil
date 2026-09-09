import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Box, 
  Users, 
  CreditCard, 
  FileText, 
  Star, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Droplet, 
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/logo.png';

const AdminSidebar = ({ isOpen, onClose, onToggleCollapse }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navSections = [
    {
      title: 'CORE',
      items: [
        { 
          name: 'Dashboard', 
          path: '/admin', 
          icon: LayoutDashboard,
          color: 'text-sky-500',
        },
      ]
    },
    {
      title: 'CATALOG & STOCK',
      items: [
        { 
          name: 'Products', 
          path: '/admin/products', 
          icon: Box,
          color: 'text-indigo-500',
        },
        { 
          name: 'Variants', 
          path: '/admin/variants', 
          icon: Droplet,
          color: 'text-teal-500',
        },
        { 
          name: 'Inventory', 
          path: '/admin/inventory', 
          icon: ShoppingBag, 
          badge: 'LOW',
          badgeStyle: 'bg-amber-100 text-amber-800 font-bold',
          color: 'text-emerald-500',
        },
      ]
    },
    {
      title: 'SALES & BILLING',
      items: [
        { 
          name: 'Orders', 
          path: '/admin/orders', 
          icon: ShoppingBag, 
          badge: '12',
          badgeStyle: 'bg-amber-100 text-amber-800 font-bold',
          color: 'text-amber-500',
        },
        { 
          name: 'Customers', 
          path: '/admin/customers', 
          icon: Users,
          color: 'text-purple-500',
        },
        { 
          name: 'Payments', 
          path: '/admin/payments', 
          icon: CreditCard,
          color: 'text-emerald-500',
        },
        { 
          name: 'Invoices', 
          path: '/admin/invoices', 
          icon: FileText,
          color: 'text-cyan-500',
        },
      ]
    },
    {
      title: 'FEEDBACK & SUPPORT',
      items: [
        { 
          name: 'Reviews', 
          path: '/admin/reviews', 
          icon: Star, 
          badge: 'NEW',
          badgeStyle: 'bg-pink-100 text-pink-800 font-bold',
          color: 'text-yellow-500',
        },
        { 
          name: 'Enquiries', 
          path: '/admin/enquiries', 
          icon: MessageSquare, 
          badge: '3',
          badgeStyle: 'bg-violet-100 text-violet-800 font-bold',
          color: 'text-fuchsia-500',
        },
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { 
          name: 'Settings', 
          path: '/admin/settings', 
          icon: Settings,
          color: 'text-slate-500',
        },
      ]
    }
  ];

  return (
    <aside className={`
      fixed md:static inset-y-0 left-0 z-30 flex flex-col h-full bg-white text-slate-800 
      transition-all duration-300 ease-in-out shrink-0 border-r border-slate-200/80 shadow-md
      ${isOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full md:translate-x-0'}
    `}>
      {/* Header / Brand */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 shadow-sm border border-slate-200 bg-white flex items-center justify-center p-1">
            <img src={logoImg} alt="Jumbo Trades Logo" className="w-full h-full object-contain" />
          </div>
          <div className={`transition-all duration-300 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 hidden md:block'}`}>
            <h1 className="font-extrabold text-sm tracking-tight leading-none text-slate-900 whitespace-nowrap">
              Jumbo Trades Admin
            </h1>
            <div className="flex items-center gap-1 mt-1 text-[10px] uppercase tracking-wider text-amber-600 font-bold">
              <Sparkles className="w-2.5 h-2.5 text-amber-500 shrink-0" />
              <span>Admin Panel</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {/* Desktop Collapse Toggle Button in Header */}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="hidden md:flex items-center justify-center text-slate-400 hover:text-amber-600 p-2 rounded-xl hover:bg-slate-200/60 transition-colors"
              title={isOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
            >
              {isOpen ? (
                <ChevronLeft className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5 text-amber-600" />
              )}
            </button>
          )}

          {/* Mobile close button */}
          <button 
            onClick={onClose}
            className="md:hidden text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation items */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5 scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {isOpen && (
              <h2 className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80 inline-block"></span>
                {section.title}
              </h2>
            )}
            
            {section.items.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/admin'}
                onClick={() => {
                  if (window.innerWidth < 768) onClose();
                }}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 group relative ${
                    isActive 
                      ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25 font-black' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Icon wrapper */}
                    <div className={`p-1.5 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-white/20 text-white shadow-inner' 
                        : `bg-slate-100 text-slate-700 group-hover:scale-110 group-hover:bg-amber-50 group-hover:text-amber-600`
                    }`}>
                      <item.icon className="w-4 h-4 shrink-0 transition-transform duration-200" />
                    </div>
                    
                    <span className={`whitespace-nowrap transition-all duration-300 flex-1 ${isOpen ? 'opacity-100' : 'opacity-0 hidden md:block'}`}>
                      {item.name}
                    </span>

                    {/* Badge */}
                    {item.badge && isOpen && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        isActive 
                          ? 'bg-black/20 text-white' 
                          : item.badgeStyle
                      }`}>
                        {item.badge}
                      </span>
                    )}

                    {/* Collapsed Tooltip */}
                    {!isOpen && (
                      <div className="fixed left-20 ml-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-xl border border-slate-800 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 whitespace-nowrap z-50 flex items-center gap-2">
                        <span>{item.name}</span>
                        {item.badge && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-amber-400 text-slate-950">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </div>

      {/* Footer / Logout */}
      <div className="p-3 border-t border-slate-100 space-y-2 shrink-0 bg-slate-50/50">
        <button 
          onClick={handleLogout}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 hover:text-rose-700 w-full transition-all group relative ${isOpen ? 'justify-start' : 'justify-center'}`}
        >
          <div className="p-1.5 bg-rose-100 rounded-lg group-hover:bg-rose-200 transition-colors">
            <LogOut className="w-4 h-4 shrink-0 text-rose-600 group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span className={`whitespace-nowrap transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 hidden md:block'}`}>
            Logout
          </span>
          
          {!isOpen && (
            <div className="fixed left-20 ml-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 whitespace-nowrap z-50">
              Logout
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
