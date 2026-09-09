import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const Login = () => {
  const [email, setEmail] = useState('rahul.sharma@example.com');
  const [password, setPassword] = useState('password123');
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    const result = await login(email, password);
    
    setIsLoading(false);
    
    if (result.success) {
      if (result.role === 'admin') {
        showToast("Logged in as Admin!", "success");
        navigate('/admin');
      } else {
        showToast("Logged in successfully!", "success");
        navigate('/account');
      }
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col justify-center bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 grid grid-cols-1 md:grid-cols-12">
          {/* Left Split: Premium Oil Visual */}
          <div className="md:col-span-5 relative bg-gradient-to-br from-brand-navy via-amber-950 to-brand-navy p-8 text-white flex flex-col justify-between min-h-[350px]">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <img 
                src="https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?auto=format&fit=crop&q=80&w=800" 
                alt="Oil background" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="relative z-10">
              <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center font-black text-xl mb-4 shadow-md">
                JT
              </div>
              <h2 className="text-2xl font-black text-white">Welcome Back to Jumbo Trades</h2>
              <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                Access your orders, track shipments, and reorder pure edible oils easily.
              </p>
            </div>

            <div className="relative z-10 pt-8 border-t border-white/10 text-xs text-amber-200">
              <span>Pure Taste • Trusted Quality • Fast Delivery</span>
            </div>
          </div>

          {/* Right Split: Login Form */}
          <div className="md:col-span-7 p-8 md:p-12 space-y-6">
            <div>
              <h3 className="text-2xl font-black text-slate-900">Sign In</h3>
              <p className="text-xs text-slate-500 mt-1">Enter your account credentials to log in.</p>
            </div>

            {error && (
              <div className="p-3 bg-rose-50 text-rose-700 text-sm font-bold rounded-xl border border-rose-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input type="checkbox" defaultChecked className="text-amber-600 rounded" />
                  <span>Remember me</span>
                </label>
                <Link to="#" className="text-amber-700 font-bold hover:underline">Forgot password?</Link>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full bg-brand-navy hover:bg-amber-800 text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-amber-700 font-bold hover:underline">
                Create Account
              </Link>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-[11px] text-blue-800 text-center">
              <strong>Admin Access:</strong> Email: <strong>admin@jumbotrades.demo</strong> Password: <strong>admin</strong><br/>
              <strong>Customer Access:</strong> Email: <strong>rahul.sharma@example.com</strong> Password: <strong>password123</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
