import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-amber-900/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg border border-amber-400/40">
                JT
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tight text-white">
                  {siteConfig.brandName}
                </span>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                  Purely for a Better Tomorrow
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed pt-2">
              Premium edible oils crafted with care for every kitchen. Pure taste, natural aroma, and trusted quality in every drop.
            </p>
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400/80 block mb-3">Follow Us</span>
              <div className="flex gap-3">
                <a 
                  href={siteConfig.social.instagram || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors border border-white/10"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a 
                  href={siteConfig.social.facebook || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors border border-white/10"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/></svg>
                </a>
                <a 
                  href={siteConfig.social.linkedin || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors border border-white/10"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-extrabold mb-5 text-amber-400 uppercase tracking-wider text-xs">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="text-slate-300 hover:text-amber-400 transition-colors font-medium">Home</Link></li>
              <li><Link to="/shop" className="text-slate-300 hover:text-amber-400 transition-colors font-medium">Shop</Link></li>
              <li><Link to="/product-information" className="text-slate-300 hover:text-amber-400 transition-colors font-medium">Product Information</Link></li>
              <li><Link to="/contact" className="text-slate-300 hover:text-amber-400 transition-colors font-medium">Contact</Link></li>
            </ul>
          </div>

          {/* Customer */}
          <div>
            <h4 className="text-base font-extrabold mb-5 text-amber-400 uppercase tracking-wider text-xs">Customer</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/account" className="text-slate-300 hover:text-amber-400 transition-colors font-medium">My Account</Link></li>
              <li><Link to="/account/orders" className="text-slate-300 hover:text-amber-400 transition-colors font-medium">My Orders</Link></li>
              <li><Link to="/cart" className="text-slate-300 hover:text-amber-400 transition-colors font-medium">Cart</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-extrabold mb-5 text-amber-400 uppercase tracking-wider text-xs">Contact Us</h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span className="text-xs leading-relaxed">{siteConfig.contact?.address || "Jumbo Trades HQ, Industrial Estate, Tamil Nadu, India"}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs">{siteConfig.contact?.phone || "+91 98765 43210"}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs">{siteConfig.contact?.email || "support@jumbotrades.com"}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <MessageCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs">{siteConfig.contact?.whatsapp || "+91 98765 43210 (WhatsApp Support)"}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; 2026 {siteConfig.brandName}. Purely for a Better Tomorrow. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-400">
            <Link to="#" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
