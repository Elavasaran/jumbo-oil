import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { siteConfig } from '../../config/siteConfig';
import logoImg from '../../assets/logo.png';

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
        isScrolled 
          ? 'bg-white/70 backdrop-blur-xl shadow-lg border-b border-white/50 py-3.5' 
          : 'bg-white/40 backdrop-blur-md py-4 border-b border-white/20'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src={logoImg} 
            alt="Jumbo Trades Logo" 
            className="h-16 md:h-20 w-auto object-contain mix-blend-multiply group-hover:scale-105 transition-transform" 
            onError={(e) => {
              e.target.style.display = 'none';
              document.getElementById('fallback-logo').style.display = 'flex';
            }}
          />
          <div id="fallback-logo" className="hidden flex-col items-center justify-center">
            <span className="font-extrabold text-2xl md:text-3xl text-[#a4b659] tracking-tight leading-none">
              Jumbo
            </span>
            <span className="font-black text-[13px] md:text-sm text-[#3d3d3d] uppercase tracking-[0.2em] mt-0.5">
              TRADES
            </span>
          </div>
        </Link>

        {/* Right Content Group: Navigation + Actions */}
        <div className="flex justify-end items-center flex-1 gap-6 md:gap-10 lg:gap-16">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-base md:text-[17px] tracking-wide font-black transition-all relative py-1.5 px-1 hover:text-brand-gold group ${
                  isActive ? 'text-brand-gold' : 'text-slate-700'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {/* Interactive Sliding Underline */}
                  <span 
                    className={`absolute bottom-0 left-0 h-[2px] bg-brand-gold transition-all duration-300 ease-out ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} 
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Action Controls: Search, Account, Cart */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Search Button & Overlay */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2.5 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${
                searchOpen ? 'bg-brand-navy text-white shadow-md' : 'text-slate-600 hover:text-white hover:bg-brand-navy'
              }`}
              aria-label="Search Jumbo Trades products"
            >
              <Search className="w-5 h-5" />
            </button>

            {searchOpen && (
              <form 
                onSubmit={handleSearchSubmit}
                className="absolute right-0 top-14 w-80 bg-white rounded-2xl shadow-[0_20px_60px_rgb(0,0,0,0.15)] p-2.5 border border-slate-100 flex items-center gap-2 animate-fade-in-up z-50 origin-top-right transition-transform"
              >
                <input
                  type="text"
                  placeholder="Search premium products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold/30 transition-all font-semibold"
                  autoFocus
                />
                <button type="submit" className="bg-brand-navy text-white p-2.5 rounded-xl text-xs font-bold hover:bg-brand-gold hover:shadow-md transition-all hover:scale-105 transform">
                  <Search className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Account Button */}
          <Link 
            to={user ? "/account" : "/login"} 
            className="hidden md:flex items-center gap-2 text-slate-600 hover:text-white hover:bg-brand-navy font-bold text-base md:text-[17px] px-5 py-2.5 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg border border-transparent hover:border-brand-navy/20"
            aria-label="Customer Account"
          >
            <User className="w-5 h-5" />
            <span>{user ? user.name.split(' ')[0] : 'Account'}</span>
          </Link>
          
          {/* Cart Button with functional badge */}
          <Link 
            to="/cart" 
            className="relative p-2.5 rounded-full text-slate-600 hover:text-white hover:bg-brand-navy transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-md border-2 border-white animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
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
