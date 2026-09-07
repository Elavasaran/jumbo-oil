import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Star, CheckCircle2, ShieldCheck, Leaf, Award, ArrowLeft, Plus, Minus, Info, Package, Sparkles } from 'lucide-react';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import ProductCard from '../../components/customer/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  // Find product by id or slug
  const product = products.find(p => p.id === id || p.slug === id) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[1] || product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('productInformation');

  const gallery = product.galleryImages || [product.image];

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    showToast(`Added ${product.name} (${selectedVariant.size}) x${quantity} to cart!`, 'cart');
  };

  const otherProducts = products.filter(p => p.id !== product.id);

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link to="/" className="hover:text-amber-700">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-amber-700">Shop</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">{product.name}</span>
        </div>

        {/* Product Purchase Area (Gallery Left + Purchase Details Right) */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200/80 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Gallery Left */}
            <div className="lg:col-span-6 space-y-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-b from-amber-50 to-amber-100/40 p-4 border border-amber-900/10 shadow-sm relative">
                <img 
                  src={gallery[activeImageIndex]} 
                  alt={product.name}
                  className="w-full h-full object-cover rounded-xl"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm border border-white flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{product.rating} ({product.reviewCount} reviews)</span>
                </span>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all p-1 bg-amber-50 ${
                      activeImageIndex === idx ? 'border-amber-600 shadow-md scale-105' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover rounded-lg" />
                  </button>
                ))}
              </div>
            </div>

            {/* Purchase Controls Right */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-xs uppercase tracking-wider mb-2">
                  {product.tagline || '100% Pure • Cold Pressed'}
                </span>
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
                  {product.name}
                </h1>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Variant selector */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2.5">
                  <span>Select Pack Size:</span>
                  <span className="text-amber-700">SKU: {selectedVariant.sku}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2 text-xs font-black rounded-xl border transition-all ${
                        selectedVariant.id === v.id
                          ? 'bg-amber-700 border-amber-700 text-white shadow-md scale-105'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50 hover:border-amber-300'
                      }`}
                    >
                      {v.size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing & Add to Cart */}
              <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-900/10 space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block">Total Price</span>
                    <span className="text-3xl font-black text-slate-900">₹{selectedVariant.price * quantity}</span>
                    <span className="text-xs text-slate-500 ml-2">(₹{selectedVariant.price} / {selectedVariant.size})</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                    {selectedVariant.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  {/* Quantity */}
                  <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden shadow-sm">
                    <button
                      type="button"
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="px-3.5 py-3 text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-black text-sm text-slate-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="px-3.5 py-3 text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 bg-brand-navy hover:bg-amber-800 text-white px-6 py-3.5 rounded-xl font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>

              {/* Trust highlights strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
                  <Leaf className="w-4 h-4 text-amber-700" />
                  <span>100% Natural</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
                  <Award className="w-4 h-4 text-amber-700" />
                  <span>No Preservatives</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>Cold Pressed</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>Rich Nutrients</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Product Details */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200/80 mb-12">
          {/* Tabs header */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4 mb-8">
            {[
              { id: 'productInformation', label: 'Product Information' },
              { id: 'ingredients', label: 'Ingredients' },
              { id: 'usage', label: 'Usage & Benefits' },
              { id: 'nutrition', label: 'Nutritional Info' },
              { id: 'storage', label: 'Storage' },
              { id: 'packaging', label: 'Packaging' },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all ${
                  activeTab === tab.id
                    ? 'bg-amber-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="max-w-4xl">
            {activeTab === 'productInformation' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">About {product.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{product.productInformation}</p>
                <div className="pt-4 bg-amber-50/60 p-5 rounded-2xl border border-amber-900/10">
                  <h4 className="font-bold text-slate-900 text-sm mb-2">Key Highlights</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-700" /> Pure & Natural Sourcing</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-700" /> Rich Traditional Aroma</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-700" /> Multi-Purpose Kitchen Use</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-700" /> Traditionally Processed</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Ingredients</h3>
                <ul className="list-disc pl-5 text-slate-600 text-sm space-y-2">
                  {product.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'usage' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Usage & Culinary Benefits</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{product.usage}</p>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Nutritional Values (per 100g approx)</h3>
                <div className="border border-slate-200 rounded-2xl overflow-hidden max-w-lg">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-800 uppercase text-[10px] font-bold">
                      <tr>
                        <th className="p-3">Nutrient</th>
                        <th className="p-3">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {product.nutrition.map((item, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <td className="p-3 font-semibold text-slate-700">{item.label}</td>
                          <td className="p-3 font-bold text-amber-800">{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'storage' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Storage Instructions</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{product.storage}</p>
              </div>
            )}

            {activeTab === 'packaging' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Packaging Information</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{product.packaging}</p>
                <p className="text-slate-500 text-xs">{product.manufacturingInformation}</p>
              </div>
            )}
          </div>
        </div>

        {/* Why Choose Our [Oil]? Benefit Cards */}
        <section className="bg-gradient-to-br from-amber-50 to-white rounded-3xl p-8 md:p-12 border border-amber-900/10 mb-12 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-amber-800 font-bold uppercase tracking-wider text-xs block mb-1">Visual Benefits</span>
            <h2 className="text-2xl md:text-3xl font-black text-brand-navy">Why Choose Our {product.name}?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {product.benefits.map((b, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-amber-200/80 shadow-sm text-center">
                <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto mb-4 font-black">
                  0{idx + 1}
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-2">{b.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* You May Also Like (Cross-Sell) */}
        <section className="mb-12">
          <h3 className="text-2xl font-black text-brand-navy mb-6">You May Also Like</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {otherProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetails;
