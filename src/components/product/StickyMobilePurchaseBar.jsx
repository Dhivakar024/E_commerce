import React from 'react';
import { ShoppingBag, Check } from 'lucide-react';

export const StickyMobilePurchaseBar = ({
  product,
  onAddToCart,
  isAdded,
  selectedSize,
  selectedColor,
}) => {
  const isOutOfStock = product?.stock <= 0;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 bg-luxury-black/95 border-t border-white/15 px-4 py-3 z-40 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-3">
      {/* Left: Thumbnail & Info */}
      <div className="flex items-center gap-2.5 min-w-0">
        <img
          src={product?.image}
          alt={product?.name}
          className="w-10 h-12 object-cover border border-white/10 flex-shrink-0"
        />
        <div className="min-w-0">
          <span className="font-serif text-xs text-white font-medium truncate block">
            {product?.name}
          </span>
          <div className="flex items-center gap-1.5 text-[11px] text-luxury-muted">
            <span className="text-luxury-champagne font-medium">₹{product?.price?.toLocaleString('en-IN')}</span>
            <span>•</span>
            <span className="truncate">{selectedSize} / {selectedColor}</span>
          </div>
        </div>
      </div>

      {/* Right: Quick Add Button */}
      <button
        type="button"
        onClick={onAddToCart}
        disabled={isAdded || isOutOfStock}
        className={`flex-shrink-0 py-2.5 px-4 text-[11px] uppercase tracking-widest font-medium flex items-center gap-1.5 transition-all shadow-lg ${
          isOutOfStock
            ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
            : isAdded
            ? 'bg-emerald-700 text-white'
            : 'bg-white text-luxury-black hover:bg-luxury-champagne'
        }`}
      >
        {isOutOfStock ? (
          <span>Out of Stock</span>
        ) : isAdded ? (
          <>
            <Check className="w-3.5 h-3.5" />
            <span>Added</span>
          </>
        ) : (
          <>
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </>
        )}
      </button>
    </div>
  );
};
