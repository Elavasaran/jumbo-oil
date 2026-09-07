import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, CreditCard, Banknote, ArrowRight, User, MapPin, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

const Checkout = () => {
  const { cartItems, getSubtotal, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  // Form states
  const [formData, setFormData] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    address: '42 Lotus Heights, Green Glen Layout',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600028',
    paymentMethod: 'online' // 'online' or 'cod'
  });

  const subtotal = getSubtotal();
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 50;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const orderId = `JT202609${Math.floor(100 + Math.random() * 900)}`;
    const orderSummary = {
      orderId,
      date: new Date().toLocaleDateString(),
      items: cartItems,
      amount: total,
      paymentMethod: formData.paymentMethod === 'online' ? 'Online Payment (UPI/Card Mock)' : 'Cash on Delivery (COD)',
      address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`
    };

    // Save mock order to localStorage for Customer Dashboard
    const savedOrders = JSON.parse(localStorage.getItem('jumbo-orders') || '[]');
    localStorage.setItem('jumbo-orders', JSON.stringify([orderSummary, ...savedOrders]));

    clearCart();
    showToast(`Order #${orderId} placed successfully!`, 'success');
    navigate('/order-success', { state: { order: orderSummary } });
  };

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <h1 className="text-3xl font-black text-brand-navy mb-8">Checkout</h1>

        {/* Step Indicator Header */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex justify-between items-center text-xs md:text-sm font-bold">
          {[
            { num: 1, label: 'Customer Info' },
            { num: 2, label: 'Delivery' },
            { num: 3, label: 'Payment' },
            { num: 4, label: 'Review' }
          ].map((s) => (
            <div 
              key={s.num}
              onClick={() => setStep(s.num)}
              className={`flex items-center gap-2 cursor-pointer ${
                step === s.num ? 'text-amber-700 font-extrabold' : step > s.num ? 'text-emerald-600' : 'text-slate-400'
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                step === s.num ? 'bg-amber-700 text-white' : step > s.num ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
              }`}>
                {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
              </div>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Step Form */}
          <div className="lg:col-span-8 space-y-6">
            {/* STEP 1: Customer Details */}
            {step === 1 && (
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-amber-700" />
                  <span>1. Customer Details</span>
                </h2>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                      <input 
                        type="text" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 text-right">
                  <button 
                    type="button" 
                    onClick={() => setStep(2)}
                    className="bg-brand-navy hover:bg-amber-800 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-sm"
                  >
                    Next: Delivery Address →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Delivery Address */}
            {step === 2 && (
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-700" />
                  <span>2. Delivery Address</span>
                </h2>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Street Address</label>
                    <input 
                      type="text" 
                      name="address" 
                      value={formData.address} 
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                      <input 
                        type="text" 
                        name="city" 
                        value={formData.city} 
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">State</label>
                      <input 
                        type="text" 
                        name="state" 
                        value={formData.state} 
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Pincode</label>
                      <input 
                        type="text" 
                        name="pincode" 
                        value={formData.pincode} 
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button 
                    type="button" 
                    onClick={() => setStep(1)}
                    className="text-slate-600 font-bold text-sm px-4 py-2"
                  >
                    ← Back
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setStep(3)}
                    className="bg-brand-navy hover:bg-amber-800 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-sm"
                  >
                    Next: Payment Method →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Payment Method */}
            {step === 3 && (
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-amber-700" />
                  <span>3. Select Payment Method</span>
                </h2>

                <div className="space-y-3 pt-2">
                  <label className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.paymentMethod === 'online' ? 'border-amber-700 bg-amber-50/50' : 'border-slate-200 bg-white'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="online"
                        checked={formData.paymentMethod === 'online'}
                        onChange={handleChange}
                        className="text-amber-700 focus:ring-amber-500"
                      />
                      <CreditCard className="w-5 h-5 text-amber-700" />
                      <div>
                        <span className="font-bold text-slate-900 text-sm block">Online Payment (Simulated UPI / Debit / Credit Card)</span>
                        <span className="text-xs text-slate-500">Fast, instant confirmation with mock payment simulation.</span>
                      </div>
                    </div>
                  </label>

                  <label className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.paymentMethod === 'cod' ? 'border-amber-700 bg-amber-50/50' : 'border-slate-200 bg-white'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleChange}
                        className="text-amber-700 focus:ring-amber-500"
                      />
                      <Banknote className="w-5 h-5 text-emerald-600" />
                      <div>
                        <span className="font-bold text-slate-900 text-sm block">Cash on Delivery (COD)</span>
                        <span className="text-xs text-slate-500">Pay cash directly to courier agent upon delivery.</span>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="pt-4 flex justify-between">
                  <button 
                    type="button" 
                    onClick={() => setStep(2)}
                    className="text-slate-600 font-bold text-sm px-4 py-2"
                  >
                    ← Back
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setStep(4)}
                    className="bg-brand-navy hover:bg-amber-800 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-sm"
                  >
                    Next: Review Order →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Review & Place Order */}
            {step === 4 && (
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>4. Order Review</span>
                </h2>

                <div className="bg-slate-50 p-4 rounded-xl text-xs space-y-2 border border-slate-200">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Customer:</span>
                    <span className="font-bold text-slate-800">{formData.name} ({formData.phone})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Delivery To:</span>
                    <span className="font-bold text-slate-800">{formData.address}, {formData.city}, {formData.state} - {formData.pincode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Payment:</span>
                    <span className="font-bold text-amber-800 uppercase">{formData.paymentMethod === 'online' ? 'Online Payment' : 'Cash on Delivery (COD)'}</span>
                  </div>
                </div>

                <form onSubmit={handlePlaceOrder} className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full bg-amber-700 hover:bg-amber-800 text-white py-4 rounded-xl font-black text-base shadow-lg transition-all"
                  >
                    Confirm & Place Order (₹{total})
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 sticky top-28">
              <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">Items Summary</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cartItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs">
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded-lg bg-amber-50" />
                    <div className="flex-1">
                      <div className="font-bold text-slate-800 line-clamp-1">{item.product.name}</div>
                      <div className="text-slate-500">{item.variant.size} x {item.quantity}</div>
                    </div>
                    <div className="font-bold text-slate-900">₹{item.variant.price * item.quantity}</div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between"><span>Subtotal</span><span className="font-bold">₹{subtotal}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span className="font-bold">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
                <div className="flex justify-between"><span>GST (5%)</span><span className="font-bold">₹{tax}</span></div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total</span>
                  <span className="text-amber-800">₹{total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
