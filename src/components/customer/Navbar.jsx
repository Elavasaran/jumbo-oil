import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { siteConfig } from '../../config/siteConfig';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Product Information', path: '/product-information' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/98 backdrop-blur-md shadow-md py-3.5' : 'bg-white/90 backdrop-blur-sm py-4 border-b border-amber-900/10'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-gradient-to-br from-amber-600 to-amber-900 rounded-full flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform border border-amber-400/30">
            JT
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl md:text-2xl text-brand-navy tracking-tight leading-none">
              {siteConfig.brandName}
            </span>
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest mt-1">
              Purely for a Better Tomorrow
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-bold transition-all relative py-1 hover:text-amber-700 ${
                  isActive ? 'text-amber-800 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-amber-700' : 'text-slate-700'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Action Controls: Search, Account, Cart */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Search Button & Overlay */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 rounded-full text-slate-700 hover:text-amber-700 hover:bg-amber-50/80 transition-all"
              aria-label="Search Jumbo Trades products"
            >
              <Search className="w-5 h-5" />
            </button>

            {searchOpen && (
              <form 
                onSubmit={handleSearchSubmit}
                className="absolute right-0 top-12 w-72 bg-white rounded-2xl shadow-2xl p-3 border border-amber-900/10 flex items-center gap-2 animate-fadeIn z-50"
              >
                <input
                  type="text"
                  placeholder="Search oils (Coconut, Sunflower...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-600"
                  autoFocus
                />
                <button type="submit" className="bg-amber-800 text-white p-2 rounded-xl text-xs font-bold hover:bg-amber-900">
                  <Search className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          {/* Account Button */}
          <Link 
            to={user ? "/account" : "/login"} 
            className="hidden md:flex items-center gap-2 text-slate-700 hover:text-amber-800 transition-colors font-bold text-xs bg-amber-50/80 px-4 py-2.5 rounded-full border border-amber-200/80 hover:border-amber-400"
            aria-label="Customer Account"
          >
            <User className="w-4 h-4 text-amber-700" />
            <span>{user ? user.name.split(' ')[0] : 'Account'}</span>
          </Link>
          
          {/* Cart Button with functional badge */}
          <Link 
            to="/cart" 
            className="relative p-2.5 rounded-full text-slate-700 hover:text-amber-700 hover:bg-amber-50/80 transition-all"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-amber-700 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-md border-2 border-white animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-800 rounded-xl hover:bg-slate-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-amber-900/10 py-4 flex flex-col animate-fadeIn">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-6 py-3 text-base font-bold ${
                  isActive ? 'text-amber-800 bg-amber-50/80 border-l-4 border-amber-700' : 'text-slate-700 hover:bg-slate-50'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="px-6 py-4 border-t border-slate-100 mt-2">
            <Link 
              to={user ? "/account" : "/login"}
              onClick={() => setMobileMenuOpen(false)} 
              className="flex items-center gap-3 text-slate-800 font-bold py-3 px-4 bg-amber-50/80 rounded-xl border border-amber-200/60"
            >
              <User className="w-5 h-5 text-amber-700" />
              <span>{user ? 'My Account' : 'Login / Register'}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
