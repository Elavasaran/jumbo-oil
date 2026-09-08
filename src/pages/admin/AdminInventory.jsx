import React, { useState } from 'react';
import { useMockData } from '../../context/MockDataContext';
import { Search, AlertCircle, Save } from 'lucide-react';

const AdminInventory = () => {
  const { products, updateVariant } = useMockData();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Local state to hold edited stock values before saving
  const [editedStocks, setEditedStocks] = useState({});

  const allVariants = products.flatMap(p => 
    (p.variants || []).map(v => ({ productId: p.id, product: p.name, ...v }))
  );

  const filteredVariants = allVariants.filter(v => 
    v.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStockChange = (variantId, value) => {
    setEditedStocks(prev => ({ ...prev, [variantId]: value }));
  };

  const handleSaveStock = (productId, variantId) => {
    const newStock = Number(editedStocks[variantId]);
    if (!isNaN(newStock) && newStock >= 0) {
      updateVariant(productId, variantId, { 
        stock: newStock,
        status: newStock > 0 ? "In Stock" : "Out of Stock"
      });
      // Clear from edited once saved
      setEditedStocks(prev => {
        const next = { ...prev };
        delete next[variantId];
        return next;
      });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900">Inventory Management</h1>
          <p className="text-xs text-slate-500 mt-1">Manage stock levels across all product variants</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search product or SKU..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="px-4 py-3 md:px-6">Product</th>
                <th className="px-4 py-3 md:px-6">Variant / Size</th>
                <th className="px-4 py-3 md:px-6">SKU</th>
                <th className="px-4 py-3 md:px-6">Current Stock</th>
                <th className="px-4 py-3 md:px-6">Status</th>
                <th className="px-4 py-3 md:px-6 text-right">Update Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredVariants.map((item) => {
                const isEdited = editedStocks[item.id] !== undefined;
                const displayStock = isEdited ? editedStocks[item.id] : item.stock;

                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3.5 md:px-6 font-bold text-slate-900">{item.product}</td>
                    <td className="px-4 py-3.5 md:px-6 text-slate-600">{item.size}</td>
                    <td className="px-4 py-3.5 md:px-6 text-slate-400 font-mono text-xs">{item.sku}</td>
                    <td className="px-4 py-3.5 md:px-6 font-black text-slate-800">{item.stock}</td>
                    <td className="px-4 py-3.5 md:px-6">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                        item.stock === 0 ? 'bg-rose-100 text-rose-800 border border-rose-200' : 
                        item.stock <= item.lowStockThreshold ? 'bg-amber-100 text-amber-800 border border-amber-200' : 
                        'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}>
                        {item.stock === 0 ? 'Out of Stock' : item.stock <= item.lowStockThreshold ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 md:px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <input 
                          type="number" 
                          min="0"
                          value={displayStock}
                          onChange={(e) => handleStockChange(item.id, e.target.value)}
                          className="w-20 p-2 bg-slate-50 border border-slate-200 rounded-lg text-center text-sm font-bold focus:border-brand-navy outline-none" 
                        />
                        <button 
                          onClick={() => handleSaveStock(item.productId, item.id)}
                          disabled={!isEdited || displayStock === ''}
                          className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
                            isEdited && displayStock !== '' 
                              ? 'bg-brand-gold text-white hover:bg-amber-600' 
                              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          }`}
                          title="Save Stock"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredVariants.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-500">
                      <AlertCircle className="w-8 h-8 text-slate-300 mb-3" />
                      <p className="text-sm font-bold text-slate-700">No inventory records found</p>
                      <p className="text-xs mt-1">Make sure you have products and variants added.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminInventory;
