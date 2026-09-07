import React from 'react';
import { siteConfig } from '../../config/siteConfig';
import { Save } from 'lucide-react';

const AdminSettings = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          
          <div>
            <h2 className="text-lg font-bold text-brand-navy mb-4 border-b border-gray-100 pb-2">Business Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name</label>
                <input type="text" defaultValue={siteConfig.brandName} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none" />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-brand-navy mb-4 border-b border-gray-100 pb-2">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" defaultValue={siteConfig.contact.email} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input type="text" defaultValue={siteConfig.contact.phone} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number</label>
                <input type="text" defaultValue={siteConfig.contact.whatsapp} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
                <textarea rows="2" defaultValue={siteConfig.contact.address} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none resize-none"></textarea>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-brand-navy mb-4 border-b border-gray-100 pb-2">Social Media</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
                <input type="url" defaultValue={siteConfig.social.instagram} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
                <input type="url" defaultValue={siteConfig.social.facebook} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
                <input type="url" defaultValue={siteConfig.social.linkedin} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none text-sm" />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button type="submit" className="px-6 py-2.5 bg-brand-navy text-white rounded-lg font-medium hover:bg-brand-navy/90 flex items-center gap-2 transition-all">
              <Save className="w-4 h-4" /> Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
