import React from 'react';
import { reviews } from '../../data/reviews';
import { Check, X, Trash2, Star } from 'lucide-react';

const AdminReviews = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Customer Reviews</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Rating</th>
                <th className="px-6 py-4 font-medium">Review</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reviews.map(review => (
                <tr key={review.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-brand-navy">{review.customerName}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1 text-brand-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 max-w-xs truncate" title={review.review}>
                    {review.review}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{new Date(review.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      review.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {review.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 text-gray-400">
                      <button className="hover:text-green-500" title="Approve"><Check className="w-4 h-4" /></button>
                      <button className="hover:text-orange-500" title="Hide"><X className="w-4 h-4" /></button>
                      <button className="hover:text-red-500" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;
