import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageSquare, Send, ArrowRight, ExternalLink } from 'lucide-react';
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

  const cleanPhone = (phoneStr) => {
    return phoneStr ? phoneStr.replace(/\D/g, '') : '';
  };

  const whatsappNumber = cleanPhone("+91 6369492221");
  const whatsappMsg = encodeURIComponent("Hello Jumbo Trades, I would like to know more about your edible oil products.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;
  
  const emailSubject = encodeURIComponent("Jumbo Trades Product Enquiry");
  const emailBody = encodeURIComponent("Hello Jumbo Trades,\n\nI would like to know more about your edible oil products.\n\nThank you.");
  const emailLink = `mailto:${siteConfig.contact.email}?subject=${emailSubject}&body=${emailBody}`;

  const phoneLink = `tel:+${cleanPhone(siteConfig.contact.phone)}`;

  return (
    <div className="pt-24 pb-20 bg-[#FDFBF7] min-h-screen font-sans text-slate-800">
      {/* 1. CONTACT HERO */}
      <section className="relative py-20 bg-[#1A2E46] text-white overflow-hidden mb-16 rounded-3xl mx-4 md:mx-6 shadow-lg border border-amber-900/20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A2E46] to-amber-950/40 pointer-events-none"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-3xl">
          <span className="inline-flex items-center justify-center gap-2 px-4 py-1.5 bg-amber-500/10 text-amber-300 font-bold text-xs uppercase tracking-[0.2em] rounded-full border border-amber-500/20 mb-6 backdrop-blur-md">
            We are here to help
          </span>
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-[#FDFBF7] drop-shadow-sm"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            Let's Connect
          </h1>
          <p className="text-amber-50/80 text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            Have questions about Jumbo Trades edible oils, bulk orders, or dealership inquiries? Send us a message or reach out directly.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl space-y-16">
        
        {/* 2. TWO-COLUMN MAIN CONTACT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT SIDE: Send Us a Message Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col justify-center">
            <div className="mb-8">
              <h2 
                className="text-3xl font-black text-[#1A2E46] mb-3"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                Send Us a Message
              </h2>
              <p className="text-slate-600 font-medium">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#1A2E46] mb-2">Your Name</label>
                <input 
                  type="text"
                  required
                  placeholder="Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-4 bg-[#FAFAF9] border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#1A2E46] mb-2">Email Address</label>
                  <input 
                    type="email"
                    required
                    placeholder="rahul@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-4 bg-[#FAFAF9] border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1A2E46] mb-2">Phone Number</label>
                  <input 
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-5 py-4 bg-[#FAFAF9] border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1A2E46] mb-2">Your Message</label>
                <textarea 
                  rows={5}
                  required
                  placeholder="How can we assist you with product enquiries, bulk orders, or feedback?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-5 py-4 bg-[#FAFAF9] border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#1A2E46] hover:bg-amber-600 text-white py-4 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* RIGHT SIDE: Premium Contact Info Panel */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-center">
            <div>
              <h2 
                className="text-3xl font-black text-[#1A2E46] mb-3"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                Get in Touch
              </h2>
              <p className="text-slate-600 font-medium leading-relaxed">
                We’re here to help with product enquiries, bulk orders, dealership opportunities, and feedback.
              </p>
            </div>

            <div className="space-y-4">
              {/* WhatsApp Item */}
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 bg-[#25D366]/10 text-[#25D366] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#1A2E46] text-sm">WhatsApp</h4>
                  <p className="text-slate-900 font-semibold">+91 6369492221</p>
                  <p className="text-slate-500 text-xs mt-0.5">Chat with us directly</p>
                </div>
                <div className="text-slate-300 group-hover:text-amber-500 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </a>

              {/* Email Item */}
              <a 
                href={emailLink}
                className="group flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#1A2E46] text-sm">Email</h4>
                  <p className="text-slate-900 font-semibold break-all">{siteConfig.contact.email}</p>
                  <p className="text-slate-500 text-xs mt-0.5">Send us an enquiry</p>
                </div>
                <div className="text-slate-300 group-hover:text-amber-500 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </a>

              {/* Phone Item */}
              <a 
                href={phoneLink}
                className="group flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#1A2E46] text-sm">Phone Support</h4>
                  <p className="text-slate-900 font-semibold">{siteConfig.contact.phone}</p>
                  <p className="text-slate-500 text-xs mt-0.5">Call our support team</p>
                </div>
                <div className="text-slate-300 group-hover:text-amber-500 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </a>

              {/* Address Item (Not a link, just info) */}
              <div className="flex items-start gap-4 p-5 bg-[#FAFAF9] rounded-2xl border border-slate-100">
                <div className="w-12 h-12 bg-slate-200/50 text-slate-600 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1A2E46] text-sm mb-1">Head Office & Processing Unit</h4>
                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                    {siteConfig.contact.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. QUICK ENQUIRY & MAP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-8 border-t border-slate-200/60">
          
          {/* Quick Enquiry */}
          <div className="bg-[#1A2E46] text-white rounded-[2rem] p-8 md:p-12 flex flex-col justify-center text-center shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <h3 
                className="text-2xl md:text-3xl font-black mb-4"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                Have a question about our oils?
              </h3>
              <p className="text-slate-300 font-medium leading-relaxed mb-8 max-w-md mx-auto">
                For product enquiries, bulk orders, dealership opportunities, or feedback, contact us through WhatsApp or email.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </a>
                <a 
                  href={emailLink}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  <span>Send an Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Clean Map/Location */}
          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-center items-center text-center">
            <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-5">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#1A2E46] mb-2">Jumbo Trades Industrial Hub</h3>
            <p className="text-slate-500 text-sm mb-6 max-w-xs">
              {siteConfig.contact.address}
            </p>
            <button className="text-[#1A2E46] hover:text-amber-600 font-bold text-sm inline-flex items-center gap-2 transition-colors">
              <span>View on Google Maps</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
