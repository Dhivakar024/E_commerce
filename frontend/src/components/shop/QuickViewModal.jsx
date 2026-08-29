import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { useTheme } from '../../context/ThemeContext';
import { X, Star, ShoppingBag, Heart, ArrowRight, Check, FileText } from 'lucide-react';

export const QuickViewModal = () => {
  const { quickViewProduct, closeQuickView, addToCart, isWishlisted, toggleWishlist } = useShop();
  const { isDark } = useTheme();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [imageTilt, setImageTilt] = useState({ rotateX: 0, rotateY: 0 });

  const imageContainerRef = useRef(null);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(quickViewProduct.sizes?.[0] || 'Standard');
      setSelectedColor(quickViewProduct.colors?.[0] || 'Default');
      setSelectedImageIndex(0);
      setQuantity(1);
      setIsAdded(false);
      setImageTilt({ rotateX: 0, rotateY: 0 });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [quickViewProduct]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeQuickView();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeQuickView]);

  // Gentle 3D depth movement for product image on desktop
  const handleImageMouseMove = (e) => {
    if (window.innerWidth < 768 || window.matchMedia('(hover: none)').matches) return;
    const el = imageContainerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * 4.5;
    const rotateY = ((x - centerX) / centerX) * 4.5;

    setImageTilt({ rotateX, rotateY });
  };

  const handleImageMouseLeave = () => {
    setImageTilt({ rotateX: 0, rotateY: 0 });
  };

  if (!quickViewProduct) return null;

  const images = quickViewProduct.images && quickViewProduct.images.length > 0
    ? quickViewProduct.images
    : [quickViewProduct.image];

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const wishlisted = isWishlisted(quickViewProduct.id);

  const hasDiscount = quickViewProduct.compareAtPrice && quickViewProduct.compareAtPrice > quickViewProduct.price;
  const discountPercent = hasDiscount
    ? Math.round(((quickViewProduct.compareAtPrice - quickViewProduct.price) / quickViewProduct.compareAtPrice) * 100)
    : 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 transition-opacity animate-fade-in"
        onClick={closeQuickView}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 pointer-events-none">
        <div
          className={`relative w-full max-w-4xl max-h-[90vh] border overflow-y-auto shadow-2xl pointer-events-auto flex flex-col md:flex-row animate-mega-menu rounded-none ${
            isDark
              ? 'bg-[#101820] text-[#F7F3EA] border-white/15'
              : 'bg-[#F8F6F0] text-[#101820] border-black/15'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label={`Quick view: ${quickViewProduct.name}`}
        >
          {/* Close Button */}
          <button
            onClick={closeQuickView}
            className={`absolute top-4 right-4 z-20 p-2 rounded-full border transition-colors cursor-pointer ${
              isDark
                ? 'bg-black/60 hover:bg-black text-[#F7F3EA]/80 hover:text-white border-white/10'
                : 'bg-white/80 hover:bg-white text-[#101820]/80 hover:text-[#101820] border-black/10'
            }`}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Gallery with 3D Depth Hover (50% on Desktop) */}
          <div className={`md:w-1/2 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r ${
            isDark ? 'bg-[#1B2630]/60 border-white/10' : 'bg-white/70 border-black/10'
          }`}>
            <div
              ref={imageContainerRef}
              onMouseMove={handleImageMouseMove}
              onMouseLeave={handleImageMouseLeave}
              className="relative aspect-[4/5] overflow-hidden bg-neutral-900 mb-4 perspective-1000 select-none"
            >
              <img
                src={images[selectedImageIndex] || quickViewProduct.image}
                alt={quickViewProduct.name}
                style={{
                  transform: `rotateX(${imageTilt.rotateX}deg) rotateY(${imageTilt.rotateY}deg) scale(1.02)`,
                  transition: imageTilt.rotateX === 0 ? 'transform 0.4s ease' : 'transform 0.1s ease-out',
                }}
                className="w-full h-full object-cover object-center filter brightness-95"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
                <span className="px-2.5 py-0.5 bg-black/70 backdrop-blur-md border border-[#C9A45C]/30 text-[9px] uppercase tracking-widest text-[#C9A45C] font-semibold">
                  {quickViewProduct.category || 'Marketplace'}
                </span>
                {quickViewProduct.prescriptionRequired && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-950/90 backdrop-blur-md border border-amber-500/40 text-[9px] uppercase tracking-wider text-amber-200 font-semibold">
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
            </div>

            {/* Thumbnail Selectors */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-14 h-16 flex-shrink-0 overflow-hidden border transition-all cursor-pointer ${
                      selectedImageIndex === idx
                        ? 'border-[#C9A45C] ring-1 ring-[#C9A45C]'
                        : isDark ? 'border-white/15 opacity-60 hover:opacity-100' : 'border-black/15 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumb ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details & Purchase (50% on Desktop) */}
          <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category, Brand & Rating */}
              <div className={`flex items-center justify-between text-xs mb-2 ${
                isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
              }`}>
                <span className="uppercase tracking-widest text-[#C9A45C] font-semibold">
                  {quickViewProduct.brand || quickViewProduct.category}
                </span>
                {quickViewProduct.rating && (
                  <div className="flex items-center gap-1 text-[#C9A45C]">
                    <Star className="w-3.5 h-3.5 fill-[#C9A45C]" />
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-[#101820]'}`}>{quickViewProduct.rating}</span>
                  </div>
                )}
              </div>

              {/* Title */}
              <h2 className={`font-serif text-2xl sm:text-3xl font-normal mb-2 leading-tight ${
                isDark ? 'text-white' : 'text-[#101820]'
              }`}>
                {quickViewProduct.name}
              </h2>

              {/* Price & Discount */}
              <div className="flex items-center gap-3 mb-4">
                <span className="font-serif text-xl sm:text-2xl text-[#C9A45C] font-semibold">
                  ₹{quickViewProduct.price.toLocaleString('en-IN')}
                </span>
                {hasDiscount && (
                  <span className={`text-xs line-through ${
                    isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
                  }`}>
                    ₹{quickViewProduct.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className={`text-xs font-light leading-relaxed mb-6 line-clamp-3 ${
                isDark ? 'text-[#F7F3EA]/80' : 'text-[#4A5560]'
              }`}>
                {quickViewProduct.description}
              </p>

              {/* Color Swatches if applicable */}
              {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
                <div className="mb-4">
                  <span className={`text-xs uppercase tracking-widest block mb-2 font-medium ${
                    isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
                  }`}>
                    Color / Finish: <strong className={`font-normal ${isDark ? 'text-white' : 'text-[#101820]'}`}>{selectedColor}</strong>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.colors.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setSelectedColor(c)}
                        className={`px-3 py-1.5 text-xs uppercase tracking-wider border transition-all cursor-pointer ${
                          selectedColor === c
                            ? 'bg-[#C9A45C] text-[#101820] border-[#C9A45C] font-semibold'
                            : isDark
                              ? 'bg-white/5 text-white/80 border-white/15 hover:border-white/40'
                              : 'bg-white text-[#101820]/80 border-black/15 hover:border-black/40'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes / Options */}
              {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
                <div className="mb-6">
                  <span className={`text-xs uppercase tracking-widest block mb-2 font-medium ${
                    isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
                  }`}>
                    Options / Size: <strong className={`font-normal ${isDark ? 'text-white' : 'text-[#101820]'}`}>{selectedSize}</strong>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 text-xs uppercase tracking-wider border transition-all cursor-pointer ${
                          selectedSize === s
                            ? 'bg-[#C9A45C] text-[#101820] border-[#C9A45C] font-semibold'
                            : isDark
                              ? 'bg-white/5 text-white/80 border-white/15 hover:border-white/40'
                              : 'bg-white text-[#101820]/80 border-black/15 hover:border-black/40'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions: Add to Bag, Wishlist, View Full Details */}
            <div className={`space-y-4 pt-4 border-t ${
              isDark ? 'border-white/10' : 'border-black/10'
            }`}>
              <div className="flex items-center gap-3">
                {/* Quantity input */}
                <div className={`flex items-center border ${
                  isDark ? 'border-white/15 bg-white/5' : 'border-black/15 bg-white'
                }`}>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className={`w-9 h-11 flex items-center justify-center font-serif text-sm cursor-pointer ${
                      isDark ? 'text-white hover:text-[#C9A45C]' : 'text-[#101820] hover:text-[#B08B43]'
                    }`}
                  >
                    -
                  </button>
                  <span className={`w-10 text-center text-xs font-semibold ${
                    isDark ? 'text-white' : 'text-[#101820]'
                  }`}>
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className={`w-9 h-11 flex items-center justify-center font-serif text-sm cursor-pointer ${
                      isDark ? 'text-white hover:text-[#C9A45C]' : 'text-[#101820] hover:text-[#B08B43]'
                    }`}
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={`btn-shine flex-grow h-11 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#C9A45C] hover:bg-[#D8B872] text-[#101820]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                {/* Wishlist Toggle */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`w-11 h-11 flex-shrink-0 flex items-center justify-center border transition-all cursor-pointer ${
                    wishlisted
                      ? 'bg-[#C9A45C] text-[#101820] border-[#C9A45C]'
                      : isDark
                        ? 'bg-white/5 border-white/15 text-white/80 hover:text-white'
                        : 'bg-white border-black/15 text-[#101820]/80 hover:text-[#101820]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#101820]' : ''}`} />
                </button>
              </div>

              {/* Full Product Details Link */}
              <Link
                to={`/product/${quickViewProduct.slug || quickViewProduct.id}`}
                onClick={closeQuickView}
                className="w-full py-2.5 text-center text-xs uppercase tracking-widest text-[#C9A45C] hover:text-[#B08B43] font-semibold flex items-center justify-center gap-1.5 transition-colors group"
              >
                <span>View Full Specifications & Reviews</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
