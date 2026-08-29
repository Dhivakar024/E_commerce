import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { useTheme } from '../../context/ThemeContext';
import { ShoppingBag, Heart, Eye, Check, Star, FileText } from 'lucide-react';

export const WishlistCard = ({ product, onRemove, onMoveToBag, index = 0 }) => {
  const { openQuickView } = useShop();
  const { isDark } = useTheme();
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

    const rotateX = ((centerY - y) / centerY) * 3.5;
    const rotateY = ((x - centerX) / centerX) * 3.5;

    setTilt({ rotateX, rotateY, scale: 1.01 });
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
              : 'transform 0.1s ease-out, box-shadow 0.1s ease-out',
        }}
        className={`group flex flex-col h-full border shadow-sm hover:shadow-lg preserve-3d transition-all duration-300 overflow-hidden ${
          isDark
            ? 'bg-[#1B2630] border-white/10 hover:border-[#C9A45C]/70 hover:shadow-black/40 text-white'
            : 'bg-white border-black/10 hover:border-[#B08B43]/70 hover:shadow-black/10 text-[#101820]'
        }`}
      >
        {/* 1. FIXED IMAGE CONTAINER (Compact 1:1 Square) */}
        <div className="relative aspect-square w-full overflow-hidden bg-[#EFECE6] dark:bg-[#141E28] flex-shrink-0 select-none">
          <Link to={productUrl} className="block w-full h-full">
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
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
            <span className="px-1.5 py-0.5 bg-[#101820]/90 backdrop-blur-md border border-[#C9A45C]/40 text-[8px] uppercase tracking-widest text-[#C9A45C] font-semibold">
              {categoryUpper}
            </span>
            {product.prescriptionRequired && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-amber-950/90 backdrop-blur-md border border-amber-500/50 text-[8px] uppercase tracking-wider text-amber-200 font-semibold shadow-xs">
                <FileText className="w-2 h-2" />
                <span>Rx Required</span>
              </span>
            )}
            {hasDiscount && (
              <span className="px-1.5 py-0.5 bg-rose-950/90 backdrop-blur-md border border-rose-500/40 text-[8px] uppercase tracking-widest text-rose-200 font-medium">
                -{discountPercent}%
              </span>
            )}
          </div>

          {/* Action Buttons Top Right: Remove & Quick View */}
          <div className="absolute top-2 right-2 flex flex-col gap-1.5 z-10">
            <button
              onClick={handleRemoveClick}
              className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md border border-black/10 bg-white/95 text-[#C9A45C] hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 shadow-xs cursor-pointer hover:scale-105"
              aria-label={`Remove ${product.name} from wishlist`}
              title="Remove from wishlist"
            >
              <Heart className="w-3 h-3 fill-[#C9A45C] hover:fill-none transition-colors" />
            </button>

            <button
              onClick={handleQuickViewClick}
              className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md border border-black/10 bg-white/90 text-[#101820] hover:text-[#C9A45C] hover:bg-white hover:scale-105 sm:opacity-0 sm:group-hover:opacity-100 opacity-100 shadow-xs cursor-pointer"
              aria-label={`Quick view ${product.name}`}
              title="Quick view"
            >
              <Eye className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 2. UNIFORM CONTENT AREA */}
        <div className={`p-3 sm:p-3.5 flex flex-col flex-grow justify-between ${
          isDark ? 'bg-[#1B2630] text-white' : 'bg-white text-[#101820]'
        }`}>
          <div className="space-y-1">
            {/* Brand and Rating Row (Fixed Height: h-4) */}
            <div className="h-4 flex items-center justify-between text-[9px] sm:text-[10px] uppercase tracking-wider text-[#A9B0B5]">
              <span className="font-semibold text-[#C9A45C] truncate max-w-[65%]">
                {product.brand || categoryUpper}
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

          <div className="mt-2.5 pt-2 border-t border-black/5 dark:border-white/10 space-y-2">
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

              <span className="text-[9px] text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-1 py-0.5 rounded-xs font-medium">
                In Stock
              </span>
            </div>

            <button
              type="button"
              onClick={handleMoveClick}
              disabled={isAdded}
              className={`btn-shine w-full py-1.5 px-2.5 text-[10px] tracking-wider uppercase font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                isAdded
                  ? 'bg-emerald-700 text-white'
                  : isDark
                    ? 'bg-[#101820] hover:bg-[#C9A45C] text-[#F7F3EA] hover:text-[#101820]'
                    : 'bg-[#101820] hover:bg-[#B08B43] text-white hover:text-white'
              }`}
              aria-label={`Move ${product.name} to bag`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3 h-3" />
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
