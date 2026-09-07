import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  Leaf, 
  Sparkles, 
  PackageCheck, 
  Truck, 
  Droplet,
  Award,
  Heart
} from 'lucide-react';
import { products } from '../../data/products';
import ProductCard from '../../components/customer/ProductCard';

import jumboOilsImg from '../../assets/jumbo_trades_oils.jpg';
import goodnessBgImg from '../../assets/goodness_oil_bg.jpg';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-amber-50/20 font-sans text-slate-800">
      {/* ==================================================
          1. HERO SECTION (100% FULL-WIDTH BACKGROUND BANNER)
         ================================================== */}
      <section className="hero relative w-full pt-20 md:pt-24 pb-8 md:pb-12 overflow-hidden bg-[#FAF5EC] border-b border-amber-900/10 min-h-[500px] md:min-h-[540px] lg:min-h-[580px] flex items-center">
        
        {/* Full-Bleed 100% Edge-to-Edge Single Background Layer */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img 
            src={jumboOilsImg} 
            alt="Jumbo Trades Coconut, Sunflower and Gingelly Oils" 
            className="w-full h-full object-contain md:object-contain object-right block"
            loading="eager"
          />
          {/* Subtle Left Fade Overlay ONLY for text contrast (Image remains visible underneath!) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF5EC]/95 via-[#FAF5EC]/70 via-35% to-transparent w-full md:w-[60%] lg:w-[48%] h-full pointer-events-none"></div>
        </div>

        {/* Hero Text Overlay Container sitting ON TOP of the full-width background image */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 flex items-center w-full">
          <div className="max-w-md lg:max-w-lg space-y-3.5 md:space-y-4 text-left">
            {/* Tagline */}
            <div className="inline-block text-amber-800 font-extrabold text-xs uppercase tracking-widest">
              PREMIUM EDIBLE OILS
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
              Pure Taste.<br />
              <span className="text-slate-900">Trusted Quality.</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-700 max-w-md leading-relaxed font-medium">
              Premium edible oils crafted with care for every kitchen. Natural. Healthy. Traditional.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link 
                to="/shop" 
                className="px-7 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-extrabold text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/product-information" 
                className="px-7 py-3 bg-white/90 text-amber-900 border-2 border-amber-800/40 hover:border-amber-800 rounded-full font-extrabold text-sm hover:bg-amber-50 transition-all duration-300 shadow-sm"
              >
                Explore Products
              </Link>
            </div>

            {/* Trust Features Strip */}
            <div className="pt-4 border-t border-amber-900/10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md">
              <div className="flex flex-col items-start text-left group">
                <div className="w-9 h-9 rounded-full bg-amber-100/90 border border-amber-300/80 flex items-center justify-center text-amber-800 mb-1 shadow-sm group-hover:scale-110 transition-transform">
                  <Leaf className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-xs text-slate-900 leading-tight">100% Natural</span>
                <span className="text-[10px] text-slate-600 font-medium">Pure seeds & copra</span>
              </div>

              <div className="flex flex-col items-start text-left group">
                <div className="w-9 h-9 rounded-full bg-amber-100/90 border border-amber-300/80 flex items-center justify-center text-amber-800 mb-1 shadow-sm group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-xs text-slate-900 leading-tight">Hygienic Processing</span>
                <span className="text-[10px] text-slate-600 font-medium">FSSAI certified</span>
              </div>

              <div className="flex flex-col items-start text-left group">
                <div className="w-9 h-9 rounded-full bg-amber-100/90 border border-amber-300/80 flex items-center justify-center text-amber-800 mb-1 shadow-sm group-hover:scale-110 transition-transform">
                  <PackageCheck className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-xs text-slate-900 leading-tight">Multiple Pack Sizes</span>
                <span className="text-[10px] text-slate-600 font-medium">500ml to 15L</span>
              </div>

              <div className="flex flex-col items-start text-left group">
                <div className="w-9 h-9 rounded-full bg-amber-100/90 border border-amber-300/80 flex items-center justify-center text-amber-800 mb-1 shadow-sm group-hover:scale-110 transition-transform">
                  <Truck className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-xs text-slate-900 leading-tight">All India Delivery</span>
                <span className="text-[10px] text-slate-600 font-medium">Safe shipping</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          3. TRUST FEATURE STRIP
         ================================================== */}
      <section className="py-8 bg-gradient-to-r from-amber-900 via-amber-800 to-slate-900 text-white shadow-md relative z-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {/* Feature 1 */}
            <div className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:bg-amber-500 group-hover:text-white transition-all shrink-0">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm md:text-base text-white leading-tight">100% Natural</h4>
                <p className="text-xs text-amber-200/80 font-medium">Pure seeds & copra</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:bg-amber-500 group-hover:text-white transition-all shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm md:text-base text-white leading-tight">Hygienic Processing</h4>
                <p className="text-xs text-amber-200/80 font-medium">Automated FSSAI facility</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:bg-amber-500 group-hover:text-white transition-all shrink-0">
                <PackageCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm md:text-base text-white leading-tight">Multiple Pack Sizes</h4>
                <p className="text-xs text-amber-200/80 font-medium">500ml up to 15L tins</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:bg-amber-500 group-hover:text-white transition-all shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm md:text-base text-white leading-tight">All-India Delivery</h4>
                <p className="text-xs text-amber-200/80 font-medium">Safe doorstep shipping</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          4. OUR PREMIUM OILS
         ================================================== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-amber-800 font-extrabold tracking-widest uppercase text-xs block">
              PURE & NATURAL SELECTION
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              OUR PREMIUM OILS
            </h2>
            <p className="text-base text-slate-600 font-medium">
              Three natural oils. Endless possibilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          5. WHY CHOOSE JUMBO TRADES?
         ================================================== */}
      <section className="py-20 bg-gradient-to-b from-amber-50/50 via-white to-amber-50/40 border-y border-amber-900/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-amber-800 font-extrabold uppercase tracking-widest text-xs block">
              OUR UNCOMPROMISING STANDARDS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              WHY CHOOSE JUMBO TRADES?
            </h2>
            <p className="text-sm md:text-base text-slate-600 font-medium">
              Crafted with authentic tradition and backed by modern quality assurance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { 
                icon: Leaf, 
                title: "Natural Ingredients", 
                desc: "100% pure raw coconuts, golden sunflower seeds & sesame." 
              },
              { 
                icon: Award, 
                title: "Hygienic Manufacturing", 
                desc: "Automated FSSAI-guided processing lines without touch contamination." 
              },
              { 
                icon: PackageCheck, 
                title: "Carefully Packed", 
                desc: "Leak-proof food-grade bottles & heavy duty canisters." 
              },
              { 
                icon: ShieldCheck, 
                title: "Trusted Quality", 
                desc: "Rigorous batch lab tests for acid values and pure aroma." 
              },
              { 
                icon: Heart, 
                title: "Customer First", 
                desc: "Transparent pricing, quick resolution, and doorstep support." 
              }
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-3xl p-6 text-center border border-amber-200/80 hover:border-amber-600 hover:shadow-xl transition-all duration-300 group flex flex-col items-center justify-between"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-200/60 rounded-2xl flex items-center justify-center text-amber-800 shadow-inner mb-5 group-hover:scale-110 group-hover:bg-amber-800 group-hover:text-white transition-all">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-2 leading-snug">{feature.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed font-normal">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          6. GOODNESS IN EVERY DROP (PROMOTIONAL SECTION)
         ================================================== */}
      <section className="relative py-28 bg-slate-950 text-white overflow-hidden">
        {/* Background Oil Visual */}
        <div className="absolute inset-0 opacity-40 mix-blend-luminosity">
          <img 
            src={goodnessBgImg} 
            alt="Golden edible oil stream background visual" 
            className="w-full h-full object-cover filter brightness-110 saturate-150"
            loading="lazy"
          />
        </div>
        
        {/* Dark Golden Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-amber-950/80"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl space-y-6">
          <div className="inline-block py-1.5 px-4 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-widest border border-amber-500/30">
            PREMIUM PROMISE
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
            GOODNESS IN EVERY DROP
          </h2>

          <p className="text-lg sm:text-xl text-amber-100 max-w-2xl mx-auto font-medium leading-relaxed">
            Pure edible oils made for everyday cooking.
          </p>

          <div className="pt-4">
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white px-10 py-5 rounded-full font-black text-lg shadow-2xl hover:scale-105 transition-all duration-300 border border-amber-500/40"
            >
              <span>SHOP OUR OILS</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
