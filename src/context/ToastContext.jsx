import React, { createContext, useContext, useState } from 'react';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const hideToast = () => setToast(null);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast UI overlay */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[100] transition-all duration-300 animate-slide-up">
          <div className="bg-brand-navy text-white px-5 py-4 rounded-xl shadow-2xl border border-brand-gold/30 flex items-center gap-3.5 max-w-md">
            <div className="w-9 h-9 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
              {toast.type === 'cart' ? <ShoppingBag className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5 text-green-400" />}
            </div>
            <div className="flex-1 text-sm font-medium pr-2 text-gray-100">
              {toast.message}
            </div>
            <button 
              onClick={hideToast}
              className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};
