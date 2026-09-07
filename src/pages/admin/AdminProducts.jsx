import React, { useState } from 'react';
import { Link, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, ArrowLeft, Save } from 'lucide-react';
import { products } from '../../data/products';

const ProductList = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Link to="add" className="bg-brand-navy text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-brand-navy/90">
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Variants</th>
                <th className="px-6 py-4 font-medium">Price (Starting)</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-50 rounded border border-gray-100 p-1">
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                      </div>
                      <span className="font-bold text-brand-navy">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{product.category}</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                      {product.variants.length} sizes
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">₹{product.variants[0]?.price}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 text-gray-400">
                      <Link to={`/product-information/${product.id}`} className="hover:text-brand-navy" title="View"><Eye className="w-4 h-4" /></Link>
                      <Link to={`${product.id}/edit`} className="hover:text-blue-500" title="Edit"><Edit className="w-4 h-4" /></Link>
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

const ProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  // Basic mock form, actual app would load data if edit
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('..')} className="p-2 text-gray-400 hover:text-gray-600 bg-white rounded-lg border border-gray-100">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
      </div>

      <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('..'); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
              <input type="text" required className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none" defaultValue={isEdit ? "Premium Coconut Oil" : ""} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none">
                <option>Edible Oil</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input type="text" className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none" defaultValue={isEdit ? "https://placehold.co/600x600/0F172A/FFFBEB?text=Coconut+Oil" : ""} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea rows="3" required className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none resize-none" defaultValue={isEdit ? "100% pure and natural coconut oil..." : ""}></textarea>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Variants (Sizes)</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4 grid grid-cols-4 gap-4 items-end">
               <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Size</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="e.g. 500 ml" />
               </div>
               <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">SKU</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="SKU-123" />
               </div>
               <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Price</label>
                  <input type="number" className="w-full p-2 border border-gray-300 rounded" placeholder="₹" />
               </div>
               <button type="button" className="bg-gray-200 text-gray-700 px-4 py-2 rounded font-medium hover:bg-gray-300">Add Variant</button>
            </div>
            {isEdit && (
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded text-sm">
                  <span>500 ml (CO-500ML)</span>
                  <span className="font-bold">₹150</span>
                  <button type="button" className="text-red-500 hover:underline">Remove</button>
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
            <button type="button" onClick={() => navigate('..')} className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-6 py-2.5 bg-brand-navy text-white rounded-lg font-medium hover:bg-brand-navy/90 flex items-center gap-2">
              <Save className="w-4 h-4" /> {isEdit ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminProducts = () => {
  return (
    <Routes>
      <Route index element={<ProductList />} />
      <Route path="add" element={<ProductForm />} />
      <Route path=":id/edit" element={<ProductForm />} />
    </Routes>
  );
};

export default AdminProducts;
