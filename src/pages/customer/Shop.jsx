import React, { useState } from 'react';
import { Search, SlidersHorizontal, ArrowRight, ShieldCheck, Leaf, Award } from 'lucide-react';
import { products } from '../../data/products';
import ProductCard from '../../components/customer/ProductCard';

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.name.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      {/* Premium Shop Header Banner */}
      <section className="relative py-20 bg-brand-navy text-white overflow-hidden mb-12 rounded-3xl mx-4 md:mx-6 shadow-xl border border-brand-navy">
        {/* Subtle patterned background or clean gradient instead of messy image */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center text-center max-w-3xl">
          <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-white font-black text-xs uppercase tracking-[0.2em] border border-white/20 mb-4 backdrop-blur-sm shadow-sm">
            Pure & Natural Selection
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight drop-shadow-md">
            Shop Our Premium Oils
          </h1>
          <p className="text-slate-200 text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed">
            Natural oils crafted for a healthier tomorrow. Select your preferred size and enjoy doorstep delivery across India.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6">
        {/* Search & Filter Controls (Clean Horizontal Row) */}
        <div className="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-slate-200/60 mb-10 flex flex-col lg:flex-row gap-4 justify-between items-center w-full">
          {/* Search Box */}
          <div className="relative w-full lg:w-96 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search premium products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-navy focus:bg-white transition-all shadow-inner"
            />
          </div>

          {/* Category Filter & Sort */}
          <div className="flex flex-wrap items-center gap-2 lg:gap-3 w-full lg:w-auto justify-start lg:justify-end">
            <div className="hidden md:flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mr-2">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filter</span>
            </div>

            <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200 shrink-0">
              {['All', 'Coconut', 'Sunflower', 'Gingelly'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-brand-navy text-white shadow-md'
                      : 'text-slate-600 hover:text-brand-navy hover:bg-slate-200/50'
                  }`}
                >
                  {cat === 'All' ? 'All' : `${cat} Oil`}
                </button>
              ))}
            </div>

            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-navy shrink-0 cursor-pointer"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="rating">Sort by: Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid (3-column) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Middle Promotional Banner matching Reference Design */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-100 via-amber-50 to-white border border-amber-900/10 p-8 md:p-12 mb-16 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-amber-800 font-bold text-xs uppercase tracking-widest block">
                Family Nutrition First
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-brand-navy leading-tight">
                Healthy Cooking.<br />Happier Families.
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl">
                Bring home the goodness of nature with Jumbo Trades edible oils. Extracted under stringent quality standards to ensure 100% natural aroma and nutrient retention.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-amber-200">
                  <Leaf className="w-4 h-4 text-amber-700" />
                  <span>100% Natural</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-amber-200">
                  <Award className="w-4 h-4 text-amber-700" />
                  <span>No Preservatives</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-amber-200">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>Hygienic Process</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&q=80&w=800" 
                  alt="Healthy Cooking"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Shop;
