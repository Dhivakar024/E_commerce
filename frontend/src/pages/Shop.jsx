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
import { ChevronDown } from 'lucide-react';

const INITIAL_PAGE_SIZE = 8;
const PAGE_INCREMENT = 4;

export const Shop = ({ categoryName }) => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // Normalize category from prop or url
  const routeCategory = categoryName || params.category || 'All';
  const urlSearch = searchParams.get('search') || '';

  const [filters, setFilters] = useState({
    category: routeCategory,
    sizes: [],
    colors: [],
    priceRange: 'all',
    availability: 'all',
    searchQuery: urlSearch,
    sortBy: 'featured',
  });

  const [visibleCount, setVisibleCount] = useState(INITIAL_PAGE_SIZE);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync category state when route changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: routeCategory,
      searchQuery: urlSearch,
    }));
    setVisibleCount(INITIAL_PAGE_SIZE);
  }, [routeCategory, urlSearch]);

  const handleFilterChange = (newFilters) => {
    setIsLoading(true);
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setVisibleCount(INITIAL_PAGE_SIZE);
    setTimeout(() => setIsLoading(false), 200);
  };

  const handleClearFilters = () => {
    setIsLoading(true);
    setFilters({
      category: 'All',
      sizes: [],
      colors: [],
      priceRange: 'all',
      availability: 'all',
      searchQuery: '',
      sortBy: 'featured',
    });
    setSearchParams({});
    setVisibleCount(INITIAL_PAGE_SIZE);
    setTimeout(() => setIsLoading(false), 200);
  };

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category && filters.category !== 'All') count++;
    if (filters.sizes?.length > 0) count += filters.sizes.length;
    if (filters.colors?.length > 0) count += filters.colors.length;
    if (filters.priceRange && filters.priceRange !== 'all') count++;
    if (filters.availability && filters.availability !== 'all') count++;
    if (filters.searchQuery) count++;
    return count;
  }, [filters]);

  // Filter & Sort Engine
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Category Filter
      if (filters.category && filters.category !== 'All') {
        const cat = filters.category.toLowerCase().replace('-', ' ');
        const prodCat = product.category.toLowerCase();
        const isNewArrivalCategory = cat.includes('new') || cat.includes('arrival');

        if (isNewArrivalCategory) {
          if (!product.isNew && prodCat !== 'new arrivals') return false;
        } else if (!prodCat.includes(cat) && cat !== prodCat) {
          return false;
        }
      }

      // 2. Search Query Filter
      if (filters.searchQuery && filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase().trim();
        const inName = product.name.toLowerCase().includes(q);
        const inCat = product.category.toLowerCase().includes(q);
        const inSubcat = product.subcategory?.toLowerCase().includes(q) || false;
        const inDesc = product.description.toLowerCase().includes(q);
        const inTags = product.tags?.some((t) => t.toLowerCase().includes(q)) || false;

        if (!inName && !inCat && !inSubcat && !inDesc && !inTags) {
          return false;
        }
      }

      // 3. Size Filter
      if (filters.sizes?.length > 0) {
        const hasSize = product.sizes?.some((s) => filters.sizes.includes(s));
        if (!hasSize) return false;
      }

      // 4. Color Filter
      if (filters.colors?.length > 0) {
        const hasColor = product.colors?.some((c) =>
          filters.colors.some((fc) => fc.toLowerCase() === c.toLowerCase())
        );
        if (!hasColor) return false;
      }

      // 5. Price Range Filter
      if (filters.priceRange && filters.priceRange !== 'all') {
        if (filters.priceRange === 'under-1000' && product.price >= 1000) return false;
        if (filters.priceRange === '1000-2500' && (product.price < 1000 || product.price > 2500)) return false;
        if (filters.priceRange === '2500-5000' && (product.price < 2500 || product.price > 5000)) return false;
        if (filters.priceRange === 'above-5000' && product.price <= 5000) return false;
      }

      // 6. Availability Filter
      if (filters.availability && filters.availability !== 'all') {
        if (filters.availability === 'in-stock' && product.stock <= 0) return false;
        if (filters.availability === 'out-of-stock' && product.stock > 0) return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'featured':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  }, [filters]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + PAGE_INCREMENT, filteredProducts.length));
  };

  return (
    <main className="w-full bg-[#F7F3EA] text-[#101820] min-h-screen">
      {/* 1. SHOP HERO & BREADCRUMB */}
      <ShopHero categoryTitle={filters.category} />

      {/* 2. CATEGORY NAVIGATION TABS */}
      <CategoryNavTabs
        activeCategory={filters.category}
        onSelectCategory={(cat) => handleFilterChange({ category: cat })}
      />

      {/* 3. MAIN PRODUCT DISCOVERY VIEW */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-14">
        {/* Search Bar */}
        <div className="mb-8 max-w-xl">
          <SearchBar
            value={filters.searchQuery || ''}
            onChange={(val) => handleFilterChange({ searchQuery: val })}
            onClear={() => handleFilterChange({ searchQuery: '' })}
          />
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
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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
                <div className="mt-14 pt-8 border-t border-black/10 flex flex-col items-center justify-center gap-4">
                  {/* Progress Indicator */}
                  <div className="text-xs text-[#A9B0B5] font-light">
                    Showing <span className="text-[#101820] font-medium">{visibleProducts.length}</span> of{' '}
                    <span className="text-[#101820] font-medium">{filteredProducts.length}</span> items
                  </div>

                  {/* Progress Bar */}
                  <div className="w-48 h-1 bg-black/10 overflow-hidden">
                    <div
                      className="h-full bg-[#C9A45C] transition-all duration-300"
                      style={{
                        width: `${(visibleProducts.length / filteredProducts.length) * 100}%`,
                      }}
                    />
                  </div>

                  {/* Load More Button */}
                  {hasMore && (
                    <button
                      onClick={handleLoadMore}
                      className="btn-shine inline-flex items-center gap-2 px-8 py-3.5 bg-[#101820] hover:bg-[#C9A45C] text-[#F7F3EA] hover:text-[#101820] text-xs uppercase tracking-widest font-medium transition-all duration-300 mt-2 shadow-sm cursor-pointer"
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

      {/* Reusable Newsletter Section */}
      <NewsletterSection />
    </main>
  );
};
