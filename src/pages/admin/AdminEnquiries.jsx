import React from 'react';
import { enquiries } from '../../data/enquiries';
import { Eye, Mail, CheckCircle, Clock } from 'lucide-react';

const AdminEnquiries = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Contact Enquiries</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Message</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {enquiries.map(enquiry => (
                <tr key={enquiry.id} className={`hover:bg-gray-50 ${enquiry.status === 'New' ? 'bg-blue-50/30' : ''}`}>
                  <td className="px-6 py-4 font-medium text-brand-navy">{enquiry.name}</td>
                  <td className="px-6 py-4 text-gray-500">
                    <div className="text-sm">{enquiry.email}</div>
                    <div className="text-xs">{enquiry.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 max-w-xs truncate" title={enquiry.message}>
                    {enquiry.message}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{new Date(enquiry.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 w-fit ${
                      enquiry.status === 'New' ? 'bg-blue-100 text-blue-700' :
                      enquiry.status === 'Read' ? 'bg-gray-100 text-gray-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {enquiry.status === 'New' && <Clock className="w-3 h-3" />}
                      {enquiry.status === 'Replied' && <CheckCircle className="w-3 h-3" />}
                      {enquiry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 text-gray-400">
                      <button className="hover:text-brand-navy" title="View Message"><Eye className="w-4 h-4" /></button>
                      <button className="hover:text-blue-500" title="Reply via Email"><Mail className="w-4 h-4" /></button>
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

export default AdminEnquiries;
