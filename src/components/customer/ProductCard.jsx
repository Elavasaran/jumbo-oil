import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Plus, Minus, ArrowRight, Check, Zap } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart, buyNow } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  // Default to 1L variant or first variant
  const defaultVarIndex = product.variants.findIndex(v => v.size === '1 L') !== -1 
    ? product.variants.findIndex(v => v.size === '1 L') 
    : 0;

  const [selectedVariant, setSelectedVariant] = useState(product.variants[defaultVarIndex] || product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
  };

  const incrementQty = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity(prev => prev + 1);
  };

  const decrementQty = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const isOutOfStock = selectedVariant.stock === 0 || selectedVariant.status?.toLowerCase() === 'out of stock';

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isOutOfStock) {
      showToast(`Sorry, ${product.name} (${selectedVariant.size}) is currently out of stock.`, 'error');
      return;
    }
    
    addToCart(product, selectedVariant, quantity);
    showToast(`Added Jumbo Trades ${product.name} (${selectedVariant.size}) x${quantity} to cart!`, 'cart');
    
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock) {
      showToast(`Sorry, ${product.name} (${selectedVariant.size}) is currently out of stock.`, 'error');
      return;
    }

    buyNow(product, selectedVariant, quantity);
    navigate('/checkout');
  };

  return (
    <div className="group bg-white rounded-3xl border border-amber-900/10 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1.5 hover:border-amber-500/40 transition-all duration-300 flex flex-col h-full relative">
      {/* Product Image Container — Preserves full bottle view */}
      <Link 
        to={`/product-information/${product.slug || product.id}`}
        className="relative h-64 sm:h-72 bg-gradient-to-b from-[#FDFBF7] to-amber-50/30 overflow-hidden block group p-6 flex items-center justify-center border-b border-amber-100/60 shrink-0"
      >
        <img 
          src={product.image} 
          alt={`Jumbo Trades ${product.name}`}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 filter drop-shadow-md"
          loading="lazy"
        />
        
        {/* Rating Badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-slate-800 shadow-sm flex items-center gap-1 border border-amber-200/80">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
          <span>{product.rating || '4.9'}</span>
        </div>

        {/* Stock / Pure Badge */}
        <div className="absolute top-4 right-4 bg-[#1A2E46] text-amber-300 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wider uppercase border border-amber-500/30 shadow-sm">
          {selectedVariant.status || 'In Stock'}
        </div>
      </Link>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow bg-white space-y-4">
        {/* Category & Title */}
        <div>
          <div className="text-[10px] font-black text-[#EA660C] uppercase tracking-widest mb-1">
            {product.category || 'Edible Oil'}
          </div>
          <Link 
            to={`/product-information/${product.slug || product.id}`}
            className="group-hover:text-[#EA660C] transition-colors"
          >
            <h3 className="text-2xl font-black text-[#1A2E46] leading-tight group-hover:text-[#EA660C] transition-colors">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed flex-grow font-medium">
          {product.description}
        </p>

        {/* Size Selector */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
            <span className="uppercase tracking-wider text-[11px] text-[#1A2E46]/80 font-black">
              Available Sizes
            </span>
            <span className="text-amber-800 font-mono text-[11px] font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
              SKU: {selectedVariant.sku}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1.5">
            {product.variants.map((v) => {
              const isSelected = selectedVariant.id === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => handleVariantSelect(v)}
                  className={`py-1.5 px-1 text-xs font-extrabold rounded-xl transition-all duration-200 border text-center ${
                    isSelected
                      ? 'bg-[#1A2E46] text-amber-300 border-[#1A2E46] shadow-md scale-[1.03] ring-2 ring-amber-400/40'
                      : 'bg-stone-50 text-slate-700 border-slate-200/80 hover:bg-amber-50 hover:border-amber-300 hover:text-[#1A2E46]'
                  }`}
                >
                  {v.size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pricing, Quantity & Add to Cart Controls */}
        <div className="pt-4 border-t border-amber-100/80 space-y-3 mt-auto">
          {/* Price & Quantity Row */}
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-widest">
                Price ({selectedVariant.size})
              </span>
              <div className="text-2xl font-black text-[#1A2E46]">
                ₹{selectedVariant.price}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200 p-1">
              <button
                type="button"
                onClick={decrementQty}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-slate-700 hover:bg-amber-100 hover:text-amber-900 border border-slate-200/80 transition-all font-bold"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-8 text-center text-xs font-black text-[#1A2E46]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={incrementQty}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-slate-700 hover:bg-amber-100 hover:text-amber-900 border border-slate-200/80 transition-all font-bold"
                aria-label="Increase quantity"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex-1 py-3 rounded-xl font-extrabold text-xs shadow-md transition-all duration-300 flex items-center justify-center gap-2 ${
                isOutOfStock ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' :
                addedAnimation 
                  ? 'bg-emerald-700 text-white shadow-emerald-700/30'
                  : 'bg-white border border-[#1A2E46] text-[#1A2E46] hover:bg-slate-50'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`flex-1 py-3 rounded-xl font-extrabold text-xs shadow-md transition-all duration-300 flex items-center justify-center gap-2 ${
                isOutOfStock ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none' :
                'bg-[#EA660C] hover:bg-[#c95305] text-white shadow-[0_4px_14px_rgba(234,102,12,0.35)] hover:-translate-y-0.5'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Buy Now</span>
            </button>
          </div>
          <Link
            to={`/product-information/${product.slug || product.id}`}
            className="text-center text-[11px] font-bold text-slate-500 hover:text-[#EA660C] underline mt-1"
          >
            View Full Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
