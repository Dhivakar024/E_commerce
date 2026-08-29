import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/shop/QuickViewModal';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTheme } from '../context/ThemeContext';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Armchair,
  Smartphone,
  Pill,
  Shirt,
  Percent,
} from 'lucide-react';

const MARKETPLACE_COLLECTIONS = [
  {
    id: 'new-arrivals',
    name: 'New Arrivals',
    categoryFilter: 'all',
    subtitle: 'Just Released Across Categories',
    description: 'Latest innovations in tech, home furniture, skincare formulations, health essentials, and seasonal apparel.',
    icon: Sparkles,
    filterFn: (p) => p.isNew,
  },
  {
    id: 'best-sellers',
    name: 'Best Sellers',
    categoryFilter: 'all',
    subtitle: 'Customer Favorites',
    description: 'Our most demanded, highest-rated products across all 5 departments.',
    icon: Award,
    filterFn: (p) => (p.rating || 0) >= 4.8,
  },
  {
    id: 'trending-now',
    name: 'Trending Now',
    categoryFilter: 'all',
    subtitle: 'Marketplace Highlights',
    description: 'Most visited and rapidly trending items this week across India.',
    icon: TrendingUp,
    filterFn: (p) => (p.reviewCount || 0) >= 50,
  },
  {
    id: 'home-essentials',
    name: 'Home Essentials',
    categoryFilter: 'furniture',
    subtitle: 'Modern Living & Comfort',
    description: 'Solid wood tables, architectural boucle armchairs, and minimalist interior solutions.',
    icon: Armchair,
    filterFn: (p) => (p.categorySlug || p.category || '').toLowerCase() === 'furniture',
  },
  {
    id: 'tech-picks',
    name: 'Tech Picks',
    categoryFilter: 'electronics',
    subtitle: 'Everyday Technology & Devices',
    description: 'Smart OLED TVs, pro wireless audio, 5G flagship smartphones, and computing essentials.',
    icon: Smartphone,
    filterFn: (p) => (p.categorySlug || p.category || '').toLowerCase() === 'electronics',
  },
  {
    id: 'beauty-picks',
    name: 'Beauty Picks',
    categoryFilter: 'cosmetics',
    subtitle: 'Skincare & Clean Cosmetics',
    description: 'Hydrating serums, baked highlighters, peptide fortifiers, and velvet lip colors.',
    icon: Sparkles,
    filterFn: (p) => (p.categorySlug || p.category || '').toLowerCase() === 'cosmetics',
  },
  {
    id: 'everyday-essentials',
    name: 'Everyday Essentials',
    categoryFilter: 'medicines',
    subtitle: 'Healthcare, First Aid & Wellness',
    description: 'Certified multivitamins, diagnostic devices, first-aid safety kits, and family wellness.',
    icon: Pill,
    filterFn: (p) => (p.categorySlug || p.category || '').toLowerCase() === 'medicines',
  },
  {
    id: 'fashion-picks',
    name: 'Fashion Picks',
    categoryFilter: 'fashion',
    subtitle: 'Everyday Style & Tailoring',
    description: 'Pure French linen shirts, structured virgin wool blazers, and silk satin silhouettes.',
    icon: Shirt,
    filterFn: (p) => (p.categorySlug || p.category || '').toLowerCase() === 'fashion',
  },
  {
    id: 'deals-of-the-week',
    name: 'Deals of the Week',
    categoryFilter: 'all',
    subtitle: 'Special Savings & Value',
    description: 'Exclusive limited-time price reductions across multi-category essentials.',
    icon: Percent,
    filterFn: (p) => p.compareAtPrice && p.compareAtPrice > p.price,
  },
];

const CATEGORY_TABS = [
  { label: 'ALL', slug: 'all' },
  { label: 'FASHION', slug: 'fashion' },
  { label: 'FURNITURE', slug: 'furniture' },
  { label: 'ELECTRONICS', slug: 'electronics' },
  { label: 'MEDICINES', slug: 'medicines' },
  { label: 'COSMETICS', slug: 'cosmetics' },
];

export const Collections = () => {
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCollectionId, setSelectedCollectionId] = useState('all');
  const [headerRef, isHeaderVisible] = useScrollReveal({ threshold: 0.1 });

  // Filter collections based on active category
  const filteredCollections = useMemo(() => {
    if (activeCategory === 'all') return MARKETPLACE_COLLECTIONS;
    return MARKETPLACE_COLLECTIONS.filter(
      (col) => col.categoryFilter === activeCategory || col.categoryFilter === 'all'
    );
  }, [activeCategory]);

  // Filter products based on active category and active collection filter
  const displayedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (activeCategory !== 'all') {
        const pCat = (p.categorySlug || p.category || '').toLowerCase();
        if (pCat !== activeCategory.toLowerCase()) return false;
      }

      // Collection filter if specific collection is selected
      if (selectedCollectionId !== 'all') {
        const foundCol = MARKETPLACE_COLLECTIONS.find((c) => c.id === selectedCollectionId);
        if (foundCol && foundCol.filterFn) {
          return foundCol.filterFn(p);
        }
      }

      return true;
    });
  }, [activeCategory, selectedCollectionId]);

  return (
    <main className={`w-full min-h-screen pt-28 sm:pt-32 pb-24 overflow-x-hidden transition-colors duration-250 ${
      isDark ? 'bg-[#101820] text-[#F7F3EA]' : 'bg-[#F8F6F0] text-[#101820]'
    }`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
        {/* Page Header */}
        <div
          ref={headerRef}
          className="text-center max-w-3xl mx-auto space-y-3 transition-all duration-700 ease-out"
          style={{
            opacity: isHeaderVisible ? 1 : 0,
            transform: isHeaderVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block font-semibold">
            LAX360 CURATED DISCOVERIES
          </span>
          <h1 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-normal ${
            isDark ? 'text-white' : 'text-[#101820]'
          }`}>
            Marketplace Collections
          </h1>
          <p className={`text-xs sm:text-sm font-light leading-relaxed ${
            isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
          }`}>
            Explore themed selections and curated product bundles across fashion, furniture, electronics, medicines, and cosmetics.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap border-b border-black/10 dark:border-white/10 pb-5">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.slug;
            return (
              <button
                key={tab.slug}
                type="button"
                onClick={() => {
                  setActiveCategory(tab.slug);
                  setSelectedCollectionId('all');
                }}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#C9A45C] text-[#101820] shadow-md scale-105'
                    : isDark
                      ? 'bg-white/5 text-[#F7F3EA]/80 hover:text-white hover:bg-white/10 border border-white/10'
                      : 'bg-white text-[#101820]/80 hover:text-[#101820] hover:bg-black/5 border border-black/10'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Thematic Collection Cards Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className={`font-serif text-xl sm:text-2xl font-normal ${
              isDark ? 'text-white' : 'text-[#101820]'
            }`}>
              Featured Curations {activeCategory !== 'all' ? `in ${activeCategory.toUpperCase()}` : ''}
            </h2>
            {selectedCollectionId !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedCollectionId('all')}
                className="text-xs uppercase tracking-widest text-[#C9A45C] hover:text-[#B08B43] underline cursor-pointer"
              >
                Show All Collections
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCollections.map((col) => {
              const Icon = col.icon;
              const isSelected = selectedCollectionId === col.id;

              return (
                <div
                  key={col.id}
                  onClick={() =>
                    setSelectedCollectionId((prev) => (prev === col.id ? 'all' : col.id))
                  }
                  className={`p-5 border transition-all duration-300 flex flex-col justify-between space-y-3 cursor-pointer shadow-md ${
                    isSelected
                      ? 'border-[#C9A45C] ring-1 ring-[#C9A45C] -translate-y-0.5 shadow-xl'
                      : isDark
                        ? 'bg-[#1B2630] border-white/10 hover:border-[#C9A45C]/70 hover:-translate-y-0.5'
                        : 'bg-white border-black/10 hover:border-[#B08B43]/70 hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`w-9 h-9 border flex items-center justify-center text-[#C9A45C] transition-transform group-hover:scale-105 ${
                      isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                    }`}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 ${
                      isSelected
                        ? 'bg-[#C9A45C] text-[#101820] font-semibold'
                        : isDark ? 'text-[#A9B0B5] bg-black/40' : 'text-[#717D86] bg-black/5'
                    }`}>
                      {isSelected ? 'Active Filter' : 'Filter Products'}
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#C9A45C] font-semibold block mb-1">
                      {col.subtitle}
                    </span>
                    <h3 className={`font-serif text-lg font-medium mb-1 ${
                      isDark ? 'text-white' : 'text-[#101820]'
                    }`}>
                      {col.name}
                    </h3>
                    <p className={`text-[11px] sm:text-xs font-light leading-relaxed line-clamp-2 ${
                      isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
                    }`}>
                      {col.description}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[10px] sm:text-xs uppercase tracking-widest text-[#C9A45C] font-semibold">
                    <span>{isSelected ? 'Viewing Products' : 'Explore Collection'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Matching Products Grid */}
        <div className="pt-8 border-t border-black/10 dark:border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`font-serif text-2xl font-normal ${
                isDark ? 'text-white' : 'text-[#101820]'
              }`}>
                Collection Products ({displayedProducts.length})
              </h2>
              <p className={`text-xs font-light ${
                isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
              }`}>
                {selectedCollectionId !== 'all'
                  ? `Showing products in ${MARKETPLACE_COLLECTIONS.find((c) => c.id === selectedCollectionId)?.name}`
                  : `Showing all available items in ${activeCategory.toUpperCase()}`}
              </p>
            </div>

            <Link
              to="/shop"
              className="text-xs uppercase tracking-widest text-[#C9A45C] hover:text-[#B08B43] font-semibold transition-colors"
            >
              Browse Full Catalog →
            </Link>
          </div>

          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
              {displayedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className={`py-16 text-center text-xs border p-8 ${
              isDark ? 'text-[#A9B0B5] bg-white/5 border-white/10' : 'text-[#4A5560] bg-white border-black/10'
            }`}>
              No products found for this specific filter combination. Try selecting "ALL" categories.
            </div>
          )}
        </div>
      </div>

      <QuickViewModal />
      <NewsletterSection />
    </main>
  );
};
