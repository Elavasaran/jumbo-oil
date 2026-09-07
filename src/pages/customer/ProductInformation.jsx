import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, Award, Sparkles, CheckCircle2, Droplet } from 'lucide-react';
import { products } from '../../data/products';

const ProductInformation = () => {
  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="relative py-16 bg-gradient-to-r from-brand-navy via-amber-950 to-brand-navy text-white overflow-hidden mb-12">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
          <span className="inline-block px-3.5 py-1 bg-amber-500/20 rounded-full text-amber-300 font-bold text-xs uppercase tracking-widest border border-amber-500/30 mb-3">
            Educational Oil Guide
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">
            Product Information Hub
          </h1>
          <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed">
            Understand how Jumbo Trades cold-presses, refines, and packages Coconut Oil, Sunflower Oil, and Gingelly Oil for maximum purity and natural aroma.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 space-y-16">
        {products.map((product, idx) => (
          <div 
            key={product.id}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200/80 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
          >
            {/* Image Left / Right Alternate */}
            <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-amber-50 p-2 shadow-md">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>

            {/* Info Content */}
            <div className={`lg:col-span-7 space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div>
                <span className="text-amber-800 font-bold text-xs uppercase tracking-wider block mb-1">
                  {product.tagline}
                </span>
                <h2 className="text-3xl font-black text-brand-navy mb-3">
                  {product.name}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Grid specs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200/60 text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                    <Leaf className="w-4 h-4 text-amber-700" />
                    <span>Ingredients</span>
                  </h4>
                  <p className="text-slate-600">{product.ingredients.join(', ')}</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                    <Droplet className="w-4 h-4 text-amber-700" />
                    <span>Culinary Usage</span>
                  </h4>
                  <p className="text-slate-600">{product.usage}</p>
                </div>
              </div>

              {/* Benefits list */}
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">Key Quality Benefits</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                  {product.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                      <span><strong>{b.title}:</strong> {b.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link 
                  to={`/product-information/${product.id}`}
                  className="inline-flex items-center gap-2 bg-brand-navy hover:bg-amber-800 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-sm transition-all"
                >
                  <span>View Details & Buy</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-xs font-bold text-slate-500">Available in 500ml, 1L, 2L, 5L, 15L</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductInformation;
