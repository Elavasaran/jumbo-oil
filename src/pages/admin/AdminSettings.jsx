import React, { useState } from 'react';
import { siteConfig } from '../../config/siteConfig';
import { Save, AlertCircle } from 'lucide-react';

const AdminSettings = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    // Mock save delay
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900">Settings</h1>
          <p className="text-xs text-slate-500 mt-1">Manage your store configuration and contact details</p>
        </div>
      </div>

      {showSuccess && (
        <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-200 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
            <Save className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <p className="font-bold text-sm">Settings Saved Successfully</p>
            <p className="text-xs opacity-80">Your configuration changes have been applied.</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-8">
        <form className="space-y-10" onSubmit={handleSave}>
          
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-2">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">Business Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Brand Name</label>
                <input 
                  type="text" 
                  defaultValue={siteConfig.brandName} 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy outline-none text-sm font-medium transition-all" 
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-2">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">Contact Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Support Email Address</label>
                <input 
                  type="email" 
                  defaultValue={siteConfig.contact.email} 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy outline-none text-sm font-medium transition-all" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Phone Number</label>
                <input 
                  type="text" 
                  defaultValue={siteConfig.contact.phone} 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy outline-none text-sm font-medium transition-all font-mono" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">WhatsApp Number</label>
                <input 
                  type="text" 
                  defaultValue={siteConfig.contact.whatsapp} 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy outline-none text-sm font-medium transition-all font-mono" 
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-2">Business Address</label>
                <textarea 
                  rows="3" 
                  defaultValue={siteConfig.contact.address} 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy outline-none text-sm font-medium transition-all resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-2">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">Social Media Links</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Instagram URL</label>
                <input 
                  type="url" 
                  defaultValue={siteConfig.social.instagram} 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy outline-none text-sm transition-all" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Facebook URL</label>
                <input 
                  type="url" 
                  defaultValue={siteConfig.social.facebook} 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy outline-none text-sm transition-all" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">LinkedIn URL</label>
                <input 
                  type="url" 
                  defaultValue={siteConfig.social.linkedin} 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy outline-none text-sm transition-all" 
                />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400">
              <AlertCircle className="w-4 h-4" />
              <span className="text-xs">Changes apply immediately across the storefront.</span>
            </div>
            <button 
              type="submit" 
              disabled={isSaving}
              className="px-8 py-3 bg-brand-navy text-white rounded-xl font-bold hover:bg-slate-800 flex items-center gap-2 transition-all shadow-sm shadow-brand-navy/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              <Save className="w-4 h-4" /> 
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
