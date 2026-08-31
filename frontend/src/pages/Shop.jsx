import React, { useState, useMemo, useEffect, useRef } from 'react';
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
import { ChevronDown, Sparkles } from 'lucide-react';

const INITIAL_PAGE_SIZE = 12;
const PAGE_INCREMENT = 8;

export const Shop = ({ categoryName }) => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isDark } = useTheme();
  const productScrollRef = useRef(null);

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

    // Scroll product panel to top on category change
    if (productScrollRef.current) {
      productScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [categoryName, params.category, searchParams]);

  // Update URL query parameters cleanly
  const updateUrlParams = (newCategory, newSubcategory, newSearch) => {
    const nextParams = {};
    if (newCategory && newCategory !== 'all') nextParams.category = newCategory;
    if (newSubcategory) nextParams.subcategory = newSubcategory;
    if (newSearch) nextParams.search = newSearch;
    setSearchParams(nextParams);
  };

  const handleFilterChange = (newFilters) => {
    setIsLoading(true);
    setFilters((prev) => {
      const updated = { ...prev, ...newFilters };
      if ('category' in newFilters || 'subcategory' in newFilters || 'searchQuery' in newFilters) {
        updateUrlParams(updated.category, updated.subcategory, updated.searchQuery);
      }
      return updated;
    });
    setVisibleCount(INITIAL_PAGE_SIZE);

    if (productScrollRef.current) {
      productScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 180);
  };

  const handleCategoryTabSelect = (catSlug) => {
    handleFilterChange({ category: catSlug, subcategory: '' });
  };

  const handleClearFilters = () => {
    handleFilterChange({
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
  };

  // Comprehensive Multi-Facet Filtering Engine
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Category Filter
      if (filters.category && filters.category !== 'all') {
        const pCat = (product.categorySlug || product.category || '').toLowerCase();
        if (pCat !== filters.category.toLowerCase()) return false;
      }

      // 2. Subcategory Filter
      if (filters.subcategory) {
        const pSub = (product.subcategory || '').toLowerCase();
        if (!pSub.includes(filters.subcategory.toLowerCase())) return false;
      }

      // 3. Search Query Filter
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = (product.brand || '').toLowerCase().includes(q);
        const matchesCat = (product.category || '').toLowerCase().includes(q);
        const matchesSubcat = (product.subcategory || '').toLowerCase().includes(q);
        const matchesDesc = (product.description || '').toLowerCase().includes(q);
        const matchesTags = Array.isArray(product.tags) && product.tags.some((t) => t.toLowerCase().includes(q));
        const matchesMaterial = (product.material || '').toLowerCase().includes(q);
        const matchesColors = Array.isArray(product.colors) && product.colors.some((c) => c.toLowerCase().includes(q));
        if (
          !matchesName &&
          !matchesBrand &&
          !matchesCat &&
          !matchesSubcat &&
          !matchesDesc &&
          !matchesTags &&
          !matchesMaterial &&
          !matchesColors
        ) {
          return false;
        }
      }

      // 4. Sizes / Variants Filter
      if (filters.sizes && filters.sizes.length > 0) {
        const hasSize = product.sizes && product.sizes.some((s) => filters.sizes.includes(s));
        if (!hasSize) return false;
      }

      // 5. Colors Filter
      if (filters.colors && filters.colors.length > 0) {
        const hasColor = product.colors && product.colors.some((c) => filters.colors.includes(c));
        if (!hasColor) return false;
      }

      // 6. Materials Filter
      if (filters.materials && filters.materials.length > 0) {
        if (!product.material || !filters.materials.includes(product.material)) return false;
      }

      // 7. Room Types Filter (Furniture)
      if (filters.roomTypes && filters.roomTypes.length > 0) {
        if (!product.roomType || !filters.roomTypes.includes(product.roomType)) return false;
      }

      // 8. Brands Filter
      if (filters.brands && filters.brands.length > 0) {
        if (!product.brand || !filters.brands.includes(product.brand)) return false;
      }

      // 9. RAM Filter (Electronics)
      if (filters.rams && filters.rams.length > 0) {
        if (!product.ram || !filters.rams.includes(product.ram)) return false;
      }

      // 10. Storage Filter (Electronics)
      if (filters.storages && filters.storages.length > 0) {
        if (!product.storage || !filters.storages.includes(product.storage)) return false;
      }

      // 11. Form Filter (Medicines)
      if (filters.forms && filters.forms.length > 0) {
        if (!product.form || !filters.forms.includes(product.form)) return false;
      }

      // 12. Skin Type Filter (Cosmetics)
      if (filters.skinTypes && filters.skinTypes.length > 0) {
        if (!product.skinType || !filters.skinTypes.includes(product.skinType)) return false;
      }

      // 13. Prescription Required Filter (Medicines)
      if (filters.prescriptionRequired && filters.prescriptionRequired !== 'all') {
        const req = filters.prescriptionRequired === 'yes';
        if (Boolean(product.prescriptionRequired) !== req) return false;
      }

      // 14. Price Range Filter
      if (filters.priceRange && filters.priceRange !== 'all') {
        if (filters.priceRange === 'under-2000' && product.price >= 2000) return false;
        if (filters.priceRange === '2000-5000' && (product.price < 2000 || product.price > 5000)) return false;
        if (filters.priceRange === '5000-20000' && (product.price < 5000 || product.price > 20000)) return false;
        if (filters.priceRange === 'above-20000' && product.price <= 20000) return false;
      }

      // 15. Availability Filter
      if (filters.availability && filters.availability !== 'all') {
        if (filters.availability === 'in-stock' && product.stock <= 0) return false;
        if (filters.availability === 'pre-order' && product.stock > 0) return false;
      }

      return true;
    }).sort((a, b) => {
      // Sorting
      if (filters.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'rating-desc') return (b.rating || 0) - (a.rating || 0);
      if (filters.sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (filters.sortBy === 'name-desc') return b.name.localeCompare(a.name);
      return 0; // featured default
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
    if (filters.materials?.length) count += filters.materials.length;
    if (filters.roomTypes?.length) count += filters.roomTypes.length;
    if (filters.brands?.length) count += filters.brands.length;
    if (filters.rams?.length) count += filters.rams.length;
    if (filters.storages?.length) count += filters.storages.length;
    if (filters.forms?.length) count += filters.forms.length;
    if (filters.skinTypes?.length) count += filters.skinTypes.length;
    if (filters.prescriptionRequired !== 'all') count += 1;
    if (filters.priceRange !== 'all') count += 1;
    if (filters.availability !== 'all') count += 1;
    if (filters.searchQuery) count += 1;
    return count;
  }, [filters]);

  return (
    <main
      className={`w-full min-h-screen pt-14 sm:pt-16 pb-12 sm:pb-14 transition-colors duration-250 ${
        isDark ? 'bg-[#101820] text-[#F7F3EA]' : 'bg-[#F8F6F0] text-[#101820]'
      }`}
    >
      {/* 1. Header & Dynamic Category Description */}
      <ShopHero categoryTitle={filters.category} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-3 sm:pt-4">
        {/* 2. Primary Category Navigation Tabs */}
        <CategoryNavTabs
          activeCategory={filters.category}
          onSelectCategory={handleCategoryTabSelect}
        />

        {/* 3. Search Bar Input */}
        <div className="mb-4 sm:mb-5">
          <SearchBar
            value={filters.searchQuery}
            onChange={(val) => handleFilterChange({ searchQuery: val })}
            onClear={() => handleFilterChange({ searchQuery: '' })}
            placeholder="Search across all categories (brand, product, features)..."
          />
        </div>

        {/* 4. Filter Toolbar (Count, Mobile Filter Trigger, Sort by) */}
        <FilterToolbar
          totalCount={filteredProducts.length}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)}
          activeFilterCount={activeFilterCount}
        />

        {/* 5. Marketplace Layout: Fixed/Stable Left Sidebar + Dedicated Right-Side Product Scroll Panel */}
        <div className="flex items-start gap-6 lg:gap-8 mb-5 sm:mb-6">
          {/* Left: Stable Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0 lg:sticky lg:top-24 max-h-[calc(100vh-140px)] overflow-y-auto pr-2 scrollbar-thin">
            <ProductFiltersSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              activeFilterCount={activeFilterCount}
            />
          </div>

          {/* Right: Dedicated Fixed-Height Scrollable Product Marketplace Panel */}
          <div
            className={`flex-grow w-full border rounded-none shadow-sm transition-all duration-300 relative flex flex-col ${
              isDark
                ? 'bg-[#151F28] border-white/[0.08]'
                : 'bg-[#EDE9DF] border-black/[0.08]'
            }`}
          >
            {/* Panel Top Status Header with Category Label & Count */}
            <div
              className={`px-4 sm:px-6 py-3 border-b flex items-center justify-between text-xs tracking-wider z-10 backdrop-blur-md select-none ${
                isDark
                  ? 'bg-[#101820] border-white/[0.08] text-[#F7F3EA]'
                  : 'bg-[#F8F6F0] border-black/[0.08] text-[#101820]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C] animate-pulse" />
                <span className="font-serif font-medium uppercase tracking-widest text-[#C9A45C]">
                  {filters.category === 'all' ? 'All Products' : filters.category}
                </span>
                <span className="text-[#A9B0B5]">•</span>
                <span className={isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}>
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'Item' : 'Items'} Available
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#A9B0B5] hidden sm:inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#C9A45C]" />
                <span>Internal Scroll Container</span>
              </span>
            </div>

            {/* Scrollable Products Viewport (Only products scroll vertically inside this container) */}
            <div
              ref={productScrollRef}
              className="product-scroll-panel overflow-y-auto overflow-x-hidden p-4 sm:p-5 lg:p-6 h-[720px] max-h-[calc(100vh-210px)] min-h-[500px] scroll-smooth"
            >
              {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                  {Array.from({ length: 8 }).map((_, idx) => (
                    <ProductSkeleton key={idx} />
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <EmptyState onClearFilters={handleClearFilters} />
              ) : (
                <>
                  {/* Responsive Product Grid Completely Contained Inside Scroll Box */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 pb-6">
                    {visibleProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {/* Progressive Pagination / Load More Controls */}
                  <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 flex flex-col items-center justify-center gap-3 pb-4">
                    <div
                      className={`text-xs font-light ${
                        isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
                      }`}
                    >
                      Showing{' '}
                      <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#101820]'}`}>
                        {visibleProducts.length}
                      </span>{' '}
                      of{' '}
                      <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#101820]'}`}>
                        {filteredProducts.length}
                      </span>{' '}
                      items
                    </div>

                    {/* Progress Fill Bar */}
                    <div className="w-44 h-1 bg-black/10 dark:bg-white/10 overflow-hidden">
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
                        className={`btn-shine inline-flex items-center gap-2 px-7 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all duration-300 mt-1 shadow-sm cursor-pointer ${
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
