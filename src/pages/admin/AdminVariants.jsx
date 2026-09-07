import React from 'react';
import { products } from '../../data/products';
import { Edit, Trash2 } from 'lucide-react';

const AdminVariants = () => {
  const allVariants = products.flatMap(p => 
    p.variants.map(v => ({ product: p.name, ...v }))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">All Variants</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Size</th>
                <th className="px-6 py-4 font-medium">SKU</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allVariants.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-brand-navy">{item.product}</td>
                  <td className="px-6 py-4 text-gray-600 font-bold">{item.size}</td>
                  <td className="px-6 py-4 text-gray-400 font-mono text-xs">{item.sku}</td>
                  <td className="px-6 py-4 font-medium text-brand-gold">₹{item.price}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 text-gray-400">
                      <button className="hover:text-blue-500" title="Edit"><Edit className="w-4 h-4" /></button>
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

export default AdminVariants;
