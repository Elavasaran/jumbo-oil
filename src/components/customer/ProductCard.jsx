import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  
  // Default to 1L variant or first variant
  const defaultVarIndex = product.variants.findIndex(v => v.size === '1 L') !== -1 
    ? product.variants.findIndex(v => v.size === '1 L') 
    : 0;

  const [selectedVariant, setSelectedVariant] = useState(product.variants[defaultVarIndex] || product.variants[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedVariant, quantity);
    showToast(`Added Jumbo Trades ${product.name} (${selectedVariant.size}) x${quantity} to cart!`, 'cart');
  };

  return (
    <div className="group bg-white rounded-3xl border border-amber-900/10 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full relative">
      {/* Product Image Container */}
      <Link 
        to={`/product-information/${product.slug || product.id}`}
        className="relative aspect-[4/3] bg-gradient-to-b from-amber-50/60 via-amber-100/30 to-white overflow-hidden flex items-center justify-center p-4 block group"
      >
        <img 
          src={product.image} 
          alt={`Jumbo Trades ${product.name}`}
          className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-700 drop-shadow-md"
          loading="lazy"
        />
        
        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-extrabold text-slate-800 shadow-sm flex items-center gap-1 border border-amber-200/60">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>{product.rating || '4.9'}</span>
        </div>

        {/* Stock Badge */}
        <div className="absolute top-3 right-3 bg-amber-900/90 text-amber-100 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase border border-amber-700/50 shadow-sm">
          100% Pure
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow bg-white">
        <Link 
          to={`/product-information/${product.slug || product.id}`}
          className="group-hover:text-amber-800 transition-colors"
        >
          <h3 className="text-xl font-black text-slate-900 leading-snug mb-2 group-hover:text-amber-800 transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-slate-600 line-clamp-2 mb-5 leading-relaxed flex-grow font-normal">
          {product.description}
        </p>

        {/* Available Sizes selector chips */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
            <span className="uppercase tracking-wider text-[11px] text-amber-900/80">Available Sizes</span>
            <span className="text-amber-700 font-mono text-[11px]">{selectedVariant.sku}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVariant(v)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all border ${
                  selectedVariant.id === v.id
                    ? 'bg-amber-800 text-white border-amber-900 shadow-md scale-105'
                    : 'bg-amber-50/50 text-slate-700 border-amber-200/60 hover:bg-amber-100/80 hover:text-amber-900'
                }`}
              >
                {v.size}
              </button>
            ))}
          </div>
        </div>

        {/* Price & View / Add to Cart Controls */}
        <div className="pt-4 border-t border-amber-100 flex items-center justify-between gap-3 mt-auto">
          <div>
            <span className="text-[10px] font-bold text-amber-900/60 block uppercase tracking-widest">Price</span>
            <div className="text-2xl font-black text-slate-900">
              ₹{selectedVariant.price}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Product CTA */}
            <Link
              to={`/product-information/${product.slug || product.id}`}
              className="bg-amber-50 hover:bg-amber-100 text-amber-900 px-3.5 py-2.5 rounded-xl font-bold text-xs border border-amber-200 transition-all flex items-center gap-1"
            >
              <span>View</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
            </Link>

            {/* Quick Add Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="bg-brand-navy hover:bg-amber-800 text-white p-2.5 rounded-xl font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center"
              aria-label={`Add ${product.name} to cart`}
              title="Add to Cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
