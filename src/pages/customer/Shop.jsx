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
      {/* Shop Header Banner */}
      <section className="relative py-16 bg-gradient-to-r from-brand-navy via-amber-900 to-brand-navy text-white overflow-hidden mb-10">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1474625121024-7595bfbc57ac?auto=format&fit=crop&q=80&w=1600" 
            alt="Shop Banner Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
          <span className="inline-block px-3 py-1 bg-amber-500/20 rounded-full text-amber-300 font-bold text-xs uppercase tracking-widest border border-amber-500/30 mb-3">
            Pure & Natural Selection
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">
            Shop Our Premium Oils
          </h1>
          <p className="text-slate-300 text-base md:text-lg font-light">
            Natural oils for a healthier tomorrow. Select your preferred size and enjoy doorstep delivery across India.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6">
        {/* Search & Filter Controls */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200/80 mb-10 flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Category Filter & Sort */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 mr-2">
              <SlidersHorizontal className="w-4 h-4 text-amber-700" />
              <span>Filter:</span>
            </div>

            {['All', 'Coconut', 'Sunflower', 'Gingelly'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat === 'All' ? 'All Products' : `${cat} Oil`}
              </button>
            ))}

            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="rating">Sort by: Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
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
