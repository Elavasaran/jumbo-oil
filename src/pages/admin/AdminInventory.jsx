import React from 'react';
import { products } from '../../data/products';

const AdminInventory = () => {
  const allVariants = products.flatMap(p => 
    p.variants.map(v => ({ product: p.name, ...v }))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
        <button className="bg-brand-navy text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-navy/90">
          Export Stock
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Variant</th>
                <th className="px-6 py-4 font-medium">SKU</th>
                <th className="px-6 py-4 font-medium">Current Stock</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Update Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allVariants.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-brand-navy">{item.product}</td>
                  <td className="px-6 py-4 text-gray-500">{item.size}</td>
                  <td className="px-6 py-4 text-gray-400 font-mono text-xs">{item.sku}</td>
                  <td className="px-6 py-4 font-bold">{item.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      item.stock === 0 ? 'bg-red-100 text-red-700' : 
                      item.stock <= item.lowStockThreshold ? 'bg-orange-100 text-orange-700' : 
                      'bg-green-100 text-green-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <input type="number" defaultValue={item.stock} className="w-20 p-1.5 border border-gray-300 rounded text-center text-sm" />
                      <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm font-medium">Set</button>
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

export default AdminInventory;
