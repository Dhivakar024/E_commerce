import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useTheme } from '../context/ThemeContext';
import { PRODUCTS } from '../data/products';
import { WishlistCard } from '../components/wishlist/WishlistCard';
import { QuickViewModal } from '../components/shop/QuickViewModal';
import { MagneticButton } from '../components/common/MagneticButton';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Heart,
  ArrowRight,
  ShoppingBag,
  Share2,
  SlidersHorizontal,
  Shirt,
  Armchair,
  Smartphone,
  Pill,
  Sparkles,
  Check,
} from 'lucide-react';

const CATEGORY_ICONS = {
  fashion: Shirt,
  furniture: Armchair,
  electronics: Smartphone,
  medicines: Pill,
  cosmetics: Sparkles,
};

const CATEGORIES_LIST = [
  { label: 'ALL', slug: 'all' },
  { label: 'FASHION', slug: 'fashion' },
  { label: 'FURNITURE', slug: 'furniture' },
  { label: 'ELECTRONICS', slug: 'electronics' },
  { label: 'MEDICINES', slug: 'medicines' },
  { label: 'COSMETICS', slug: 'cosmetics' },
];

export const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart, showToast } = useShop();
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [isCopied, setIsCopied] = useState(false);
  const [offsetY, setOffsetY] = useState(0);

  const [headerRef, isHeaderVisible] = useScrollReveal({ threshold: 0.1 });

  // Subtle Header Parallax on scroll
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || window.innerWidth < 768) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (scrollY < 400) {
            setOffsetY(scrollY * 0.18);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter raw products that exist in the wishlist
  const wishlistedProducts = useMemo(() => {
    return PRODUCTS.filter((product) => wishlist.includes(product.id));
  }, [wishlist]);

  // Dynamic counts for each category
  const categoryCounts = useMemo(() => {
    const counts = {
      all: wishlistedProducts.length,
      fashion: 0,
      furniture: 0,
      electronics: 0,
      medicines: 0,
      cosmetics: 0,
    };

    wishlistedProducts.forEach((p) => {
      const cat = (p.categorySlug || p.category || '').toLowerCase();
      if (counts[cat] !== undefined) {
        counts[cat] += 1;
      }
    });

    return counts;
  }, [wishlistedProducts]);

  // Multi-Category Filter + Sort
  const displayedProducts = useMemo(() => {
    let list = [...wishlistedProducts];

    // 1. Category Filter
    if (activeCategory !== 'all') {
      list = list.filter((p) => {
        const cat = (p.categorySlug || p.category || '').toLowerCase();
        return cat === activeCategory.toLowerCase();
      });
    }

    // 2. Sorting
    list.sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'discount') {
        const discA = a.compareAtPrice && a.compareAtPrice > a.price ? a.compareAtPrice - a.price : 0;
        const discB = b.compareAtPrice && b.compareAtPrice > b.price ? b.compareAtPrice - b.price : 0;
        return discB - discA;
      }
      return 0; // 'recent' order preserves default
    });

    return list;
  }, [wishlistedProducts, activeCategory, sortBy]);

  // Move All to Bag Handler
  const handleMoveAllToBag = () => {
    if (displayedProducts.length === 0) return;
    displayedProducts.forEach((product) => {
      addToCart(product, 1, product.sizes?.[0] || 'Standard', product.colors?.[0] || 'Default');
    });
    if (showToast) {
      showToast(`Moved ${displayedProducts.length} items to your shopping bag.`, 'success');
    }
  };

  // Move Single Item to Bag
  const handleMoveSingleToBag = (product) => {
    addToCart(product, 1, product.sizes?.[0] || 'Standard', product.colors?.[0] || 'Default');
    removeFromWishlist(product.id);
  };

  // Share Wishlist Link
  const handleShareWishlist = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      if (showToast) showToast('Wishlist link copied to clipboard!', 'info');
      setTimeout(() => setIsCopied(false), 2400);
    }
  };

  return (
    <main className={`w-full min-h-screen pt-28 sm:pt-32 pb-24 overflow-x-hidden transition-colors duration-250 ${
      isDark ? 'bg-[#101820] text-[#F7F3EA]' : 'bg-[#F8F6F0] text-[#101820]'
    }`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
        {/* 1. Header with Breadcrumb & Share Actions */}
        <div
          ref={headerRef}
          style={{
            transform: `translate3d(0, ${offsetY}px, 0)`,
            opacity: isHeaderVisible ? 1 : 0,
            transition: 'opacity 0.6s ease-out, transform 0.1s ease-out',
          }}
          className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-black/10 dark:border-white/10 gap-6"
        >
          <div>
            <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
              LAX360 SAVED ITEMS
            </span>
            <h1 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-normal ${
              isDark ? 'text-white' : 'text-[#101820]'
            }`}>
              Your Wishlist
            </h1>
            <p className={`text-xs sm:text-sm font-light mt-2 ${
              isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
            }`}>
              {wishlistedProducts.length === 0
                ? 'Your personal curation of marketplace favorites is currently empty.'
                : `You have ${wishlistedProducts.length} saved ${wishlistedProducts.length === 1 ? 'item' : 'items'} across all departments.`}
            </p>
          </div>

          {/* Top Actions: Share & Move All */}
          {wishlistedProducts.length > 0 && (
            <div className="flex items-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={handleShareWishlist}
                className={`px-4 py-2.5 border text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
                  isDark
                    ? 'bg-[#1B2630] border-white/15 text-white hover:border-[#C9A45C]'
                    : 'bg-white border-black/15 text-[#101820] hover:border-[#B08B43]'
                }`}
                aria-label="Share Wishlist"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-[#C9A45C]" /> : <Share2 className="w-3.5 h-3.5 text-[#C9A45C]" />}
                <span>{isCopied ? 'Link Copied' : 'Share Wishlist'}</span>
              </button>

              <button
                type="button"
                onClick={handleMoveAllToBag}
                className="btn-shine px-5 py-2.5 bg-[#C9A45C] text-[#101820] hover:bg-[#D8B872] text-xs uppercase tracking-widest font-semibold transition-all shadow-lg flex items-center gap-2 cursor-pointer active:scale-95"
                aria-label="Move all saved items to bag"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move All to Bag ({displayedProducts.length})</span>
              </button>
            </div>
          )}
        </div>

        {wishlistedProducts.length > 0 ? (
          <>
            {/* 2. Category Filter Tabs & Sort Row */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-5">
              {/* Category Filter Tabs with Dynamic Item Counts */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
                {CATEGORIES_LIST.map((cat) => {
                  const isActive = activeCategory === cat.slug;
                  const count = categoryCounts[cat.slug] || 0;
                  const Icon = CATEGORY_ICONS[cat.slug] || Sparkles;

                  return (
                    <button
                      key={cat.slug}
                      type="button"
                      onClick={() => setActiveCategory(cat.slug)}
                      className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                        isActive
                          ? 'bg-[#C9A45C] text-[#101820] shadow-md scale-105'
                          : isDark
                            ? 'bg-[#1B2630] text-[#A9B0B5] hover:text-white hover:bg-white/10 border border-white/10'
                            : 'bg-white text-[#4A5560] hover:text-[#101820] hover:bg-black/5 border border-black/10'
                      }`}
                    >
                      {cat.slug !== 'all' && <Icon className="w-3 h-3" />}
                      <span>{cat.label}</span>
                      <span className={`text-[10px] ml-0.5 ${isActive ? 'text-[#101820]/80 font-bold' : isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}`}>
                        ({count})
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 flex-shrink-0 self-end lg:self-auto">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span className={`text-xs uppercase tracking-wider ${
                  isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
                }`}>Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`border text-xs px-3 py-1.5 rounded-none focus:outline-none focus:border-[#C9A45C] cursor-pointer ${
                    isDark
                      ? 'bg-[#1B2630] border-white/15 text-white'
                      : 'bg-white border-black/15 text-[#101820]'
                  }`}
                  aria-label="Sort wishlist items"
                >
                  <option value="recent">Recently Added</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="discount">Biggest Discount</option>
                </select>
              </div>
            </div>

            {/* 3. Multi-Category Compact Product Grid */}
            {displayedProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
                {displayedProducts.map((product, idx) => (
                  <WishlistCard
                    key={product.id}
                    product={product}
                    index={idx}
                    onRemove={removeFromWishlist}
                    onMoveToBag={handleMoveSingleToBag}
                  />
                ))}
              </div>
            ) : (
              <div className={`py-16 text-center text-xs border p-8 space-y-3 ${
                isDark
                  ? 'text-[#A9B0B5] bg-[#1B2630]/40 border-white/10'
                  : 'text-[#4A5560] bg-white border-black/10'
              }`}>
                <p>No saved products found in the "{activeCategory.toUpperCase()}" department.</p>
                <button
                  type="button"
                  onClick={() => setActiveCategory('all')}
                  className="text-xs uppercase tracking-widest text-[#C9A45C] hover:text-[#B08B43] underline cursor-pointer"
                >
                  Show All Saved Items ({wishlistedProducts.length})
                </button>
              </div>
            )}
          </>
        ) : (
          /* 4. Empty State */
          <div className="py-20 text-center space-y-8 max-w-lg mx-auto animate-fade-in">
            <div className={`w-20 h-20 rounded-full border flex items-center justify-center mx-auto text-[#C9A45C] shadow-xl ${
              isDark ? 'bg-[#1B2630] border-[#C9A45C]/30' : 'bg-white border-[#C9A45C]/40'
            }`}>
              <Heart className="w-8 h-8 stroke-1 fill-[#C9A45C]/20" />
            </div>

            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-ultra text-[#C9A45C] font-semibold">
                NO ITEMS SAVED YET
              </span>
              <h2 className={`font-serif text-3xl font-normal ${
                isDark ? 'text-white' : 'text-[#101820]'
              }`}>
                Your wishlist is waiting.
              </h2>
              <p className={`text-xs sm:text-sm font-light leading-relaxed max-w-md mx-auto ${
                isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
              }`}>
                Save products you love and find them here anytime. Discover essentials across our 5 marketplace departments:
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              {[
                { name: 'Fashion', slug: 'fashion', icon: Shirt },
                { name: 'Furniture', slug: 'furniture', icon: Armchair },
                { name: 'Electronics', slug: 'electronics', icon: Smartphone },
                { name: 'Medicines', slug: 'medicines', icon: Pill },
                { name: 'Cosmetics', slug: 'cosmetics', icon: Sparkles },
              ].map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={cat.slug}
                    to={`/category/${cat.slug}`}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 border text-xs transition-all ${
                      isDark
                        ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-[#C9A45C] text-[#F7F3EA]'
                        : 'bg-white hover:bg-black/5 border-black/10 hover:border-[#B08B43] text-[#101820]'
                    }`}
                  >
                    <Icon className="w-3 h-3 text-[#C9A45C]" />
                    <span>{cat.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-3">
              <MagneticButton
                to="/shop"
                className="btn-shine inline-flex items-center gap-2 px-9 py-4 bg-[#C9A45C] text-[#101820] hover:bg-[#D8B872] text-xs uppercase tracking-widest font-semibold transition-all shadow-2xl"
              >
                <span>CONTINUE SHOPPING</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>
        )}
      </div>

      <QuickViewModal />

      <div className="mt-20">
        <NewsletterSection />
      </div>
    </main>
  );
};
