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

const INITIAL_PAGE_SIZE = 12;
const PAGE_INCREMENT = 8;

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

  // Complex multi-category product filtering engine
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Category Filter
      if (filters.category && filters.category !== 'all') {
        const prodCat = (product.categorySlug || product.category || '').toLowerCase();
        if (prodCat !== filters.category.toLowerCase()) return false;
      }

      // 2. Subcategory Filter
      if (filters.subcategory) {
        const prodSub = (product.subcategory || '').toLowerCase();
        if (!prodSub.includes(filters.subcategory.toLowerCase())) return false;
      }

      // 3. Search Query Filter
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = (product.brand || '').toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        const matchesSub = (product.subcategory || '').toLowerCase().includes(q);
        const matchesDesc = (product.description || '').toLowerCase().includes(q);
        const matchesTags = product.tags && product.tags.some((t) => t.toLowerCase().includes(q));

        if (!matchesName && !matchesBrand && !matchesCat && !matchesSub && !matchesDesc && !matchesTags) {
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
    <main className={`w-full min-h-screen pt-28 sm:pt-32 pb-24 transition-colors duration-250 ${
      isDark ? 'bg-[#101820] text-[#F7F3EA]' : 'bg-[#F8F6F0] text-[#101820]'
    }`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* 1. Header & Dynamic Category Description */}
        <ShopHero activeCategory={filters.category} />

        {/* 2. Primary Category Navigation Tabs */}
        <CategoryNavTabs
          activeCategory={filters.category}
          onSelectCategory={handleCategoryTabSelect}
        />

        {/* 3. Search Bar Input */}
        <div className="mb-8">
          <SearchBar
            value={filters.searchQuery}
            onChange={(val) => handleFilterChange({ searchQuery: val })}
            onClear={() => handleFilterChange({ searchQuery: '' })}
            placeholder="Search across all categories (brand, product, features)..."
          />
        </div>

        {/* 4. Filter Toolbar */}
        <FilterToolbar
          totalCount={filteredProducts.length}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)}
          activeFilterCount={activeFilterCount}
        />

        {/* Layout: Desktop Sidebar + Product Grid */}
        <div className="flex items-start gap-6 lg:gap-8">
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
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <ProductSkeleton key={idx} />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <EmptyState onClearFilters={handleClearFilters} />
            ) : (
              <>
                {/* Responsive Compact Product Grid (2 cols mobile, 3-4 cols desktop) */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                  {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Progressive Pagination / Load More */}
                <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/10 flex flex-col items-center justify-center gap-4">
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
                      className={`btn-shine inline-flex items-center gap-2 px-8 py-3 text-xs uppercase tracking-widest font-semibold transition-all duration-300 mt-2 shadow-sm cursor-pointer ${
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
