import React, { useState } from 'react';

const VariantSelector = ({ variants, selectedVariant, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {variants.map((variant) => (
        <button
          key={variant.id}
          type="button"
          onClick={() => onSelect(variant)}
          className={`px-3 py-1.5 text-sm font-medium rounded-md border transition-all duration-200 ${
            selectedVariant.id === variant.id
              ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
              : 'border-gray-200 bg-white text-gray-600 hover:border-brand-gold/50 hover:bg-gray-50'
          }`}
        >
          {variant.size}
        </button>
      ))}
    </div>
  );
};

export default VariantSelector;
