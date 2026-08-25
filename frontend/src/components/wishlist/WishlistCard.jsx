import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { ShoppingBag, Heart, Eye, Check, Star, Trash2, FileText } from 'lucide-react';

export const WishlistCard = ({ product, onRemove, onMoveToBag, index = 0 }) => {
  const { openQuickView } = useShop();
  const [isRemoving, setIsRemoving] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768 || window.matchMedia('(hover: none)').matches) return;
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Gentle clamped 3D tilt
    const rotateX = ((centerY - y) / centerY) * 4.5;
    const rotateY = ((x - centerX) / centerX) * 4.5;

    setTilt({ rotateX, rotateY, scale: 1.015 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  };

  const handleRemoveClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRemoving(true);
    setTimeout(() => {
      onRemove(product.id);
    }, 280);
  };

  const handleMoveClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdded(true);
    onMoveToBag(product);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const secondaryImage = product.images && product.images.length > 1 ? product.images[1] : null;
  const productUrl = `/product/${product.slug || product.id}`;
  const categoryUpper = (product.category || 'MARKETPLACE').toUpperCase();

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 h-full flex flex-col transition-all duration-300 ${
        isRemoving ? 'opacity-0 scale-90 -translate-y-2 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        animationDelay: `${index * 60}ms`,
      }}
    >
      <div
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
          transition:
            tilt.scale === 1
              ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease'
              : 'transform 0.12s ease-out, box-shadow 0.12s ease-out',
        }}
        className="group flex flex-col h-full bg-white border border-black/10 hover:border-[#C9A45C]/70 shadow-sm hover:shadow-xl hover:shadow-black/20 preserve-3d transition-all duration-300 overflow-hidden"
      >
        {/* 1. FIXED IMAGE CONTAINER (Consistent Aspect Ratio & Category Fit) */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F7F3EA] flex-shrink-0 select-none">
          <Link to={productUrl} className="block w-full h-full">
            {/* Primary Image with smooth zoom */}
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className={`w-full h-full object-cover object-center transition-all duration-700 ease-out filter brightness-95 group-hover:brightness-100 ${
                secondaryImage
                  ? 'group-hover:opacity-0 group-hover:scale-105'
                  : 'group-hover:scale-105'
              }`}
            />

            {/* Secondary Image on hover */}
            {secondaryImage && (
              <img
                src={secondaryImage}
                alt={`${product.name} alternate view`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-105 filter brightness-100"
              />
            )}
          </Link>

          {/* Badges Container */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            {/* Category Tag */}
            <span className="px-2 py-0.5 bg-[#101820]/90 backdrop-blur-md border border-[#C9A45C]/40 text-[9px] uppercase tracking-widest text-[#C9A45C] font-semibold">
              {categoryUpper}
            </span>
            {product.prescriptionRequired && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-950/90 backdrop-blur-md border border-amber-500/50 text-[9px] uppercase tracking-wider text-amber-200 font-semibold shadow-md">
                <FileText className="w-2.5 h-2.5" />
                <span>Rx Required</span>
              </span>
            )}
            {hasDiscount && (
              <span className="px-2 py-0.5 bg-rose-950/90 backdrop-blur-md border border-rose-500/40 text-[9px] uppercase tracking-widest text-rose-200 font-medium">
                -{discountPercent}%
              </span>
            )}
          </div>

          {/* Action Buttons Top Right: Remove & Quick View */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
            {/* Remove / Heart Button */}
            <button
              onClick={handleRemoveClick}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md border border-black/10 bg-white/95 text-[#C9A45C] hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 shadow-sm cursor-pointer hover:scale-110"
              aria-label={`Remove ${product.name} from wishlist`}
              title="Remove from wishlist"
            >
              <Heart className="w-3.5 h-3.5 fill-[#C9A45C] hover:fill-none transition-colors" />
            </button>

            {/* Quick View Button */}
            <button
              onClick={handleQuickViewClick}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md border border-black/10 bg-white/90 text-[#101820] hover:text-[#C9A45C] hover:bg-white hover:scale-110 sm:opacity-0 sm:group-hover:opacity-100 opacity-100 shadow-sm cursor-pointer"
              aria-label={`Quick view ${product.name}`}
              title="Quick view"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. UNIFORM CONTENT AREA (Consistent Height & Internal Alignment) */}
        <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-white text-[#101820]">
          {/* Top content block */}
          <div className="space-y-1">
            {/* Brand and Rating Row (Fixed Height: h-5) */}
            <div className="h-5 flex items-center justify-between text-[10px] uppercase tracking-widest text-[#A9B0B5]">
              <span className="font-semibold text-[#C9A45C] truncate max-w-[65%]">
                {product.brand || categoryUpper}
              </span>
              <div className="flex items-center gap-1 text-[#C9A45C] flex-shrink-0">
                <Star className="w-3 h-3 fill-[#C9A45C] text-[#C9A45C]" />
                <span className="text-[#101820] font-semibold text-[11px]">
                  {product.rating || '4.8'}
                </span>
              </div>
            </div>

            {/* Product Name (Strict Fixed Height for 2 lines: h-11) */}
            <div className="h-11 flex items-start">
              <Link
                to={productUrl}
                className="font-serif text-sm sm:text-base text-[#101820] font-semibold hover:text-[#C9A45C] transition-colors line-clamp-2 leading-snug"
                title={product.name}
              >
                {product.name}
              </Link>
            </div>

            {/* Subcategory & Key Specification (Fixed Height: h-4) */}
            <div className="h-4 text-[11px] text-[#A9B0B5] flex items-center gap-1.5 truncate">
              <span>{product.subcategory || product.category}</span>
              {product.ram && <span>• {product.ram}</span>}
              {product.dimensions && <span>• {product.dimensions}</span>}
              {product.form && <span>• {product.form}</span>}
              {product.volume && <span>• {product.volume}</span>}
              {product.material && !product.dimensions && <span>• {product.material}</span>}
            </div>
          </div>

          {/* Bottom content block (Pinned to bottom: mt-auto) */}
          <div className="mt-4 pt-3 border-t border-black/5 space-y-3">
            {/* Price Row (Fixed Height: h-6) */}
            <div className="h-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-semibold text-[#101820]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="text-[11px] text-[#A9B0B5] line-through">
                    ₹{product.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 border border-emerald-200 rounded-xs font-medium">
                In Stock
              </span>
            </div>

            {/* Move to Bag Action Button (Always aligned at bottom) */}
            <button
              type="button"
              onClick={handleMoveClick}
              disabled={isAdded}
              className={`btn-shine w-full py-2.5 px-3 text-[11px] tracking-widest uppercase font-semibold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                isAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#101820] hover:bg-[#C9A45C] text-[#F7F3EA] hover:text-[#101820]'
              }`}
              aria-label={`Move ${product.name} to bag`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Move to Bag</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
