import React, { useState } from 'react';
import { useMockData } from '../../context/MockDataContext';
import { Eye, Mail, CheckCircle, Clock, Search, AlertCircle, X, Send } from 'lucide-react';

const AdminEnquiries = () => {
  const { enquiries, updateEnquiryStatus } = useMockData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const filteredEnquiries = enquiries.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900">Contact Enquiries</h1>
          <p className="text-xs text-slate-500 mt-1">Manage messages from the contact form</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-48 p-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Read">Read</option>
            <option value="Replied">Replied</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="px-4 py-3 md:px-6">Name</th>
                <th className="px-4 py-3 md:px-6">Contact Info</th>
                <th className="px-4 py-3 md:px-6">Message Snippet</th>
                <th className="px-4 py-3 md:px-6">Date</th>
                <th className="px-4 py-3 md:px-6">Status</th>
                <th className="px-4 py-3 md:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredEnquiries.map(enquiry => (
                <tr key={enquiry.id} className={`hover:bg-slate-50/80 transition-colors ${enquiry.status === 'New' ? 'bg-blue-50/30 font-bold' : ''}`}>
                  <td className="px-4 py-3.5 md:px-6 text-slate-900">{enquiry.name}</td>
                  <td className="px-4 py-3.5 md:px-6 text-slate-600">
                    <div className="text-xs">{enquiry.email}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{enquiry.phone}</div>
                  </td>
                  <td className="px-4 py-3.5 md:px-6 text-slate-500 max-w-[200px] truncate" title={enquiry.message}>
                    {enquiry.message}
                  </td>
                  <td className="px-4 py-3.5 md:px-6 text-slate-500 text-xs">{new Date(enquiry.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3.5 md:px-6">
                    <select 
                      value={enquiry.status}
                      onChange={(e) => updateEnquiryStatus(enquiry.id, e.target.value)}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold border outline-none cursor-pointer ${
                        enquiry.status === 'New' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                        enquiry.status === 'Replied' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                        'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="Read">Read</option>
                      <option value="Replied">Replied</option>
                    </select>
                  </td>
                  <td className="px-4 py-3.5 md:px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => {
                          setSelectedEnquiry(enquiry);
                          if(enquiry.status === 'New') updateEnquiryStatus(enquiry.id, 'Read');
                        }}
                        className="p-1.5 text-slate-400 hover:text-brand-navy hover:bg-slate-100 rounded-lg transition-colors" 
                        title="View Full Message"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredEnquiries.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-500">
                      <AlertCircle className="w-8 h-8 text-slate-300 mb-3" />
                      <p className="text-sm font-bold text-slate-700">No enquiries found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enquiry Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-black text-lg text-slate-900">Message from {selectedEnquiry.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{new Date(selectedEnquiry.date).toLocaleString()}</p>
              </div>
              <button onClick={() => setSelectedEnquiry(null)} className="text-slate-400 hover:text-rose-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6 text-sm text-slate-700">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Email</span>
                  <a href={`mailto:${selectedEnquiry.email}`} className="font-medium text-brand-navy hover:underline">{selectedEnquiry.email}</a>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Phone</span>
                  <a href={`tel:${selectedEnquiry.phone}`} className="font-medium text-slate-900 font-mono">{selectedEnquiry.phone}</a>
                </div>
              </div>
              
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Message Content</span>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-wrap leading-relaxed">
                  {selectedEnquiry.message}
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
              <button 
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
              <a 
                href={`mailto:${selectedEnquiry.email}?subject=Re: Your enquiry to Jumbo Trades`}
                onClick={() => updateEnquiryStatus(selectedEnquiry.id, 'Replied')}
                className="px-4 py-2 bg-brand-navy text-white rounded-lg text-sm font-bold hover:bg-brand-navy/90 transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" /> Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;
