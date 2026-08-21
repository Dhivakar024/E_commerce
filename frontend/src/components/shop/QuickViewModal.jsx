import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { X, Star, ShoppingBag, Heart, ArrowRight, Check } from 'lucide-react';

export const QuickViewModal = () => {
  const { quickViewProduct, closeQuickView, addToCart, isWishlisted, toggleWishlist } = useShop();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(quickViewProduct.sizes?.[0] || 'Standard');
      setSelectedColor(quickViewProduct.colors?.[0] || 'Default');
      setSelectedImageIndex(0);
      setQuantity(1);
      setIsAdded(false);
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

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 transition-opacity animate-fade-in"
        onClick={closeQuickView}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 pointer-events-none">
        <div
          className="relative w-full max-w-4xl max-h-[90vh] bg-luxury-black border border-white/15 overflow-y-auto shadow-2xl pointer-events-auto flex flex-col md:flex-row animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={`Quick view: ${quickViewProduct.name}`}
        >
          {/* Close Button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-luxury-cream/80 hover:text-white border border-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Gallery (50% on Desktop) */}
          <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between bg-luxury-charcoal/40 border-b md:border-b-0 md:border-r border-white/10">
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 mb-4">
              <img
                src={images[selectedImageIndex] || quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />
              {quickViewProduct.isNew && (
                <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/80 backdrop-blur-md border border-white/15 text-[9px] uppercase tracking-widest text-luxury-champagne font-medium">
                  NEW
                </span>
              )}
            </div>

            {/* Thumbnail Selectors */}
            {images.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-14 h-16 overflow-hidden border transition-all flex-shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-luxury-gold ring-1 ring-luxury-gold'
                        : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details (50% on Desktop) */}
          <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-luxury-muted mb-2">
                <span className="uppercase tracking-widest text-luxury-gold font-medium">
                  {quickViewProduct.category}
                </span>
                <div className="flex items-center gap-1 text-luxury-champagne">
                  <Star className="w-3.5 h-3.5 fill-luxury-gold text-luxury-gold" />
                  <span className="font-medium text-white">{quickViewProduct.rating}</span>
                  <span className="text-luxury-muted text-[11px]">({quickViewProduct.reviewCount})</span>
                </div>
              </div>

              {/* Product Title */}
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-3">
                {quickViewProduct.name}
              </h3>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="font-serif text-xl sm:text-2xl text-luxury-champagne font-medium">
                  ₹{quickViewProduct.price.toLocaleString('en-IN')}
                </span>
                {quickViewProduct.compareAtPrice && (
                  <span className="text-sm text-luxury-muted line-through">
                    ₹{quickViewProduct.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {quickViewProduct.compareAtPrice && (
                  <span className="text-[10px] px-2 py-0.5 bg-rose-950/60 border border-rose-500/30 text-rose-300 uppercase tracking-widest">
                    Save ₹{(quickViewProduct.compareAtPrice - quickViewProduct.price).toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-luxury-muted font-light leading-relaxed mb-6">
                {quickViewProduct.description}
              </p>

              {/* Size Selector */}
              {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="uppercase tracking-widest text-luxury-cream">Select Size:</span>
                    <span className="text-luxury-champagne font-medium">{selectedSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[42px] h-10 px-3 text-xs font-medium uppercase tracking-wider border transition-all ${
                          selectedSize === size
                            ? 'bg-white text-luxury-black border-white'
                            : 'bg-white/5 text-luxury-cream/80 border-white/10 hover:border-white/30'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="uppercase tracking-widest text-luxury-cream">Select Color:</span>
                    <span className="text-luxury-champagne font-medium">{selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.colors.map((color) => {
                      const hexObj = quickViewProduct.colorHexes?.find((c) => c.name === color);
                      return (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1.5 text-xs uppercase tracking-wider flex items-center gap-2 border transition-all ${
                            selectedColor === color
                              ? 'bg-white/10 border-luxury-gold text-white font-medium'
                              : 'bg-white/5 border-white/10 text-luxury-muted hover:text-white'
                          }`}
                        >
                          {hexObj && (
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-white/20"
                              style={{ backgroundColor: hexObj.hex }}
                            />
                          )}
                          <span>{color}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Actions */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center border border-white/15 bg-white/5">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-11 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-medium text-white">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-11 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={`flex-grow h-11 px-6 text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2 transition-all shadow-xl ${
                    isAdded
                      ? 'bg-emerald-700 text-white'
                      : 'bg-white hover:bg-luxury-champagne text-luxury-black'
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
                      <span>Add to Bag • ₹{(quickViewProduct.price * quantity).toLocaleString('en-IN')}</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`w-11 h-11 flex items-center justify-center border transition-colors ${
                    wishlisted
                      ? 'bg-white text-rose-500 border-white'
                      : 'bg-white/5 border-white/15 text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                  aria-label="Toggle Wishlist"
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500' : ''}`} />
                </button>
              </div>
            </div>

            {/* View Full Details Link */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-luxury-muted font-light">Stock: {quickViewProduct.stock} units available</span>
              <Link
                to={`/product/${quickViewProduct.slug}`}
                onClick={closeQuickView}
                className="group inline-flex items-center gap-1.5 text-luxury-champagne hover:text-white uppercase tracking-widest font-medium transition-colors"
              >
                <span>View Full Details</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
