import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
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
  Sparkles,
  Zap,
} from 'lucide-react';

export const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, isWishlisted, toggleWishlist } = useShop();

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
      <main className="min-h-screen bg-luxury-black flex items-center justify-center px-6 pt-32 pb-20">
        <div className="text-center max-w-md mx-auto">
          <span className="text-xs uppercase tracking-ultra text-luxury-gold block mb-3 font-medium">
            404 NOT FOUND
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-white mb-4">
            Product Not Found
          </h1>
          <p className="text-xs sm:text-sm text-luxury-muted mb-8 leading-relaxed">
            The garment or collection item you are looking for may have been archived or is temporarily unavailable.
          </p>
          <Link
            to="/shop"
            className="btn-shine inline-flex items-center gap-2 px-8 py-3.5 bg-white text-luxury-black hover:bg-luxury-champagne text-xs uppercase tracking-widest font-medium transition-colors"
          >
            <span>Return to Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 8;

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      setValidationError('Please select a size before adding to bag.');
      return;
    }
    if (!selectedColor && product.colors && product.colors.length > 0) {
      setValidationError('Please select a color before adding to bag.');
      return;
    }

    setValidationError('');
    addToCart(product, quantity, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  const handleBuyNow = () => {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      setValidationError('Please select a size before proceeding.');
      return;
    }
    if (!selectedColor && product.colors && product.colors.length > 0) {
      setValidationError('Please select a color before proceeding.');
      return;
    }

    setValidationError('');
    addToCart(product, quantity, selectedSize, selectedColor);
    navigate('/cart');
  };

  // 4 Related Products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isFeatured)
  ).slice(0, 4);

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <main className="w-full bg-[#F7F3EA] text-[#101820] min-h-screen pt-28 sm:pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* 1. BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs tracking-wider text-[#A9B0B5] mb-8 overflow-x-auto pb-2">
          <Link to="/" className="hover:text-[#101820] transition-colors flex-shrink-0">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50 flex-shrink-0" />
          <Link to="/shop" className="hover:text-[#101820] transition-colors flex-shrink-0">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50 flex-shrink-0" />
          <Link
            to={`/shop/${product.category.toLowerCase().replace(' ', '-')}`}
            className="hover:text-[#101820] transition-colors flex-shrink-0"
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
              {/* Category, Badges & Rating */}
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="uppercase tracking-ultra text-[#C9A45C] font-semibold">
                  {product.category} {product.subcategory ? `• ${product.subcategory}` : ''}
                </span>
                <div className="flex items-center gap-1.5 text-[#101820]">
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
                  <span className="font-semibold text-[#101820] text-xs">{product.rating}</span>
                  <a href="#reviews" className="text-[#A9B0B5] text-[11px] underline hover:text-[#101820]">
                    ({product.reviewCount} reviews)
                  </a>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl text-[#101820] font-normal mb-3 tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="flex items-center gap-3 mb-6">
                <span className="font-serif text-2xl sm:text-3xl text-[#C9A45C] font-semibold">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {hasDiscount && (
                  <span className="text-base text-[#A9B0B5] line-through">
                    ₹{product.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {hasDiscount && (
                  <span className="text-xs px-2.5 py-0.5 bg-rose-100 border border-rose-300 text-rose-700 uppercase tracking-widest font-semibold">
                    {discountPercent}% OFF
                  </span>
                )}
                <span className="text-[11px] text-[#A9B0B5] ml-auto font-light">
                  Inclusive of all taxes
                </span>
              </div>

              {/* Concise Description */}
              <p className="text-xs sm:text-sm text-[#101820]/80 font-light leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Color Swatch Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6 pb-6 border-b border-black/10">
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="uppercase tracking-widest text-[#101820] font-medium">
                      Color: <strong className="text-[#C9A45C] font-semibold">{selectedColor}</strong>
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
                          className={`px-3.5 py-2 text-xs uppercase tracking-wider flex items-center gap-2.5 border transition-all ${
                            isSelected
                              ? 'bg-[#101820] border-[#101820] text-[#F7F3EA] font-semibold ring-1 ring-[#C9A45C]'
                              : 'bg-white border-black/15 text-[#101820] hover:border-[#C9A45C]'
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

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6 pb-6 border-b border-black/10">
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="uppercase tracking-widest text-[#101820] font-medium">
                      Size: <strong className="text-[#C9A45C] font-semibold">{selectedSize}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-[#C9A45C] hover:text-[#101820] underline underline-offset-4 cursor-pointer text-xs font-medium"
                    >
                      Size & Measurement Guide
                    </button>
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
                          className={`min-w-[48px] h-11 px-3 text-xs font-semibold uppercase tracking-wider border transition-all ${
                            isSelected
                              ? 'bg-[#101820] text-[#F7F3EA] border-[#101820] shadow-md scale-105'
                              : 'bg-white text-[#101820] border-black/15 hover:border-[#C9A45C]'
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
                  <span className="uppercase tracking-widest text-[#101820] font-medium">
                    Quantity
                  </span>
                  {/* Stock notice */}
                  {isOutOfStock ? (
                    <span className="text-rose-600 font-semibold uppercase tracking-wider text-[11px]">
                      Out of Stock
                    </span>
                  ) : isLowStock ? (
                    <span className="text-amber-700 font-semibold uppercase tracking-wider text-[11px] flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Only {product.stock} left in stock
                    </span>
                  ) : (
                    <span className="text-emerald-700 font-medium text-[11px]">
                      In Stock & Ready to Dispatch
                    </span>
                  )}
                </div>

                <div className="flex items-center border border-black/15 bg-white h-12 w-32 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="w-10 h-full flex items-center justify-center text-[#101820] hover:bg-black/5 disabled:opacity-30 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="flex-grow text-center text-xs font-semibold text-[#101820]">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock || isOutOfStock}
                    className="w-10 h-full flex items-center justify-center text-[#101820] hover:bg-black/5 disabled:opacity-30 transition-colors"
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
                        ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed border border-neutral-300'
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
                    className={`w-12 h-12 flex items-center justify-center border transition-all shadow-sm ${
                      wishlisted
                        ? 'bg-white text-[#C9A45C] border-[#C9A45C] shadow-md'
                        : 'bg-white border-black/15 text-[#101820] hover:text-[#C9A45C] hover:border-[#C9A45C]'
                    }`}
                    aria-label={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#C9A45C] text-[#C9A45C]' : ''}`} />
                  </button>
                </div>

                {/* Buy Now Button */}
                {!isOutOfStock && (
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="w-full h-12 px-6 bg-[#101820] hover:bg-[#1B2630] text-[#F7F3EA] border border-[#101820] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>Buy Now (Instant Checkout)</span>
                  </button>
                )}
              </div>

              {/* 4 Feature Highlights Row */}
              <div className="pt-8 mt-8 border-t border-black/10 grid grid-cols-2 gap-4 text-xs text-[#A9B0B5] font-light">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#C9A45C] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#101820] font-medium block">Premium Quality</span>
                    <span>Noble certified natural fibers.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-[#C9A45C] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#101820] font-medium block">Express Delivery</span>
                    <span>Complimentary air delivery across India.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <RotateCcw className="w-4 h-4 text-[#C9A45C] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#101820] font-medium block">14-Day Returns</span>
                    <span>Hassle-free doorstep pickup.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#C9A45C] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#101820] font-medium block">Secure Checkout</span>
                    <span>256-bit encrypted transactions.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. PRODUCT SPECIFICATIONS & DETAILS ACCORDION / TABS */}
        <ProductInfoTabs product={product} />

        {/* 4. VERIFIED CLIENT REVIEWS SECTION */}
        <div id="reviews">
          <ProductReviewsSection product={product} />
        </div>

        {/* 5. RELATED RECOMMENDATIONS */}
        {relatedProducts.length > 0 && (
          <section className="pt-16 border-t border-black/10 mb-20">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
                  RECOMMENDATIONS
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#101820] font-normal">
                  You May Also Like
                </h3>
              </div>
              <Link
                to="/shop"
                className="text-xs uppercase tracking-widest text-[#C9A45C] hover:text-[#101820] transition-colors font-medium"
              >
                View Collection
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* 6. RECENTLY VIEWED PRODUCTS */}
        <RecentlyViewed currentProductId={product.id} />
      </div>

      {/* Sticky Mobile Purchase Bar */}
      <StickyMobilePurchaseBar
        product={product}
        onAddToCart={handleAddToCart}
        isAdded={isAdded}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />

      {/* VIP Newsletter */}
      <NewsletterSection />
    </main>
  );
};
