import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { useTheme } from '../../context/ThemeContext';
import { ShoppingBag, Heart, Eye, Check, Star, FileText } from 'lucide-react';

export const ProductCard = ({ product, className = '' }) => {
  const { addToCart, isWishlisted, toggleWishlist, openQuickView } = useShop();
  const { isDark } = useTheme();
  const [isAdded, setIsAdded] = useState(false);
  const [isHeartPopping, setIsHeartPopping] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1, imageX: 0, imageY: 0, mouseX: 50, mouseY: 50 });
  const cardRef = useRef(null);

  const wishlisted = isWishlisted(product.id);

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768 || window.matchMedia('(hover: none)').matches) return;

    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * 3.5;
    const rotateY = ((x - centerX) / centerX) * 3.5;

    const imageX = ((x - centerX) / centerX) * -4;
    const imageY = ((y - centerY) / centerY) * -4;

    const mouseX = Math.round((x / rect.width) * 100);
    const mouseY = Math.round((y / rect.height) * 100);

    setTilt({ rotateX, rotateY, scale: 1.015, imageX, imageY, mouseX, mouseY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1, imageX: 0, imageY: 0, mouseX: 50, mouseY: 50 });
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsHeartPopping(true);
    toggleWishlist(product.id);
    setTimeout(() => setIsHeartPopping(false), 450);
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
          '--mouse-x': `${tilt.mouseX}%`,
          '--mouse-y': `${tilt.mouseY}%`,
          transition:
            tilt.scale === 1
              ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.3s ease'
              : 'transform 0.1s ease-out, box-shadow 0.1s ease-out',
        }}
        className={`group flex flex-col h-full border shadow-sm hover:shadow-2xl preserve-3d transition-all duration-300 overflow-hidden ${
          isDark
            ? 'bg-[#1B2630] border-white/10 hover:border-[#C9A45C]/80 hover:shadow-[#C9A45C]/10 text-white'
            : 'bg-white border-black/10 hover:border-[#B08B43]/80 hover:shadow-[#B08B43]/15 text-[#101820]'
        }`}
      >
        {/* Dynamic Light Sheen Overlay */}
        <div className="card-sheen-overlay absolute inset-0 z-20 pointer-events-none" />

        {/* 1. FIXED IMAGE CONTAINER (Compact 1:1 Square Aspect Ratio with Parallax Depth) */}
        <div className="relative aspect-square w-full overflow-hidden bg-[#EFECE6] dark:bg-[#141E28] flex-shrink-0 select-none">
          <Link to={productUrl} className="block w-full h-full">
            {/* Primary Image */}
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              style={{
                transform: `translate3d(${tilt.imageX}px, ${tilt.imageY}px, 0) scale(${tilt.scale > 1 ? 1.06 : 1})`,
                transition: tilt.scale === 1 ? 'transform 0.5s ease-out' : 'transform 0.1s ease-out',
              }}
              className={`w-full h-full object-cover object-center filter brightness-95 group-hover:brightness-100 ${
                secondaryImage ? 'group-hover:opacity-0' : ''
              }`}
            />

            {/* Secondary Image for Hover Flip */}
            {secondaryImage && (
              <img
                src={secondaryImage}
                alt={`${product.name} alternate view`}
                loading="lazy"
                style={{
                  transform: `translate3d(${tilt.imageX}px, ${tilt.imageY}px, 0) scale(${tilt.scale > 1 ? 1.06 : 1})`,
                  transition: tilt.scale === 1 ? 'transform 0.5s ease-out' : 'transform 0.1s ease-out',
                }}
                className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 filter brightness-100"
              />
            )}
          </Link>

          {/* Badges Container */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
            {product.prescriptionRequired && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-amber-950/90 backdrop-blur-md border border-amber-500/50 text-[8px] uppercase tracking-wider text-amber-200 font-semibold shadow-xs">
                <FileText className="w-2 h-2" />
                <span>Rx Required</span>
              </span>
            )}
            {product.isNew && (
              <span className="px-1.5 py-0.5 bg-[#101820]/90 backdrop-blur-md border border-[#C9A45C]/40 text-[8px] uppercase tracking-widest text-[#C9A45C] font-semibold">
                NEW
              </span>
            )}
            {hasDiscount && (
              <span className="px-1.5 py-0.5 bg-rose-950/90 backdrop-blur-md border border-rose-500/40 text-[8px] uppercase tracking-widest text-rose-200 font-medium">
                -{discountPercent}%
              </span>
            )}
          </div>

          {/* Action Buttons Top Right: Wishlist & Quick View with 3D Pop */}
          <div className="absolute top-2 right-2 flex flex-col gap-1.5 z-10">
            {/* Wishlist Button */}
            <button
              onClick={handleWishlistToggle}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md border shadow-sm cursor-pointer ${
                isHeartPopping ? 'animate-heart-pop' : ''
              } ${
                wishlisted
                  ? 'bg-white text-[#C9A45C] border-[#C9A45C] opacity-100 scale-105 shadow-[#C9A45C]/20'
                  : 'bg-white/90 text-[#101820] border-black/10 hover:text-[#C9A45C] hover:bg-white hover:scale-110 sm:opacity-0 sm:group-hover:opacity-100 opacity-100'
              }`}
              aria-label={
                wishlisted
                  ? `Remove ${product.name} from wishlist`
                  : `Add ${product.name} to wishlist`
              }
            >
              <Heart
                className={`w-3 h-3 transition-transform duration-200 ${
                  wishlisted ? 'fill-[#C9A45C] scale-110 text-[#C9A45C]' : ''
                }`}
              />
            </button>

            {/* Quick View Button */}
            <button
              onClick={handleQuickViewClick}
              className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md border bg-white/90 text-[#101820] border-black/10 hover:text-[#C9A45C] hover:bg-white hover:scale-110 sm:opacity-0 sm:group-hover:opacity-100 opacity-100 shadow-sm cursor-pointer"
              aria-label={`Quick view ${product.name}`}
            >
              <Eye className="w-3 h-3" />
            </button>
          </div>

          {/* Add to Cart Overlay (Desktop hover slide-up) */}
          <div className="absolute inset-x-2.5 bottom-2.5 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 transform sm:translate-y-2 sm:group-hover:translate-y-0 z-10 hidden sm:block">
            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`btn-shine w-full py-2 px-2.5 text-[10px] tracking-wider uppercase font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 shadow-md cursor-pointer ${
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

        {/* 2. UNIFORM COMPACT CONTENT AREA (Strict Equal Heights) */}
        <div className={`p-3 sm:p-3.5 flex flex-col flex-grow justify-between ${
          isDark ? 'bg-[#1B2630] text-white' : 'bg-white text-[#101820]'
        }`}>
          {/* Top content block */}
          <div className="space-y-1">
            {/* Brand and Rating Row (Fixed Height: h-4) */}
            <div className="h-4 flex items-center justify-between text-[9px] sm:text-[10px] uppercase tracking-wider text-[#A9B0B5]">
              <span className="font-semibold text-[#C9A45C] truncate max-w-[65%]">
                {product.brand || product.category}
              </span>
              <div className="flex items-center gap-0.5 text-[#C9A45C] flex-shrink-0">
                <Star className="w-2.5 h-2.5 fill-[#C9A45C] text-[#C9A45C]" />
                <span className={`font-semibold text-[10px] sm:text-[11px] ${
                  isDark ? 'text-white' : 'text-[#101820]'
                }`}>
                  {product.rating || '4.8'}
                </span>
              </div>
            </div>

            {/* Product Name (Strict Fixed Height for 2 lines: h-8 sm:h-9) */}
            <div className="h-8 sm:h-9 flex items-start">
              <Link
                to={productUrl}
                className={`font-serif text-xs sm:text-[13px] font-medium transition-colors line-clamp-2 leading-tight ${
                  isDark ? 'text-white hover:text-[#C9A45C]' : 'text-[#101820] hover:text-[#B08B43]'
                }`}
                title={product.name}
              >
                {product.name}
              </Link>
            </div>

            {/* Subcategory & Key Specification (Fixed Height: h-3.5) */}
            <div className={`h-3.5 text-[10px] flex items-center gap-1 truncate ${
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
          <div className="mt-2.5 pt-2 border-t border-black/5 dark:border-white/10">
            {/* Price and Swatches/Stock Row (Fixed Height: h-5) */}
            <div className="h-5 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className={`text-xs sm:text-[13px] font-semibold ${
                  isDark ? 'text-white' : 'text-[#101820]'
                }`}>
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="text-[10px] text-[#A9B0B5] line-through">
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
                      className="w-2 h-2 rounded-full border border-black/20"
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    />
                  ))}
                  {product.colorHexes.length > 3 && (
                    <span className="text-[8px] text-[#A9B0B5]">+{product.colorHexes.length - 3}</span>
                  )}
                </div>
              ) : (
                <span className="text-[9px] text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-1 py-0.5 rounded-xs font-medium">
                  In Stock
                </span>
              )}
            </div>

            {/* Mobile Quick Add Button */}
            <div className="mt-2 sm:hidden">
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full py-1.5 text-[9px] tracking-wider uppercase font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                  isAdded
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#101820] hover:bg-[#C9A45C] text-[#F7F3EA] hover:text-[#101820]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-2.5 h-2.5" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-2.5 h-2.5" />
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
