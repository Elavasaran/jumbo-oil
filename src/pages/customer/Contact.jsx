import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageSquare, Send, Check } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { useToast } from '../../context/ToastContext';

const Contact = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast("Thank you! Your message has been sent successfully.", "success");
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="relative py-16 bg-gradient-to-r from-brand-navy via-amber-950 to-brand-navy text-white text-center mb-12 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-amber-500/20 rounded-full text-amber-300 font-bold text-xs uppercase tracking-widest border border-amber-500/30 mb-3">
            We are here to help
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">Let's Connect</h1>
          <p className="text-slate-300 text-sm md:text-base font-light">
            Have questions about Jumbo Trades edible oils, bulk orders, or dealership inquiries? Send us a message or reach out directly.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details & Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-8">
            <div>
              <h2 className="text-2xl font-black text-brand-navy mb-2">Send Us a Message</h2>
              <p className="text-xs text-slate-500">Fill out the form below and our team will get back to you within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                <input 
                  type="text"
                  required
                  placeholder="Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input 
                    type="email"
                    required
                    placeholder="rahul@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input 
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Message</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="How can we assist you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-brand-navy hover:bg-amber-800 text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Business Info & Integrated Map Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-navy text-white p-8 rounded-3xl space-y-6 shadow-md border border-amber-900/30">
              <h3 className="text-xl font-black text-amber-300">Contact Information</h3>
              
              <ul className="space-y-4 text-xs">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white text-sm">Head Office & Processing Unit</strong>
                    <span className="text-slate-300 leading-relaxed">{siteConfig.contact.address}</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <strong className="block text-white text-sm">Phone Support</strong>
                    <span className="text-slate-300">{siteConfig.contact.phone}</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <strong className="block text-white text-sm">Email Inquiries</strong>
                    <span className="text-slate-300">{siteConfig.contact.email}</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <strong className="block text-white text-sm">WhatsApp Business</strong>
                    <span className="text-slate-300">{siteConfig.contact.whatsapp}</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Integrated Map Graphic Card */}
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-3">
              <span className="text-xs font-bold text-slate-700 block px-2">Processing Unit & Distribution Center</span>
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center p-6 text-center text-white border border-slate-800">
                <div className="space-y-2 z-10">
                  <MapPin className="w-8 h-8 text-amber-500 mx-auto animate-bounce" />
                  <span className="font-extrabold text-sm block">Jumbo Trades Industrial Hub</span>
                  <span className="text-[11px] text-slate-400 block">GPS Coordinates: 13.0827° N, 80.2707° E</span>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
