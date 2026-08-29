import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { useTheme } from '../context/ThemeContext';
import { ProductImageGallery } from '../components/product/ProductImageGallery';
import { SizeGuideModal } from '../components/product/SizeGuideModal';
import { ProductInfoTabs } from '../components/product/ProductInfoTabs';
import { ProductReviewsSection } from '../components/product/ProductReviewsSection';
import { RecentlyViewed } from '../components/product/RecentlyViewed';
import { StickyMobilePurchaseBar } from '../components/product/StickyMobilePurchaseBar';
import { ProductCard } from '../components/common/ProductCard';
import { NewsletterSection } from '../components/home/NewsletterSection';
import {
  ChevronRight,
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  ArrowRight,
  AlertCircle,
  FileText,
  Zap,
} from 'lucide-react';

export const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, isWishlisted, toggleWishlist } = useShop();
  const { isDark } = useTheme();

  const product = PRODUCTS.find((p) => p.slug === slug || String(p.id) === slug);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [validationError, setValidationError] = useState('');
  const [isAdded, setIsAdded] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setSelectedSize(product.sizes?.[0] || 'Standard');
      setSelectedColor(product.colors?.[0] || 'Default');
      setQuantity(1);
      setValidationError('');
      setIsAdded(false);
    }
  }, [slug, product]);

  // Product 404 / Not Found State
  if (!product) {
    return (
      <main className={`min-h-screen flex items-center justify-center px-6 pt-32 pb-20 ${
        isDark ? 'bg-[#101820] text-white' : 'bg-[#F8F6F0] text-[#101820]'
      }`}>
        <div className="text-center max-w-md mx-auto">
          <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-3 font-medium">
            404 NOT FOUND
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl mb-4">
            Product Not Found
          </h1>
          <p className={`text-xs sm:text-sm mb-8 leading-relaxed ${
            isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
          }`}>
            The item you are looking for may have been archived or is temporarily unavailable.
          </p>
          <Link
            to="/shop"
            className="btn-shine inline-flex items-center gap-2 px-8 py-3.5 bg-[#C9A45C] text-[#101820] hover:bg-[#D8B872] text-xs uppercase tracking-widest font-semibold transition-colors"
          >
            <span>Return to Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 8;
  const categorySlug = (product.categorySlug || product.category || '').toLowerCase();

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    setValidationError('');
    addToCart(product, quantity, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  const handleBuyNow = () => {
    setValidationError('');
    addToCart(product, quantity, selectedSize, selectedColor);
    navigate('/cart');
  };

  // 4 Related Products within the same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && ((p.categorySlug || p.category || '').toLowerCase() === categorySlug || p.isFeatured)
  ).slice(0, 4);

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <main className={`w-full min-h-screen pt-28 sm:pt-32 pb-16 transition-colors duration-250 ${
      isDark ? 'bg-[#101820] text-[#F7F3EA]' : 'bg-[#F8F6F0] text-[#101820]'
    }`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* 1. BREADCRUMB */}
        <nav aria-label="Breadcrumb" className={`flex items-center gap-2 text-xs tracking-wider mb-8 overflow-x-auto pb-2 ${
          isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
        }`}>
          <Link to="/" className="hover:text-[#C9A45C] transition-colors flex-shrink-0">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50 flex-shrink-0" />
          <Link to="/shop" className="hover:text-[#C9A45C] transition-colors flex-shrink-0">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50 flex-shrink-0" />
          <Link
            to={`/category/${categorySlug}`}
            className="hover:text-[#C9A45C] transition-colors flex-shrink-0 uppercase font-semibold"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50 flex-shrink-0" />
          <span className="text-[#C9A45C] font-semibold truncate">
            {product.name}
          </span>
        </nav>

        {/* 2. PRODUCT MAIN SHOWCASE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16">
          {/* Left: Product Image Gallery (7 Cols) */}
          <div className="lg:col-span-7">
            <ProductImageGallery
              images={images}
              productName={product.name}
              isNew={product.isNew}
            />
          </div>

          {/* Right: Customization & Purchase Actions (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Brand, Category & Prescription Alert */}
              <div className="flex items-center justify-between text-xs mb-3">
                <div className="flex items-center gap-2">
                  <span className="uppercase tracking-ultra text-[#C9A45C] font-semibold">
                    {product.brand || product.category}
                  </span>
                  {product.subcategory && (
                    <span className={`text-[11px] ${isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}`}>• {product.subcategory}</span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center text-[#C9A45C]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating || 5)
                            ? 'fill-[#C9A45C] text-[#C9A45C]'
                            : 'text-neutral-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`font-semibold text-xs ${isDark ? 'text-white' : 'text-[#101820]'}`}>{product.rating}</span>
                  <a href="#reviews" className={`text-[11px] underline ${isDark ? 'text-[#A9B0B5] hover:text-white' : 'text-[#717D86] hover:text-[#101820]'}`}>
                    ({product.reviewCount} reviews)
                  </a>
                </div>
              </div>

              {/* Prescription Required Notice for Medicines */}
              {product.prescriptionRequired && (
                <div className="mb-4 p-3.5 bg-amber-50 border border-amber-300 rounded-sm flex items-center gap-2.5 text-amber-900 text-xs">
                  <FileText className="w-4 h-4 text-amber-700 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block">Prescription Required</span>
                    <span className="text-[11px] text-amber-800/90 font-light">
                      Medical prescription required during checkout or upon delivery.
                    </span>
                  </div>
                </div>
              )}

              {/* Title */}
              <h1 className={`font-serif text-2xl sm:text-3xl lg:text-4xl font-normal mb-3 tracking-tight leading-tight ${
                isDark ? 'text-white' : 'text-[#101820]'
              }`}>
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="flex items-center gap-3 mb-6">
                <span className="font-serif text-2xl sm:text-3xl text-[#C9A45C] font-semibold">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {hasDiscount && (
                  <span className={`text-base line-through ${isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}`}>
                    ₹{product.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {hasDiscount && (
                  <span className="text-xs px-2.5 py-0.5 bg-rose-100 border border-rose-300 text-rose-700 uppercase tracking-widest font-semibold">
                    {discountPercent}% OFF
                  </span>
                )}
                <span className={`text-[11px] ml-auto font-light ${isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}`}>
                  Inclusive of all taxes
                </span>
              </div>

              {/* Concise Description */}
              <p className={`text-xs sm:text-sm font-light leading-relaxed mb-6 ${
                isDark ? 'text-[#F7F3EA]/80' : 'text-[#4A5560]'
              }`}>
                {product.description}
              </p>

              {/* Color / Variant Swatch Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className={`mb-6 pb-6 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className={`uppercase tracking-widest font-medium ${isDark ? 'text-white' : 'text-[#101820]'}`}>
                      Color / Finish: <strong className="text-[#C9A45C] font-semibold">{selectedColor}</strong>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {product.colors.map((color) => {
                      const hexObj = product.colorHexes?.find((c) => c.name === color);
                      const isSelected = selectedColor === color;
                      return (
                        <button
                          key={color}
                          type="button"
                          onClick={() => {
                            setSelectedColor(color);
                            setValidationError('');
                          }}
                          className={`px-3.5 py-2 text-xs uppercase tracking-wider flex items-center gap-2.5 border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#C9A45C] border-[#C9A45C] text-[#101820] font-semibold'
                              : isDark
                                ? 'bg-[#1B2630] border-white/15 text-white hover:border-[#C9A45C]'
                                : 'bg-white border-black/15 text-[#101820] hover:border-[#B08B43]'
                          }`}
                        >
                          {hexObj && (
                            <span
                              className="w-3 h-3 rounded-full border border-black/20"
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

              {/* Size / Configuration Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className={`mb-6 pb-6 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className={`uppercase tracking-widest font-medium ${isDark ? 'text-white' : 'text-[#101820]'}`}>
                      {categorySlug === 'electronics'
                        ? 'Configuration / Storage:'
                        : categorySlug === 'cosmetics' || categorySlug === 'medicines'
                        ? 'Pack Size / Volume:'
                        : categorySlug === 'furniture'
                        ? 'Dimensions / Variant:'
                        : 'Size:'}{' '}
                      <strong className="text-[#C9A45C] font-semibold">{selectedSize}</strong>
                    </span>

                    {categorySlug === 'fashion' && (
                      <button
                        type="button"
                        onClick={() => setIsSizeGuideOpen(true)}
                        className="text-[#C9A45C] hover:underline cursor-pointer text-xs font-medium"
                      >
                        Size Guide
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {product.sizes.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => {
                            setSelectedSize(size);
                            setValidationError('');
                          }}
                          className={`min-w-[48px] h-10 px-3.5 text-xs font-semibold uppercase tracking-wider border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#C9A45C] text-[#101820] border-[#C9A45C] shadow-md scale-105'
                              : isDark
                                ? 'bg-[#1B2630] text-white border-white/15 hover:border-[#C9A45C]'
                                : 'bg-white text-[#101820] border-black/15 hover:border-[#B08B43]'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Stock Notice */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className={`uppercase tracking-widest font-medium ${isDark ? 'text-white' : 'text-[#101820]'}`}>
                    Quantity
                  </span>
                  {/* Stock notice */}
                  {isOutOfStock ? (
                    <span className="text-rose-600 font-semibold uppercase tracking-wider text-[11px]">
                      Out of Stock
                    </span>
                  ) : isLowStock ? (
                    <span className="text-amber-600 font-semibold uppercase tracking-wider text-[11px] flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Only {product.stock} left in stock
                    </span>
                  ) : (
                    <span className="text-emerald-600 font-medium text-[11px]">
                      In Stock & Ready to Dispatch
                    </span>
                  )}
                </div>

                <div className={`flex items-center border h-12 w-32 shadow-sm ${
                  isDark ? 'border-white/15 bg-[#1B2630]' : 'border-black/15 bg-white'
                }`}>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1 || isOutOfStock}
                    className={`w-10 h-full flex items-center justify-center font-serif text-sm disabled:opacity-30 transition-colors cursor-pointer ${
                      isDark ? 'text-white hover:bg-white/10' : 'text-[#101820] hover:bg-black/5'
                    }`}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className={`flex-grow text-center text-xs font-semibold ${isDark ? 'text-white' : 'text-[#101820]'}`}>{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock || isOutOfStock}
                    className={`w-10 h-full flex items-center justify-center font-serif text-sm disabled:opacity-30 transition-colors cursor-pointer ${
                      isDark ? 'text-white hover:bg-white/10' : 'text-[#101820] hover:bg-black/5'
                    }`}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Validation Error Message */}
              {validationError && (
                <div className="p-3 bg-rose-50 border border-rose-300 text-rose-700 text-xs flex items-center gap-2 mb-4 animate-fade-in">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Primary Actions: Add to Cart & Buy Now */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  {/* Add to Cart */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={isAdded || isOutOfStock}
                    className={`btn-shine flex-grow h-12 px-6 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer ${
                      isOutOfStock
                        ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed border border-neutral-300'
                        : isAdded
                        ? 'bg-emerald-700 text-white'
                        : 'bg-[#C9A45C] hover:bg-[#D8B872] text-[#101820]'
                    }`}
                  >
                    {isOutOfStock ? (
                      <span>Out of Stock</span>
                    ) : isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag • ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    className={`w-12 h-12 flex-shrink-0 flex items-center justify-center border transition-colors cursor-pointer ${
                      wishlisted
                        ? 'bg-[#C9A45C] text-[#101820] border-[#C9A45C]'
                        : isDark
                          ? 'bg-[#1B2630] border-white/15 text-white hover:text-[#C9A45C]'
                          : 'bg-white border-black/15 text-[#101820] hover:text-[#B08B43]'
                    }`}
                    aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart className={`w-5 h-5 ${wishlisted ? 'fill-[#101820]' : ''}`} />
                  </button>
                </div>

                {/* Buy Now Direct Checkout */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className={`w-full h-12 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors ${
                    isOutOfStock
                      ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed border border-neutral-300'
                      : isDark
                        ? 'bg-white/10 hover:bg-white/20 text-white cursor-pointer border border-white/10'
                        : 'bg-[#101820] hover:bg-[#1B2630] text-white cursor-pointer'
                  }`}
                >
                  <span>Buy Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className={`pt-6 mt-6 border-t grid grid-cols-3 gap-3 text-center text-[10px] uppercase tracking-wider font-medium ${
                isDark ? 'border-white/10 text-[#A9B0B5]' : 'border-black/10 text-[#717D86]'
              }`}>
                <div className={`flex flex-col items-center gap-1.5 p-2 border ${
                  isDark ? 'bg-[#1B2630] border-white/5' : 'bg-white border-black/5'
                }`}>
                  <Truck className="w-4 h-4 text-[#C9A45C]" />
                  <span>Fast Air Delivery</span>
                </div>
                <div className={`flex flex-col items-center gap-1.5 p-2 border ${
                  isDark ? 'bg-[#1B2630] border-white/5' : 'bg-white border-black/5'
                }`}>
                  <ShieldCheck className="w-4 h-4 text-[#C9A45C]" />
                  <span>100% Authentic</span>
                </div>
                <div className={`flex flex-col items-center gap-1.5 p-2 border ${
                  isDark ? 'bg-[#1B2630] border-white/5' : 'bg-white border-black/5'
                }`}>
                  <RotateCcw className="w-4 h-4 text-[#C9A45C]" />
                  <span>14-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. CATEGORY-SPECIFIC DETAILS & SPECIFICATION TABS */}
        <ProductInfoTabs product={product} />

        {/* 4. VERIFIED CLIENT REVIEWS */}
        <div id="reviews">
          <ProductReviewsSection product={product} />
        </div>

        {/* 5. RECENTLY VIEWED HISTORY */}
        <RecentlyViewed currentProductId={product.id} />

        {/* 6. RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section className={`pt-16 border-t mb-20 animate-fade-in ${
            isDark ? 'border-white/10' : 'border-black/10'
          }`}>
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
                  RECOMMENDED SELECTIONS
                </span>
                <h3 className={`font-serif text-2xl sm:text-3xl font-normal ${
                  isDark ? 'text-white' : 'text-[#101820]'
                }`}>
                  More in {product.category}
                </h3>
              </div>
              <Link
                to={`/category/${categorySlug}`}
                className="text-xs uppercase tracking-widest text-[#C9A45C] hover:underline transition-colors font-semibold"
              >
                View Category
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sticky Mobile Purchase Bar */}
      <StickyMobilePurchaseBar
        product={product}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        onAddToCart={handleAddToCart}
        isAdded={isAdded}
      />

      {/* Size Guide Modal for Fashion items */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* Reusable VIP Newsletter */}
      <NewsletterSection />
    </main>
  );
};
