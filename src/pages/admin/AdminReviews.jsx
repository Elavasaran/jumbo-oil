import React, { useState } from 'react';
import { useMockData } from '../../context/MockDataContext';
import { Check, X, Trash2, Star, Search, AlertCircle, Eye } from 'lucide-react';

const AdminReviews = () => {
  const { reviews, updateReviewStatus } = useMockData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedReview, setSelectedReview] = useState(null);

  const filteredReviews = reviews.filter(r => {
    const matchesSearch = r.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.review.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900">Customer Reviews</h1>
          <p className="text-xs text-slate-500 mt-1">Manage and moderate product reviews</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search reviews..." 
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
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Hidden">Hidden</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="px-4 py-3 md:px-6">Customer</th>
                <th className="px-4 py-3 md:px-6">Rating</th>
                <th className="px-4 py-3 md:px-6">Review snippet</th>
                <th className="px-4 py-3 md:px-6">Date</th>
                <th className="px-4 py-3 md:px-6">Status</th>
                <th className="px-4 py-3 md:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredReviews.map(review => (
                <tr key={review.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3.5 md:px-6 font-bold text-slate-900">{review.customerName}</td>
                  <td className="px-4 py-3.5 md:px-6">
                    <div className="flex gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-current' : 'text-slate-200'}`} />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 md:px-6 text-slate-600 max-w-[200px] truncate" title={review.review}>
                    {review.review}
                  </td>
                  <td className="px-4 py-3.5 md:px-6 text-slate-500">{new Date(review.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3.5 md:px-6">
                    <select 
                      value={review.status}
                      onChange={(e) => updateReviewStatus(review.id, e.target.value)}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold border outline-none cursor-pointer ${
                        review.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 
                        review.status === 'Hidden' ? 'bg-rose-100 text-rose-800 border-rose-200' :
                        'bg-amber-100 text-amber-800 border-amber-200'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Hidden">Hidden</option>
                    </select>
                  </td>
                  <td className="px-4 py-3.5 md:px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setSelectedReview(review)}
                        className="p-1.5 text-slate-400 hover:text-brand-navy hover:bg-slate-100 rounded-lg transition-colors" 
                        title="View Full Review"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredReviews.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-500">
                      <AlertCircle className="w-8 h-8 text-slate-300 mb-3" />
                      <p className="text-sm font-bold text-slate-700">No reviews found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-black text-lg text-slate-900">{selectedReview.customerName}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < selectedReview.rating ? 'fill-current' : 'text-slate-200'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500">{new Date(selectedReview.date).toLocaleDateString()}</span>
                </div>
              </div>
              <button onClick={() => setSelectedReview(null)} className="text-slate-400 hover:text-rose-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
              <p className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">{selectedReview.review}</p>
            </div>

            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => { updateReviewStatus(selectedReview.id, 'Hidden'); setSelectedReview(null); }}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors"
              >
                Hide Review
              </button>
              <button 
                onClick={() => { updateReviewStatus(selectedReview.id, 'Approved'); setSelectedReview(null); }}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors"
              >
                Approve Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
