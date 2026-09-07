import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, PackageCheck, ShoppingBag, FileText } from 'lucide-react';

const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order || {
    orderId: 'JT20260901',
    date: new Date().toLocaleDateString(),
    amount: 1509,
    paymentMethod: 'Online Payment (UPI/Card Mock)',
    address: '42 Lotus Heights, Green Glen Layout, Chennai, Tamil Nadu - 600028',
    items: []
  };

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 text-center max-w-xl">
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div>
            <span className="text-emerald-700 font-bold uppercase tracking-wider text-xs block mb-1">
              Order Placed Successfully
            </span>
            <h1 className="text-3xl font-black text-brand-navy">Thank You for Your Order!</h1>
            <p className="text-slate-500 text-sm mt-2">
              We have received your order and are preparing your fresh edible oils for hygienic packing and dispatch.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left space-y-3 text-xs">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500 font-semibold">Order ID:</span>
              <span className="font-bold text-amber-800 font-mono text-sm">#{order.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold">Date:</span>
              <span className="font-bold text-slate-800">{order.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold">Payment Method:</span>
              <span className="font-bold text-slate-800">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold">Total Amount Paid:</span>
              <span className="font-black text-slate-900 text-sm">₹{order.amount}</span>
            </div>
            <div className="pt-2 border-t border-slate-200">
              <span className="text-slate-500 font-semibold block mb-1">Delivery Address:</span>
              <span className="font-medium text-slate-700">{order.address}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link 
              to="/account" 
              className="flex-1 bg-brand-navy hover:bg-amber-800 text-white py-3.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>View My Orders</span>
            </Link>

            <Link 
              to="/shop" 
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 py-3.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
