import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, Award, Sparkles, CheckCircle2, Droplet, Info } from 'lucide-react';
import { products } from '../../data/products';

const ProductInformation = () => {
  return (
    <div className="pt-24 pb-20 bg-[#FDFBF7] min-h-screen font-sans">
      {/* Header Banner */}
      <section className="relative py-20 bg-[#1A2E46] text-white overflow-hidden mb-16 rounded-3xl mx-4 md:mx-6 shadow-lg border border-amber-900/20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A2E46] to-amber-950/40 pointer-events-none"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-4xl">
          <span className="inline-flex items-center justify-center gap-2 px-4 py-1.5 bg-amber-500/10 text-amber-300 font-bold text-xs uppercase tracking-[0.2em] rounded-full border border-amber-500/20 mb-6 backdrop-blur-md">
            <Info className="w-3.5 h-3.5" />
            Educational Oil Guide
          </span>
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-[#FDFBF7] drop-shadow-sm"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            Product Information Hub
          </h1>
          <p className="text-amber-50/80 text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            Understand how Jumbo Trades cold-presses, refines, and packages Coconut Oil, Groundnut Oil, and Gingelly Oil for maximum purity and natural aroma.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 space-y-20">
        {products.map((product, idx) => (
          <div 
            key={product.id}
            className="bg-white rounded-[2rem] p-6 md:p-12 lg:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center"
          >
            {/* Image Container - Using object-contain and large min-height to prevent cropping */}
            <div className={`lg:col-span-5 flex justify-center items-center h-full w-full ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="w-full bg-[#FAFAF9] rounded-[1.5rem] p-6 md:p-10 flex items-center justify-center border border-slate-100/50 shadow-sm transition-transform hover:scale-[1.02] duration-500 min-h-[400px] md:min-h-[550px]">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] max-h-[600px]"
                />
              </div>
            </div>

            {/* Content Container */}
            <div className={`lg:col-span-7 space-y-8 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div>
                <span className="text-amber-600 font-bold text-xs md:text-sm uppercase tracking-[0.15em] block mb-3">
                  {product.tagline}
                </span>
                <h2 
                  className="text-3xl md:text-5xl font-black text-[#1A2E46] mb-5"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  {product.name}
                </h2>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                  {product.description}
                </p>
              </div>

              {/* Grid Specs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FAFAF9] p-6 md:p-8 rounded-2xl border border-slate-100">
                <div>
                  <h4 className="font-bold text-[#1A2E46] mb-2 flex items-center gap-2 text-sm md:text-base">
                    <Leaf className="w-5 h-5 text-amber-600" />
                    <span>Ingredients</span>
                  </h4>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">{product.ingredients.join(', ')}</p>
                </div>

                <div>
                  <h4 className="font-bold text-[#1A2E46] mb-2 flex items-center gap-2 text-sm md:text-base">
                    <Droplet className="w-5 h-5 text-amber-600" />
                    <span>Culinary Usage</span>
                  </h4>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">{product.usage}</p>
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="font-bold text-[#1A2E46] text-sm md:text-base mb-4 uppercase tracking-wider">Key Quality Benefits</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm md:text-base text-slate-700">
                  {product.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed"><strong className="text-[#1A2E46]">{b.title}:</strong> {b.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="pt-6 flex flex-col sm:flex-row sm:items-center gap-5 border-t border-slate-100">
                <Link 
                  to={`/product-information/${product.id}`}
                  className="inline-flex justify-center items-center gap-2 bg-[#1A2E46] hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <span>View Details & Buy</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="text-sm font-semibold text-slate-500 bg-slate-50 px-4 py-3 rounded-lg border border-slate-200 inline-block text-center sm:text-left">
                  Available: <span className="text-slate-700">500ml, 1L, 2L, 5L, 15L</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductInformation;
