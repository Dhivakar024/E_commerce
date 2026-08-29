import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ShopHero } from '../components/shop/ShopHero';
import { CategoryNavTabs } from '../components/shop/CategoryNavTabs';
import { SearchBar } from '../components/shop/SearchBar';
import { ProductFiltersSidebar } from '../components/shop/ProductFiltersSidebar';
import { FilterDrawer } from '../components/shop/FilterDrawer';
import { FilterToolbar } from '../components/shop/FilterToolbar';
import { ProductCard } from '../components/common/ProductCard';
import { ProductSkeleton } from '../components/shop/ProductSkeleton';
import { EmptyState } from '../components/shop/EmptyState';
import { QuickViewModal } from '../components/shop/QuickViewModal';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { useTheme } from '../context/ThemeContext';
import { ChevronDown } from 'lucide-react';

const INITIAL_PAGE_SIZE = 9;
const PAGE_INCREMENT = 6;

export const Shop = ({ categoryName }) => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isDark } = useTheme();

  // Normalize category from query param, path param, or prop
  const urlCategory = searchParams.get('category');
  const urlSubcategory = searchParams.get('subcategory');
  const urlSearch = searchParams.get('search') || searchParams.get('q') || '';
  const routeCategory = categoryName || params.category || urlCategory || 'all';

  const [filters, setFilters] = useState({
    category: routeCategory,
    subcategory: urlSubcategory || '',
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
    searchQuery: urlSearch,
    sortBy: 'featured',
  });

  const [visibleCount, setVisibleCount] = useState(INITIAL_PAGE_SIZE);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync category & search params when URL changes
  useEffect(() => {
    const activeCat = categoryName || params.category || searchParams.get('category') || 'all';
    const activeSub = searchParams.get('subcategory') || '';
    const activeSearch = searchParams.get('search') || searchParams.get('q') || '';

    setFilters((prev) => ({
      ...prev,
      category: activeCat,
      subcategory: activeSub,
      searchQuery: activeSearch,
    }));
    setVisibleCount(INITIAL_PAGE_SIZE);
  }, [categoryName, params.category, searchParams]);

  const handleFilterChange = (newFilters) => {
    setIsLoading(true);
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setVisibleCount(INITIAL_PAGE_SIZE);
    setTimeout(() => setIsLoading(false), 150);
  };

  const handleClearFilters = () => {
    setIsLoading(true);
    setFilters({
      category: 'all',
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
    setVisibleCount(INITIAL_PAGE_SIZE);
    setTimeout(() => setIsLoading(false), 150);
  };

  // Filter & Search Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Department Category Filter
      if (filters.category && filters.category.toLowerCase() !== 'all') {
        const catSlug = (product.categorySlug || product.category || '').toLowerCase();
        if (catSlug !== filters.category.toLowerCase()) return false;
      }

      // 2. Subcategory Filter
      if (filters.subcategory) {
        const productSub = (product.subcategory || '').toLowerCase();
        if (!productSub.includes(filters.subcategory.toLowerCase())) return false;
      }

      // 3. Search Query
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCat = (product.category || '').toLowerCase().includes(q);
        const matchesSub = (product.subcategory || '').toLowerCase().includes(q);
        const matchesBrand = (product.brand || '').toLowerCase().includes(q);
        const matchesDesc = (product.description || '').toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesSub && !matchesBrand && !matchesDesc) {
          return false;
        }
      }

      // 4. Sizes Filter
      if (filters.sizes && filters.sizes.length > 0) {
        const hasSize = product.sizes && product.sizes.some((s) => filters.sizes.includes(s));
        if (!hasSize) return false;
      }

      // 5. Colors Filter
      if (filters.colors && filters.colors.length > 0) {
        const hasColor = product.colors && product.colors.some((c) => filters.colors.includes(c));
        if (!hasColor) return false;
      }

      // 6. Price Range
      if (filters.priceRange && filters.priceRange !== 'all') {
        if (filters.priceRange === 'under-2000' && product.price >= 2000) return false;
        if (filters.priceRange === '2000-5000' && (product.price < 2000 || product.price > 5000)) return false;
        if (filters.priceRange === '5000-20000' && (product.price < 5000 || product.price > 20000)) return false;
        if (filters.priceRange === 'above-20000' && product.price <= 20000) return false;
      }

      // 7. Prescription Filter
      if (filters.prescriptionRequired !== 'all') {
        const req = filters.prescriptionRequired === 'yes';
        if (Boolean(product.prescriptionRequired) !== req) return false;
      }

      return true;
    }).sort((a, b) => {
      // Sort logic
      if (filters.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (filters.sortBy === 'name-desc') return b.name.localeCompare(a.name);
      return 0; // featured
    });
  }, [filters]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_INCREMENT);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category && filters.category !== 'all') count += 1;
    if (filters.subcategory) count += 1;
    if (filters.sizes?.length) count += filters.sizes.length;
    if (filters.colors?.length) count += filters.colors.length;
    if (filters.priceRange !== 'all') count += 1;
    if (filters.prescriptionRequired !== 'all') count += 1;
    if (filters.searchQuery) count += 1;
    return count;
  }, [filters]);

  return (
    <main className={`w-full min-h-screen overflow-x-hidden transition-colors duration-250 ${
      isDark ? 'bg-[#101820] text-[#F7F3EA]' : 'bg-[#F8F6F0] text-[#101820]'
    }`}>
      {/* 1. SHOP HERO BANNER */}
      <ShopHero categoryTitle={filters.category} />

      {/* 2. CATEGORY QUICK SWITCHER TABS */}
      <CategoryNavTabs
        activeCategory={filters.category}
        onSelectCategory={(cat) => handleFilterChange({ category: cat, subcategory: '' })}
      />

      {/* 3. MAIN PRODUCT DISCOVERY VIEW */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
        {/* Search Bar & Subcategory pill */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-md w-full">
            <SearchBar
              value={filters.searchQuery || ''}
              onChange={(val) => handleFilterChange({ searchQuery: val })}
              onClear={() => handleFilterChange({ searchQuery: '' })}
            />
          </div>

          {filters.subcategory && (
            <div className="flex items-center gap-2 text-xs">
              <span className={isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}>Subcategory:</span>
              <span className={`px-3 py-1 font-medium flex items-center gap-1.5 ${
                isDark ? 'bg-white/10 text-white' : 'bg-[#101820] text-white'
              }`}>
                {filters.subcategory}
                <button
                  type="button"
                  onClick={() => handleFilterChange({ subcategory: '' })}
                  className="hover:text-[#C9A45C] ml-1 cursor-pointer"
                >
                  ✕
                </button>
              </span>
            </div>
          )}
        </div>

        {/* Filter + Sort Toolbar */}
        <FilterToolbar
          totalCount={filteredProducts.length}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)}
          activeFilterCount={activeFilterCount}
        />

        {/* Layout: Desktop Sidebar + Product Grid */}
        <div className="flex items-start gap-8 lg:gap-10">
          {/* Desktop Filter Sidebar */}
          <ProductFiltersSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            activeFilterCount={activeFilterCount}
          />

          {/* Product Grid Viewport */}
          <div className="flex-grow">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <ProductSkeleton key={idx} />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <EmptyState onClearFilters={handleClearFilters} />
            ) : (
              <>
                {/* Responsive Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
                  {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Progressive Pagination / Load More */}
                <div className="mt-14 pt-8 border-t border-black/10 dark:border-white/10 flex flex-col items-center justify-center gap-4">
                  <div className={`text-xs font-light ${
                    isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
                  }`}>
                    Showing <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#101820]'}`}>{visibleProducts.length}</span> of{' '}
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#101820]'}`}>{filteredProducts.length}</span> items
                  </div>

                  <div className="w-48 h-1 bg-black/10 dark:bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-[#C9A45C] transition-all duration-300"
                      style={{
                        width: `${(visibleProducts.length / filteredProducts.length) * 100}%`,
                      }}
                    />
                  </div>

                  {hasMore && (
                    <button
                      onClick={handleLoadMore}
                      className={`btn-shine inline-flex items-center gap-2 px-8 py-3.5 text-xs uppercase tracking-widest font-semibold transition-all duration-300 mt-2 shadow-sm cursor-pointer ${
                        isDark
                          ? 'bg-[#1B2630] hover:bg-[#C9A45C] text-white hover:text-[#101820]'
                          : 'bg-[#101820] hover:bg-[#B08B43] text-white'
                      }`}
                    >
                      <span>Load More Products</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </>
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

      {/* Reusable VIP Newsletter */}
      <NewsletterSection />
    </main>
  );
};
