import React, { useState } from 'react';
import { Bell, Menu, Search, User, Settings, LogOut, ChevronDown, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const notifications = [
    { id: 1, title: 'New order #JT-8942 received', time: '5m ago', unread: true, link: '/admin/orders' },
    { id: 2, title: 'Low stock alert: Cold Pressed Sesame Oil', time: '1h ago', unread: true, link: '/admin/inventory' },
    { id: 3, title: 'New customer review posted', time: '3h ago', unread: false, link: '/admin/reviews' }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 h-16 shrink-0 flex items-center justify-between px-4 md:px-6 z-20 sticky top-0">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="md:hidden text-slate-500 hover:text-brand-navy p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search orders, products..."
            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 w-64 bg-gray-50"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Interactive Notification Bell */}
        <div className="relative">
          <button 
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              setIsProfileOpen(false);
            }}
            className="relative p-2 text-slate-500 hover:text-amber-600 rounded-full hover:bg-slate-100 transition-colors group"
            title="Notifications"
          >
            <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-white animate-pulse"></span>
          </button>

          {isNotificationsOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)}></div>
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden py-2 animate-in fade-in duration-150">
                <div className="px-4 py-2.5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Notifications
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full font-bold">
                    2 New
                  </span>
                </div>
                <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <Link
                      key={n.id}
                      to={n.link}
                      onClick={() => setIsNotificationsOpen(false)}
                      className={`p-3 hover:bg-slate-50 transition-colors block ${n.unread ? 'bg-amber-50/40' : ''}`}
                    >
                      <div className="flex gap-2.5 items-start">
                        <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.unread ? 'bg-amber-500' : 'bg-slate-300'}`}></span>
                        <div>
                          <p className="text-xs font-bold text-slate-800 leading-snug">{n.title}</p>
                          <span className="text-[10px] text-slate-400 font-medium mt-1 block">{n.time}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative border-l border-slate-200 pl-4">
          <button
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotificationsOpen(false);
            }}
            className="flex items-center gap-3 hover:bg-slate-50 p-1.5 rounded-xl transition-colors text-left group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center font-black shadow-sm text-sm">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-bold text-slate-800 leading-tight group-hover:text-amber-600 transition-colors">{user?.name || 'Administrator'}</p>
              <p className="text-[11px] text-amber-600 font-bold capitalize">{user?.role || 'Admin'}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block group-hover:text-slate-700" />
          </button>

          {isProfileOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsProfileOpen(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden py-1.5 animate-in fade-in duration-150">
                <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50">
                  <p className="text-xs font-black text-slate-900">{user?.name || 'Administrator'}</p>
                  <p className="text-[10px] text-amber-600 font-bold capitalize mt-0.5">{user?.role || 'Admin'}</p>
                </div>
                <div className="py-1">
                  <Link
                    to="/admin/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-amber-600 transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    My Profile
                  </Link>
                  <Link
                    to="/admin/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-amber-600 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    Settings
                  </Link>
                </div>
                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 w-full text-left transition-colors font-bold"
                  >
                    <LogOut className="w-4 h-4 text-rose-600" />
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
