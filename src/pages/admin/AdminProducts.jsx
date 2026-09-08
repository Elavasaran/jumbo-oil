import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, ArrowLeft, Save, Search, AlertCircle, X } from 'lucide-react';
import { useMockData } from '../../context/MockDataContext';

const ProductList = () => {
  const { products, deleteProduct } = useMockData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}? This will also delete all its variants and inventory.`)) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900">Products</h1>
          <p className="text-xs text-slate-500 mt-1">Manage your product catalog</p>
        </div>
        <Link to="add" className="bg-brand-navy text-white px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-brand-navy/90 transition-colors shadow-sm w-full sm:w-auto justify-center">
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
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
                <th className="px-4 py-3 md:px-6">Category</th>
                <th className="px-4 py-3 md:px-6">Variants</th>
                <th className="px-4 py-3 md:px-6">Price (Starting)</th>
                <th className="px-4 py-3 md:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3 md:px-6">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg border border-slate-100 p-1 shrink-0">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                        ) : (
                          <div className="w-full h-full bg-slate-100 rounded flex items-center justify-center text-slate-400 text-xs">No Img</div>
                        )}
                      </div>
                      <span className="font-bold text-slate-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 md:px-6 text-slate-600">{product.category || 'N/A'}</td>
                  <td className="px-4 py-3 md:px-6">
                    <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-[11px] font-bold border border-blue-100">
                      {(product.variants || []).length} sizes
                    </span>
                  </td>
                  <td className="px-4 py-3 md:px-6 font-black text-slate-800">
                    {product.variants && product.variants.length > 0 ? `₹${Math.min(...product.variants.map(v => v.price))}` : 'N/A'}
                  </td>
                  <td className="px-4 py-3 md:px-6 text-right">
                    <div className="flex items-center justify-end gap-2 md:gap-3">
                      <Link to={`/product-information/${product.id}`} target="_blank" className="p-1.5 text-slate-400 hover:text-brand-navy hover:bg-slate-100 rounded-lg transition-colors" title="View on site">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link to={`${product.id}/edit`} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(product.id, product.name)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-500">
                      <AlertCircle className="w-8 h-8 text-slate-300 mb-3" />
                      <p className="text-sm font-bold text-slate-700">No products found</p>
                      <p className="text-xs mt-1">Try adjusting your search or add a new product.</p>
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

const ProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { products, addProduct, updateProduct } = useMockData();
  
  const existingProduct = isEdit ? products.find(p => p.id === id) : null;

  const [formData, setFormData] = useState({
    name: existingProduct?.name || '',
    category: existingProduct?.category || 'Edible Oil',
    description: existingProduct?.description || '',
    image: existingProduct?.image || '',
  });

  const [variants, setVariants] = useState(existingProduct?.variants || []);
  const [newVariant, setNewVariant] = useState({ size: '', sku: '', price: '', stock: '' });

  const handleVariantAdd = () => {
    if (!newVariant.size || !newVariant.price || !newVariant.sku) return;
    setVariants([...variants, { 
      id: `var-${Date.now()}`, 
      size: newVariant.size, 
      sku: newVariant.sku, 
      price: Number(newVariant.price), 
      stock: Number(newVariant.stock || 0),
      lowStockThreshold: 10,
      status: Number(newVariant.stock) > 0 ? "In Stock" : "Out of Stock"
    }]);
    setNewVariant({ size: '', sku: '', price: '', stock: '' });
  };

  const handleVariantRemove = (variantId) => {
    setVariants(variants.filter(v => v.id !== variantId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updateProduct(id, { ...formData, variants });
    } else {
      const newId = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      addProduct({
        id: newId,
        slug: newId,
        ...formData,
        variants,
        rating: 5.0,
        reviewCount: 0
      });
    }
    navigate('..');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('..')} className="p-2 text-slate-500 hover:text-slate-800 bg-white rounded-xl border border-slate-200 shadow-sm transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900">{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
          <p className="text-xs text-slate-500 mt-1">{isEdit ? 'Update existing product details' : 'Create a new product catalog entry'}</p>
        </div>
      </div>

      <div className="bg-white p-5 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <form className="space-y-8" onSubmit={handleSubmit}>
          
          <div className="space-y-6">
            <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-2">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-2">Product Name <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy outline-none text-sm font-medium transition-all" 
                  placeholder="e.g. Premium Coconut Oil"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Category</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy outline-none text-sm font-medium transition-all"
                >
                  <option>Edible Oil</option>
                  <option>Ghee</option>
                  <option>Spices</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Image URL (Frontend Mock)</label>
                <input 
                  type="text" 
                  value={formData.image}
                  onChange={e => setFormData({...formData, image: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy outline-none text-sm font-medium transition-all" 
                  placeholder="https://..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-2">Description <span className="text-rose-500">*</span></label>
                <textarea 
                  rows="4" 
                  required 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy outline-none text-sm font-medium transition-all resize-none" 
                  placeholder="Detailed product description..."
                ></textarea>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-2">Variants & Inventory</h3>
            
            {/* Add Variant Box */}
            <div className="bg-slate-50 p-4 md:p-5 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-700 mb-3">Add New Variant</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 items-end">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Size</label>
                  <input type="text" value={newVariant.size} onChange={e=>setNewVariant({...newVariant, size: e.target.value})} className="w-full p-2.5 text-sm bg-white border border-slate-200 rounded-lg outline-none focus:border-brand-navy" placeholder="e.g. 1 L" />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">SKU</label>
                  <input type="text" value={newVariant.sku} onChange={e=>setNewVariant({...newVariant, sku: e.target.value})} className="w-full p-2.5 text-sm bg-white border border-slate-200 rounded-lg outline-none focus:border-brand-navy" placeholder="JT-CO-1L" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Price (₹)</label>
                  <input type="number" value={newVariant.price} onChange={e=>setNewVariant({...newVariant, price: e.target.value})} className="w-full p-2.5 text-sm bg-white border border-slate-200 rounded-lg outline-none focus:border-brand-navy" placeholder="0" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Init Stock</label>
                  <input type="number" value={newVariant.stock} onChange={e=>setNewVariant({...newVariant, stock: e.target.value})} className="w-full p-2.5 text-sm bg-white border border-slate-200 rounded-lg outline-none focus:border-brand-navy" placeholder="0" />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <button type="button" onClick={handleVariantAdd} className="w-full bg-slate-800 text-white p-2.5 rounded-lg text-sm font-bold hover:bg-slate-900 transition-colors">
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Existing Variants List */}
            <div className="space-y-3">
              {variants.length > 0 ? variants.map((v) => (
                <div key={v.id} className="flex flex-wrap sm:flex-nowrap justify-between items-center p-3 md:p-4 bg-white border border-slate-200 rounded-xl shadow-sm gap-4">
                  <div className="flex-1 min-w-[120px]">
                    <p className="text-sm font-bold text-slate-900">{v.size}</p>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">{v.sku}</p>
                  </div>
                  <div className="w-24">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Price</p>
                    <p className="text-sm font-black text-slate-900">₹{v.price}</p>
                  </div>
                  <div className="w-24">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Stock</p>
                    <p className={`text-sm font-black ${v.stock > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{v.stock}</p>
                  </div>
                  <button type="button" onClick={() => handleVariantRemove(v.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )) : (
                <div className="text-center p-6 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 text-sm font-medium">
                  No variants added yet. Add at least one variant (size/price).
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4">
            <button type="button" onClick={() => navigate('..')} className="px-6 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors text-sm">
              Cancel
            </button>
            <button type="submit" disabled={variants.length === 0} className="px-6 py-3 bg-brand-gold text-white rounded-xl font-bold hover:bg-amber-600 transition-colors shadow-sm shadow-brand-gold/20 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed">
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
