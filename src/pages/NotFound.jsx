import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="bg-gray-50 min-h-[80vh] flex items-center justify-center pt-24 pb-20">
      <div className="text-center px-4">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center text-red-500 mx-auto mb-8">
          <AlertCircle className="w-12 h-12" />
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-brand-navy mb-4 tracking-tighter">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Oops! The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="px-8 py-3.5 bg-brand-navy text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-navy/90 transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </Link>
          <Link to="/contact" className="px-8 py-3.5 bg-white border-2 border-gray-200 text-brand-navy rounded-xl font-bold flex items-center justify-center gap-2 hover:border-brand-gold hover:text-brand-gold transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
