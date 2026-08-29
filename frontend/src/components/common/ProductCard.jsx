import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { useTheme } from '../../context/ThemeContext';
import { ShoppingBag, Heart, Eye, Check, Star, FileText } from 'lucide-react';

export const ProductCard = ({ product, className = '' }) => {
  const { addToCart, isWishlisted, toggleWishlist, openQuickView } = useShop();
  const { isDark } = useTheme();
  const [isAdded, setIsAdded] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const cardRef = useRef(null);

  const wishlisted = isWishlisted(product.id);

  const handleMouseMove = (e) => {
    // Disable 3D tilt on mobile/touch screens
    if (window.innerWidth < 768 || window.matchMedia('(hover: none)').matches) return;

    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Very subtle clamped tilt (max 4 degrees)
    const rotateX = ((centerY - y) / centerY) * 4;
    const rotateY = ((x - centerX) / centerX) * 4;

    setTilt({ rotateX, rotateY, scale: 1.012 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const secondaryImage =
    product.images && product.images.length > 1 ? product.images[1] : null;

  const productUrl = `/product/${product.slug || product.id}`;

  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
      )
    : 0;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 h-full flex flex-col ${className}`}
    >
      <div
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
          transition:
            tilt.scale === 1
              ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease'
              : 'transform 0.12s ease-out, box-shadow 0.12s ease-out',
        }}
        className={`group flex flex-col h-full border shadow-sm hover:shadow-xl preserve-3d transition-all duration-300 overflow-hidden ${
          isDark
            ? 'bg-[#1B2630] border-white/10 hover:border-[#C9A45C]/70 hover:shadow-black/40 text-white'
            : 'bg-white border-black/10 hover:border-[#B08B43]/70 hover:shadow-black/15 text-[#101820]'
        }`}
      >
        {/* 1. FIXED IMAGE CONTAINER (Consistent Aspect Ratio) */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EFECE6] dark:bg-[#141E28] flex-shrink-0 select-none">
          <Link to={productUrl} className="block w-full h-full">
            {/* Primary Image */}
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className={`w-full h-full object-cover object-center transition-all duration-700 ease-out filter brightness-95 group-hover:brightness-100 ${
                secondaryImage
                  ? 'group-hover:opacity-0 group-hover:scale-106'
                  : 'group-hover:scale-106'
              }`}
            />

            {/* Secondary Image for Hover Flip */}
            {secondaryImage && (
              <img
                src={secondaryImage}
                alt={`${product.name} alternate view`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-106 filter brightness-100"
              />
            )}
          </Link>

          {/* Badges Container */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            {product.prescriptionRequired && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-950/90 backdrop-blur-md border border-amber-500/50 text-[9px] uppercase tracking-wider text-amber-200 font-semibold shadow-md">
                <FileText className="w-2.5 h-2.5" />
                <span>Rx Required</span>
              </span>
            )}
            {product.isNew && (
              <span className="px-2 py-0.5 bg-[#101820]/90 backdrop-blur-md border border-[#C9A45C]/40 text-[9px] uppercase tracking-widest text-[#C9A45C] font-semibold">
                NEW
              </span>
            )}
            {hasDiscount && (
              <span className="px-2 py-0.5 bg-rose-950/90 backdrop-blur-md border border-rose-500/40 text-[9px] uppercase tracking-widest text-rose-200 font-medium">
                -{discountPercent}%
              </span>
            )}
          </div>

          {/* Action Buttons Top Right: Wishlist & Quick View */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
            {/* Wishlist Button */}
            <button
              onClick={handleWishlistToggle}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md border shadow-sm cursor-pointer ${
                wishlisted
                  ? 'bg-white text-[#C9A45C] border-[#C9A45C] opacity-100 scale-105'
                  : 'bg-white/90 text-[#101820] border-black/10 hover:text-[#C9A45C] hover:bg-white hover:scale-110 sm:opacity-0 sm:group-hover:opacity-100 opacity-100'
              }`}
              aria-label={
                wishlisted
                  ? `Remove ${product.name} from wishlist`
                  : `Add ${product.name} to wishlist`
              }
            >
              <Heart
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  wishlisted ? 'fill-[#C9A45C] scale-110 text-[#C9A45C]' : ''
                }`}
              />
            </button>

            {/* Quick View Button */}
            <button
              onClick={handleQuickViewClick}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md border bg-white/90 text-[#101820] border-black/10 hover:text-[#C9A45C] hover:bg-white hover:scale-110 sm:opacity-0 sm:group-hover:opacity-100 opacity-100 shadow-sm cursor-pointer"
              aria-label={`Quick view ${product.name}`}
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart Overlay (Desktop hover slide-up) */}
          <div className="absolute inset-x-3 bottom-3 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 transform sm:translate-y-2 sm:group-hover:translate-y-0 z-10 hidden sm:block">
            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`btn-shine w-full py-2.5 px-3 text-[11px] tracking-widest uppercase font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg cursor-pointer ${
                isAdded
                  ? 'bg-emerald-700 text-white'
                  : isDark
                    ? 'bg-[#101820] hover:bg-[#C9A45C] text-[#F7F3EA] hover:text-[#101820]'
                    : 'bg-[#101820] hover:bg-[#B08B43] text-white hover:text-white'
              }`}
              aria-label={`Add ${product.name} to bag`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 2. UNIFORM CONTENT AREA (Consistent Height & Internal Alignment) */}
        <div className={`p-4 sm:p-5 flex flex-col flex-grow justify-between ${
          isDark ? 'bg-[#1B2630] text-white' : 'bg-white text-[#101820]'
        }`}>
          {/* Top content block */}
          <div className="space-y-1">
            {/* Brand and Rating Row (Fixed Height: h-5) */}
            <div className="h-5 flex items-center justify-between text-[10px] uppercase tracking-widest text-[#A9B0B5] dark:text-[#A9B0B5]">
              <span className="font-semibold text-[#C9A45C] truncate max-w-[65%]">
                {product.brand || product.category}
              </span>
              <div className="flex items-center gap-1 text-[#C9A45C] flex-shrink-0">
                <Star className="w-3 h-3 fill-[#C9A45C] text-[#C9A45C]" />
                <span className={`font-semibold text-[11px] ${
                  isDark ? 'text-white' : 'text-[#101820]'
                }`}>
                  {product.rating || '4.8'}
                </span>
              </div>
            </div>

            {/* Product Name (Strict Fixed Height for 2 lines: h-11) */}
            <div className="h-11 flex items-start">
              <Link
                to={productUrl}
                className={`font-serif text-sm sm:text-base font-semibold transition-colors line-clamp-2 leading-snug ${
                  isDark ? 'text-white hover:text-[#C9A45C]' : 'text-[#101820] hover:text-[#B08B43]'
                }`}
                title={product.name}
              >
                {product.name}
              </Link>
            </div>

            {/* Subcategory & Key Specification (Fixed Height: h-4) */}
            <div className={`h-4 text-[11px] flex items-center gap-1.5 truncate ${
              isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
            }`}>
              <span>{product.subcategory || product.category}</span>
              {product.ram && <span>• {product.ram}</span>}
              {product.dimensions && <span>• {product.dimensions}</span>}
              {product.form && <span>• {product.form}</span>}
              {product.volume && <span>• {product.volume}</span>}
              {product.material && !product.dimensions && <span>• {product.material}</span>}
            </div>
          </div>

          {/* Bottom content block (Pinned to bottom: mt-auto) */}
          <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/10">
            {/* Price and Swatches/Stock Row (Fixed Height: h-6) */}
            <div className="h-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-xs sm:text-sm font-semibold ${
                  isDark ? 'text-white' : 'text-[#101820]'
                }`}>
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="text-[11px] text-[#A9B0B5] line-through">
                    ₹{product.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              {/* Color Swatches or Stock indicator */}
              {product.colorHexes && product.colorHexes.length > 0 ? (
                <div className="flex items-center gap-1">
                  {product.colorHexes.slice(0, 3).map((col, idx) => (
                    <span
                      key={idx}
                      className="w-2.5 h-2.5 rounded-full border border-black/20"
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    />
                  ))}
                  {product.colorHexes.length > 3 && (
                    <span className="text-[9px] text-[#A9B0B5]">+{product.colorHexes.length - 3}</span>
                  )}
                </div>
              ) : (
                <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 border border-emerald-200 rounded-xs font-medium">
                  In Stock
                </span>
              )}
            </div>

            {/* Mobile Quick Add Button */}
            <div className="mt-3 sm:hidden">
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full py-2 text-[10px] tracking-widest uppercase font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  isAdded
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#101820] hover:bg-[#C9A45C] text-[#F7F3EA] hover:text-[#101820]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3 h-3" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
