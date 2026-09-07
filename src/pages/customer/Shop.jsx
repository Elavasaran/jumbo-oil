import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  ArrowRight, 
  ShieldCheck, 
  Leaf, 
  Award, 
  PackageCheck,
  Sparkles,
  Droplet
} from 'lucide-react';
import { products } from '../../data/products';
import ProductCard from '../../components/customer/ProductCard';

import goodnessBgImg from '../../assets/goodness_oil_bg.jpg';
import jumboOilsImg from '../../assets/jumbo_trades_oils.jpg';

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['All', 'Coconut Oil', 'Groundnut Oil', 'Gingelly Oil'];

  const filteredProducts = useMemo(() => {
    let result = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesCategory = true;
      if (selectedCategory !== 'All') {
        const catClean = selectedCategory.replace(' Oil', '').toLowerCase();
        matchesCategory = product.name.toLowerCase().includes(catClean);
      }
      return matchesSearch && matchesCategory;
    });

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => (a.variants[0]?.price || 0) - (b.variants[0]?.price || 0));
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => (b.variants[0]?.price || 0) - (a.variants[0]?.price || 0));
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="pt-24 pb-20 bg-amber-50/20 min-h-screen font-sans text-slate-800">
      
      {/* 1. SHOP HEADER / BANNER */}
      <section className="relative py-16 md:py-24 bg-[#1A2E46] text-white overflow-hidden mb-12 rounded-3xl mx-4 md:mx-6 shadow-xl border border-amber-900/20">
        {/* Background Oil Visual Overlay */}
        <div className="absolute inset-0 opacity-25 mix-blend-luminosity pointer-events-none">
          <img 
            src={jumboOilsImg} 
            alt="Jumbo Trades Premium Oils Visual" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Soft Radial Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A2E46] via-[#1A2E46]/95 to-[#0F172A]/90 pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center text-center max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#F8E7CD]/20 text-[#F8E7CD] rounded-full font-black text-xs uppercase tracking-[0.2em] border border-[#F8E7CD]/30 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Pure & Natural Selection
          </span>

          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-md"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            Shop Our Premium Oils
          </h1>

          <p className="text-slate-200 text-sm md:text-base font-semibold max-w-xl mx-auto leading-relaxed">
            Natural oils crafted for a healthier tomorrow. Select your preferred size and enjoy doorstep delivery across India.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6">
        
        {/* 2. SEARCH + FILTER + SORT CONTROL BAR */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-amber-900/10 mb-10 flex flex-col lg:flex-row gap-4 justify-between items-center w-full">
          {/* Search Box */}
          <div className="relative w-full lg:w-96 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search premium oils..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-stone-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#EA660C] focus:bg-white transition-all shadow-inner"
            />
          </div>

          {/* Category Filter & Sort Options */}
          <div className="flex flex-wrap items-center gap-2 lg:gap-3 w-full lg:w-auto justify-start lg:justify-end">
            <div className="hidden md:flex items-center gap-2 text-xs font-black text-[#1A2E46] uppercase tracking-widest mr-1">
              <SlidersHorizontal className="w-4 h-4 text-[#EA660C]" />
              <span>Filter</span>
            </div>

            {/* Category Tabs */}
            <div className="flex bg-stone-100 p-1 rounded-xl border border-slate-200/80 shrink-0 overflow-x-auto max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-black transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#1A2E46] text-white shadow-md'
                      : 'text-slate-600 hover:text-[#1A2E46] hover:bg-white/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 bg-stone-50 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#EA660C] shrink-0 cursor-pointer"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="rating">Sort by: Highest Rated</option>
              <option value="price-asc">Sort by: Price (Low to High)</option>
              <option value="price-desc">Sort by: Price (High to Low)</option>
            </select>
          </div>
        </div>

        {/* 3. PRODUCT GRID */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-amber-200/80 max-w-md mx-auto mb-16 shadow-sm">
            <Droplet className="w-12 h-12 text-amber-500 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-black text-[#1A2E46] mb-2">No Products Found</h3>
            <p className="text-xs text-slate-600 font-medium mb-6">
              We couldn't find any oil matching "{searchTerm}". Try clearing your search or filter.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="px-6 py-2.5 bg-[#1A2E46] text-white rounded-xl text-xs font-extrabold shadow-md hover:bg-amber-800 transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* 4. TRUST / QUALITY SECTION */}
        <section className="bg-gradient-to-r from-[#1A2E46] via-slate-900 to-amber-950 text-white rounded-3xl p-8 md:p-10 mb-16 shadow-xl border border-amber-900/20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:bg-[#EA660C] group-hover:text-white transition-all shrink-0">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm md:text-base text-white leading-tight">100% Natural</h4>
                <p className="text-xs text-amber-200/80 font-medium">Pure seeds & copra</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:bg-[#EA660C] group-hover:text-white transition-all shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm md:text-base text-white leading-tight">No Preservatives</h4>
                <p className="text-xs text-amber-200/80 font-medium">Traditional unrefined process</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:bg-[#EA660C] group-hover:text-white transition-all shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm md:text-base text-white leading-tight">Traditional / Cold Pressed</h4>
                <p className="text-xs text-amber-200/80 font-medium">Chekku low-temp extraction</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:bg-[#EA660C] group-hover:text-white transition-all shrink-0">
                <PackageCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm md:text-base text-white leading-tight">Premium Quality</h4>
                <p className="text-xs text-amber-200/80 font-medium">FSSAI certified facility</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. PROMOTIONAL BANNER */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-100 via-amber-50 to-white border border-amber-900/10 p-8 md:p-12 mb-16 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[#EA660C] font-black text-xs uppercase tracking-widest block">
                Family Nutrition First
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#1A2E46] leading-tight">
                Healthy Cooking.<br />Happier Families.
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl font-medium">
                Bring home the goodness of nature with Jumbo Trades edible oils. Extracted under stringent quality standards to ensure 100% natural aroma and nutrient retention.
              </p>
              <div className="pt-2 flex flex-wrap gap-3 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-amber-200/80 shadow-sm">
                  <Leaf className="w-4 h-4 text-amber-700" />
                  <span>100% Natural</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-amber-200/80 shadow-sm">
                  <Award className="w-4 h-4 text-amber-700" />
                  <span>No Preservatives</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-amber-200/80 shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>Hygienic Process</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3] relative border border-amber-200/60">
                <img 
                  src={goodnessBgImg} 
                  alt="Jumbo Trades Edible Oil Goodness"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E46]/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                  <span className="text-xs font-black uppercase tracking-widest text-amber-300">
                    Jumbo Trades Pure Oils
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Shop;

