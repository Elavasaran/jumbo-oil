import React, { useState } from 'react';
import { Bell, Menu, Search, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 h-16 shrink-0 flex items-center justify-between px-4 md:px-6 z-10 sticky top-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleSidebar}
          className="text-slate-500 hover:text-brand-navy p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold w-64 bg-gray-50"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-400 hover:text-brand-navy rounded-full hover:bg-slate-100 transition-colors group">
          <Bell className="w-5 h-5 group-hover:animate-wiggle" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
        </button>
        
        <div className="relative border-l border-slate-200 pl-4">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 hover:bg-slate-50 p-1.5 rounded-lg transition-colors text-left"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-navy to-brand-navy/80 text-white flex items-center justify-center font-bold shadow-sm border border-brand-navy/20">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-bold text-slate-800 leading-tight">{user?.name || 'Administrator'}</p>
              <p className="text-[11px] text-amber-600 font-semibold">Super Admin</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
          </button>

          {isProfileOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsProfileOpen(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 z-50 overflow-hidden py-1">
                <div className="px-4 py-2 border-b border-slate-100 mb-1 md:hidden">
                  <p className="text-sm font-bold text-slate-800">{user?.name || 'Administrator'}</p>
                  <p className="text-[11px] text-slate-500">Super Admin</p>
                </div>
                <Link 
                  to="/admin/settings" 
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-navy transition-colors font-medium"
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>
                <Link 
                  to="/admin/settings" 
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-navy transition-colors font-medium"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
                <div className="border-t border-slate-100 mt-1 pt-1">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 w-full text-left transition-colors font-bold"
                  >
                    <LogOut className="w-4 h-4" />
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
