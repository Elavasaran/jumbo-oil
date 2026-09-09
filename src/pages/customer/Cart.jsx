import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, Plus, Minus, AlertCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getSubtotal } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const subtotal = getSubtotal();
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 50;
  const tax = Math.round(subtotal * 0.05); // 5% GST placeholder
  const total = subtotal + shipping + tax;

  const handleUpdateQuantity = (item, newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > (item.variant.stock ?? 100)) {
      showToast(`Sorry, only ${item.variant.stock ?? 100} units available for ${item.product.name} (${item.variant.size}).`, 'error');
      return;
    }
    updateQuantity(item.variant.id, newQuantity);
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4 text-center max-w-md">
          <div className="w-20 h-20 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Your Cart is Empty</h2>
          <p className="text-slate-500 text-sm mb-8">Looks like you haven't added any premium edible oils to your cart yet.</p>
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 bg-brand-navy hover:bg-amber-800 text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-md transition-all"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-brand-navy">Shopping Cart ({cartItems.length})</h1>
          <button 
            type="button"
            onClick={clearCart} 
            className="text-xs font-semibold text-red-600 hover:text-red-800 underline"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-between"
              >
                {/* Thumbnail & Product Details */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="w-20 h-20 object-cover rounded-xl bg-amber-50 shrink-0 border border-amber-900/10"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{item.product.name}</h3>
                    <span className="inline-block bg-amber-100 text-amber-800 font-bold text-xs px-2.5 py-0.5 rounded-md mt-1">
                      Size: {item.variant.size}
                    </span>
                    <div className="text-xs text-slate-400 mt-1">SKU: {item.variant.sku}</div>
                  </div>
                </div>

                {/* Quantity Controls & Subtotal */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                  {/* Quantity Modifier */}
                  <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
                    <button 
                      type="button"
                      onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                      className="px-2.5 py-1.5 text-slate-600 hover:bg-slate-200"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-slate-800">{item.quantity}</span>
                    <button 
                      type="button"
                      onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                      className="px-2.5 py-1.5 text-slate-600 hover:bg-slate-200"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Subtotal</span>
                    <span className="text-base font-black text-slate-900">₹{item.variant.price * item.quantity}</span>
                  </div>

                  {/* Remove */}
                  <button 
                    type="button"
                    onClick={() => removeFromCart(item.variant.id)}
                    className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <Link 
                to="/shop" 
                className="inline-flex items-center gap-2 text-amber-700 font-bold text-sm hover:underline"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 sticky top-28">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Order Summary
              </h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Shipping</span>
                  <span className="font-bold text-slate-900">
                    {shipping === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated GST (5%)</span>
                  <span className="font-bold text-slate-900">₹{tax}</span>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 flex justify-between items-baseline">
                <span className="text-base font-bold text-slate-900">Total Amount</span>
                <span className="text-2xl font-black text-amber-800">₹{total}</span>
              </div>

              <button 
                type="button"
                onClick={() => navigate('/checkout')}
                className="w-full bg-brand-navy hover:bg-amber-800 text-white py-4 rounded-xl font-black text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-slate-500 font-medium">
                <div className="flex items-center gap-1.5 p-2 bg-slate-50 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 bg-slate-50 rounded-lg">
                  <Truck className="w-4 h-4 text-amber-700" />
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
