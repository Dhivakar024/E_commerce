import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { ProductFiltersSidebar } from '../components/shop/ProductFiltersSidebar';
import { FilterDrawer } from '../components/shop/FilterDrawer';
import { FilterToolbar } from '../components/shop/FilterToolbar';
import { EmptyState } from '../components/shop/EmptyState';
import { QuickViewModal } from '../components/shop/QuickViewModal';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { useTheme } from '../context/ThemeContext';
import { ChevronRight, ArrowLeft, Shirt, Armchair, Smartphone, Pill, Sparkles } from 'lucide-react';

const CATEGORY_ICONS = {
  fashion: Shirt,
  furniture: Armchair,
  electronics: Smartphone,
  medicines: Pill,
  cosmetics: Sparkles,
};

export const CategoryPage = () => {
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isDark } = useTheme();
  const selectedSubcategory = searchParams.get('subcategory') || '';

  // Find category definition
  const categoryData = useMemo(() => {
    const found = CATEGORIES.find(
      (c) => c.slug.toLowerCase() === (categorySlug || '').toLowerCase()
    );
    return found || CATEGORIES[0];
  }, [categorySlug]);

  const IconComponent = CATEGORY_ICONS[categoryData.slug] || Sparkles;

  const [filters, setFilters] = useState({
    category: categoryData.slug,
    subcategory: selectedSubcategory,
    sizes: [],
    colors: [],
    materials: [],
    roomTypes: [],
    brands: [],
    rams: [],
    storages: [],
    forms: [],
    skinTypes: [],
    finishes: [],
    prescriptionRequired: 'all',
    priceRange: 'all',
    availability: 'all',
    searchQuery: '',
    sortBy: 'featured',
  });

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Sync when category route or subcategory query changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: categoryData.slug,
      subcategory: selectedSubcategory,
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categoryData, selectedSubcategory]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: categoryData.slug,
      subcategory: '',
      sizes: [],
      colors: [],
      materials: [],
      roomTypes: [],
      brands: [],
      rams: [],
      storages: [],
      forms: [],
      skinTypes: [],
      finishes: [],
      prescriptionRequired: 'all',
      priceRange: 'all',
      availability: 'all',
      searchQuery: '',
      sortBy: 'featured',
    });
    setSearchParams({});
  };

  const handleSubcategoryClick = (sub) => {
    if (filters.subcategory === sub) {
      handleFilterChange({ subcategory: '' });
      setSearchParams({});
    } else {
      handleFilterChange({ subcategory: sub });
      setSearchParams({ subcategory: sub });
    }
  };

  // Filter products for this specific category + active sub-filters
  const matchingProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // 1. Must match current category
      const pCat = (p.categorySlug || p.category || '').toLowerCase();
      if (pCat !== categoryData.slug.toLowerCase()) return false;

      // 2. Subcategory filter
      if (filters.subcategory) {
        const pSub = (p.subcategory || '').toLowerCase();
        if (!pSub.includes(filters.subcategory.toLowerCase())) return false;
      }

      // 3. Search query
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = (p.brand || '').toLowerCase().includes(q);
        const matchesDesc = (p.description || '').toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesDesc) return false;
      }

      // 4. Sizes filter
      if (filters.sizes?.length > 0) {
        const hasSize = p.sizes && p.sizes.some((s) => filters.sizes.includes(s));
        if (!hasSize) return false;
      }

      // 5. Colors filter
      if (filters.colors?.length > 0) {
        const hasColor = p.colors && p.colors.some((c) => filters.colors.includes(c));
        if (!hasColor) return false;
      }

      // 6. Price range
      if (filters.priceRange && filters.priceRange !== 'all') {
        if (filters.priceRange === 'under-2000' && p.price >= 2000) return false;
        if (filters.priceRange === '2000-5000' && (p.price < 2000 || p.price > 5000)) return false;
        if (filters.priceRange === '5000-20000' && (p.price < 5000 || p.price > 20000)) return false;
        if (filters.priceRange === 'above-20000' && p.price <= 20000) return false;
      }

      // 7. Prescription filter
      if (filters.prescriptionRequired !== 'all') {
        const req = filters.prescriptionRequired === 'yes';
        if (Boolean(p.prescriptionRequired) !== req) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (filters.sortBy === 'name-desc') return b.name.localeCompare(a.name);
      return 0;
    });
  }, [categoryData.slug, filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.subcategory) count += 1;
    if (filters.sizes?.length) count += filters.sizes.length;
    if (filters.colors?.length) count += filters.colors.length;
    if (filters.priceRange !== 'all') count += 1;
    if (filters.prescriptionRequired !== 'all') count += 1;
    if (filters.searchQuery) count += 1;
    return count;
  }, [filters]);

  return (
    <main className={`w-full min-h-screen transition-colors duration-250 ${
      isDark ? 'bg-[#101820] text-[#F7F3EA]' : 'bg-[#F8F6F0] text-[#101820]'
    }`}>
      {/* 1. Category Hero Banner */}
      <section className="relative pt-22 pb-10 sm:pt-24 sm:pb-12 overflow-hidden bg-neutral-900 border-b border-black/10 dark:border-white/10">
        <img
          src={categoryData.image}
          alt={categoryData.name}
          className="absolute inset-0 w-full h-full object-cover filter brightness-45 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/70" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs tracking-wider text-white/70 mb-4">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <Link to="/shop" className="hover:text-white transition-colors">
              Shop
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <span className="text-[#C9A45C] font-semibold">{categoryData.name}</span>
          </nav>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md border border-[#C9A45C]/40 text-[#C9A45C] text-xs uppercase tracking-widest font-semibold mb-3">
              <IconComponent className="w-3.5 h-3.5" />
              <span>Department</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal mb-2.5 leading-tight">
              {categoryData.name}
            </h1>

            <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
              {categoryData.description}
            </p>
          </div>

          {/* Subcategories Horizontal Filter Bar */}
          <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-xs uppercase tracking-widest text-[#A9B0B5] mr-2 font-medium">
              Subcategories:
            </span>
            <button
              type="button"
              onClick={() => handleSubcategoryClick('')}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                !filters.subcategory
                  ? 'bg-[#C9A45C] text-[#101820]'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
              }`}
            >
              All {categoryData.name}
            </button>
            {categoryData.subcategories.map((sub) => {
              const isSelected = filters.subcategory?.toLowerCase() === sub.toLowerCase();
              return (
                <button
                  key={sub}
                  type="button"
                  onClick={() => handleSubcategoryClick(sub)}
                  className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#C9A45C] text-[#101820] font-semibold'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Main Product Discovery Area */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        {/* Back Link & Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/shop"
            className={`inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold transition-colors ${
              isDark ? 'text-white hover:text-[#C9A45C]' : 'text-[#101820] hover:text-[#B08B43]'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Categories</span>
          </Link>
        </div>

        <FilterToolbar
          totalCount={matchingProducts.length}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)}
          activeFilterCount={activeFilterCount}
        />

        {/* Layout: Sidebar + Products */}
        <div className="flex items-start gap-6 lg:gap-8">
          {/* Category Filter Sidebar */}
          <ProductFiltersSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            activeFilterCount={activeFilterCount}
          />

          {/* Grid */}
          <div className="flex-grow">
            {matchingProducts.length === 0 ? (
              <EmptyState onClearFilters={handleClearFilters} />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                {matchingProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <FilterDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        activeFilterCount={activeFilterCount}
      />

      {/* Quick View Modal */}
      <QuickViewModal />

      {/* VIP Newsletter */}
      <NewsletterSection />
    </main>
  );
};
