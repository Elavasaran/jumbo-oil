import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { loginCustomer } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCustomer(email || 'new.user@example.com', password);
    showToast("Account created successfully!", "success");
    navigate('/account');
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col justify-center bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 grid grid-cols-1 md:grid-cols-12">
          {/* Left Split */}
          <div className="md:col-span-5 relative bg-gradient-to-br from-brand-navy via-amber-950 to-brand-navy p-8 text-white flex flex-col justify-between min-h-[350px]">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <img 
                src="https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&q=80&w=800" 
                alt="Oil background" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="relative z-10">
              <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center font-black text-xl mb-4 shadow-md">
                JT
              </div>
              <h2 className="text-2xl font-black text-white">Join Jumbo Trades Today</h2>
              <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                Create an account to enjoy exclusive offers, faster checkout, and order tracking for 100% natural edible oils.
              </p>
            </div>

            <div className="relative z-10 pt-8 border-t border-white/10 text-xs text-amber-200">
              <span>Pure Taste • Trusted Quality • Fast Delivery</span>
            </div>
          </div>

          {/* Right Split: Register Form */}
          <div className="md:col-span-7 p-8 md:p-12 space-y-6">
            <div>
              <h3 className="text-2xl font-black text-slate-900">Create Account</h3>
              <p className="text-xs text-slate-500 mt-1">Fill in your details below to register.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    required
                    placeholder="Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input 
                      type="email" 
                      required
                      placeholder="rahul@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input 
                    type="password" 
                    required
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-brand-navy hover:bg-amber-800 text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="text-amber-700 font-bold hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
