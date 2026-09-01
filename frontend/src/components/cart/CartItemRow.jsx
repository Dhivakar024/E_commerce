import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Heart, AlertCircle, Zap } from 'lucide-react';

export const CartItemRow = ({
  item,
  onUpdateQuantity,
  onRemove,
  onMoveToWishlist,
}) => {
  const { product, quantity, selectedSize, selectedColor } = item;
  const productUrl = `/product/${product?.slug || product?.id}`;
  const price = product?.price ?? item.price ?? 0;
  const stock = product?.stock ?? 99;
  const itemTotal = price * quantity;

  const isOutOfStock = stock <= 0;
  const isMaxStockReached = quantity >= stock;
  const isLowStock = stock > 0 && stock <= 6;

  return (
    <div className="py-6 sm:py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border-b border-black/10 dark:border-white/10 last:border-b-0">
      {/* 1. Thumbnail & Product Details */}
      <div className="flex items-center gap-4 sm:gap-6 min-w-0 flex-grow">
        <Link
          to={productUrl}
          className="w-20 h-24 sm:w-24 sm:h-28 overflow-hidden bg-neutral-100 dark:bg-[#151F28] border border-black/10 dark:border-white/10 flex-shrink-0 hover:border-[#C9A45C] transition-colors group"
        >
          <img
            src={product?.image || item.image}
            alt={product?.name || item.name}
            className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        <div className="space-y-1.5 min-w-0 flex-grow">
          <span className="text-[10px] uppercase tracking-widest text-[#C9A45C] block font-semibold">
            {product?.category}
          </span>
          <Link
            to={productUrl}
            className="font-serif text-base sm:text-lg text-[#101820] dark:text-[#F7F3EA] font-semibold hover:text-[#C9A45C] transition-colors block truncate"
          >
            {product?.name || item.name}
          </Link>

          <div className="text-xs text-[#4A5560] dark:text-[#A9B0B5] flex items-center gap-3 flex-wrap">
            <span>
              Color: <strong className="text-[#101820] dark:text-[#F7F3EA] font-medium">{selectedColor || 'Default'}</strong>
            </span>
            <span>•</span>
            <span>
              Size: <strong className="text-[#101820] dark:text-[#F7F3EA] font-medium">{selectedSize || 'Standard'}</strong>
            </span>
          </div>

          {/* Unit Price */}
          <div className="text-xs text-[#101820] dark:text-[#F7F3EA] font-semibold pt-0.5">
            ₹{price.toLocaleString('en-IN')} each
          </div>

          {/* Stock warnings */}
          {isOutOfStock && (
            <div className="flex items-center gap-1 text-[11px] text-rose-600 dark:text-rose-400 font-semibold">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Currently Out of Stock</span>
            </div>
          )}
          {isLowStock && !isOutOfStock && (
            <div className="flex items-center gap-1 text-[11px] text-amber-700 dark:text-amber-400 font-medium">
              <Zap className="w-3 h-3" />
              <span>Only {stock} units left in stock</span>
            </div>
          )}
        </div>
      </div>

      {/* 2. Quantity Selector, Total & Actions */}
      <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-6 sm:gap-8 self-stretch sm:self-center">
        {/* Quantity Controls */}
        <div className="flex flex-col items-center">
          <div className="flex items-center border border-black/15 dark:border-white/15 bg-neutral-100 dark:bg-[#151F28] h-10 w-28 shadow-sm">
            <button
              type="button"
              onClick={() => onUpdateQuantity(quantity - 1)}
              disabled={quantity <= 1}
              className="w-8 h-full flex items-center justify-center text-[#101820] dark:text-[#F7F3EA] hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 transition-colors"
              aria-label={`Decrease quantity of ${product?.name}`}
            >
              -
            </button>
            <span className="flex-grow text-center text-xs font-semibold text-[#101820] dark:text-[#F7F3EA]">{quantity}</span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(quantity + 1)}
              disabled={isMaxStockReached || isOutOfStock}
              className="w-8 h-full flex items-center justify-center text-[#101820] dark:text-[#F7F3EA] hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 transition-colors"
              aria-label={`Increase quantity of ${product?.name}`}
            >
              +
            </button>
          </div>

          {isMaxStockReached && !isOutOfStock && (
            <span className="text-[9px] text-[#717D86] dark:text-[#A9B0B5] mt-1">Max available</span>
          )}
        </div>

        {/* Item Total */}
        <div className="text-right min-w-[90px]">
          <span className="font-serif text-base sm:text-lg text-[#101820] dark:text-[#C9A45C] font-semibold block">
            ₹{itemTotal.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Action Icons: Move to Wishlist & Remove */}
        <div className="flex items-center gap-1.5">
          {/* Move to Wishlist */}
          <button
            type="button"
            onClick={onMoveToWishlist}
            className="p-2 text-[#717D86] dark:text-[#A9B0B5] hover:text-[#C9A45C] hover:bg-black/5 dark:hover:bg-white/10 transition-colors rounded-full"
            title="Move to Wishlist"
            aria-label={`Move ${product?.name} to Wishlist`}
          >
            <Heart className="w-4 h-4" />
          </button>

          {/* Remove from Cart */}
          <button
            type="button"
            onClick={onRemove}
            className="p-2 text-[#717D86] dark:text-[#A9B0B5] hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors rounded-full"
            title="Remove Item"
            aria-label={`Remove ${product?.name} from cart`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
