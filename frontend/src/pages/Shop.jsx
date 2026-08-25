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

const INITIAL_PAGE_SIZE = 9;
const PAGE_INCREMENT = 6;

export const Shop = ({ categoryName }) => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

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

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category && filters.category !== 'all') count++;
    if (filters.subcategory) count++;
    if (filters.sizes?.length > 0) count += filters.sizes.length;
    if (filters.colors?.length > 0) count += filters.colors.length;
    if (filters.materials?.length > 0) count += filters.materials.length;
    if (filters.roomTypes?.length > 0) count += filters.roomTypes.length;
    if (filters.brands?.length > 0) count += filters.brands.length;
    if (filters.rams?.length > 0) count += filters.rams.length;
    if (filters.storages?.length > 0) count += filters.storages.length;
    if (filters.forms?.length > 0) count += filters.forms.length;
    if (filters.skinTypes?.length > 0) count += filters.skinTypes.length;
    if (filters.finishes?.length > 0) count += filters.finishes.length;
    if (filters.prescriptionRequired !== undefined && filters.prescriptionRequired !== 'all') count++;
    if (filters.priceRange && filters.priceRange !== 'all') count++;
    if (filters.availability && filters.availability !== 'all') count++;
    if (filters.searchQuery) count++;
    return count;
  }, [filters]);

  // Filter & Sort Engine
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Category Filter
      if (filters.category && filters.category.toLowerCase() !== 'all') {
        const selectedCat = filters.category.toLowerCase();
        const prodCatSlug = (product.categorySlug || product.category || '').toLowerCase();
        if (prodCatSlug !== selectedCat && !prodCatSlug.includes(selectedCat)) {
          return false;
        }
      }

      // 2. Subcategory Filter
      if (filters.subcategory && filters.subcategory.trim()) {
        const sub = filters.subcategory.toLowerCase();
        const prodSub = (product.subcategory || '').toLowerCase();
        if (prodSub !== sub && !prodSub.includes(sub)) {
          return false;
        }
      }

      // 3. Search Query Filter
      if (filters.searchQuery && filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase().trim();
        const inName = product.name.toLowerCase().includes(q);
        const inBrand = product.brand?.toLowerCase().includes(q) || false;
        const inCat = product.category.toLowerCase().includes(q);
        const inSubcat = product.subcategory?.toLowerCase().includes(q) || false;
        const inDesc = product.description?.toLowerCase().includes(q) || false;
        const inTags = product.tags?.some((t) => t.toLowerCase().includes(q)) || false;

        if (!inName && !inBrand && !inCat && !inSubcat && !inDesc && !inTags) {
          return false;
        }
      }

      // 4. Size Filter (Fashion / Furniture)
      if (filters.sizes?.length > 0) {
        const hasSize = product.sizes?.some((s) =>
          filters.sizes.some((fs) => s.toLowerCase().includes(fs.toLowerCase()))
        );
        if (!hasSize) return false;
      }

      // 5. Color Filter
      if (filters.colors?.length > 0) {
        const hasColor = product.colors?.some((c) =>
          filters.colors.some((fc) => c.toLowerCase().includes(fc.toLowerCase()))
        );
        if (!hasColor) return false;
      }

      // 6. Material Filter (Fashion / Furniture)
      if (filters.materials?.length > 0) {
        const hasMat = filters.materials.some((m) =>
          (product.material || '').toLowerCase().includes(m.toLowerCase())
        );
        if (!hasMat) return false;
      }

      // 7. Room Type (Furniture)
      if (filters.roomTypes?.length > 0) {
        const hasRoom = filters.roomTypes.some((r) =>
          (product.roomType || product.subcategory || '').toLowerCase().includes(r.toLowerCase())
        );
        if (!hasRoom) return false;
      }

      // 8. Brand Filter (Electronics / Cosmetics / Medicines)
      if (filters.brands?.length > 0) {
        const hasBrand = filters.brands.some((b) =>
          (product.brand || '').toLowerCase().includes(b.toLowerCase())
        );
        if (!hasBrand) return false;
      }

      // 9. RAM (Electronics)
      if (filters.rams?.length > 0) {
        const hasRam = filters.rams.some((ram) =>
          (product.ram || '').toLowerCase().includes(ram.toLowerCase())
        );
        if (!hasRam) return false;
      }

      // 10. Storage (Electronics)
      if (filters.storages?.length > 0) {
        const hasStorage = filters.storages.some((st) =>
          (product.storage || '').toLowerCase().includes(st.toLowerCase()) ||
          product.sizes?.some((s) => s.toLowerCase().includes(st.toLowerCase()))
        );
        if (!hasStorage) return false;
      }

      // 11. Form (Medicines)
      if (filters.forms?.length > 0) {
        const hasForm = filters.forms.some((f) =>
          (product.form || '').toLowerCase().includes(f.toLowerCase())
        );
        if (!hasForm) return false;
      }

      // 12. Prescription Status (Medicines)
      if (filters.prescriptionRequired !== undefined && filters.prescriptionRequired !== 'all') {
        if (Boolean(product.prescriptionRequired) !== Boolean(filters.prescriptionRequired)) {
          return false;
        }
      }

      // 13. Skin Type (Cosmetics)
      if (filters.skinTypes?.length > 0) {
        const hasSkin = filters.skinTypes.some((st) =>
          (product.skinType || '').toLowerCase().includes(st.toLowerCase()) ||
          (product.skinType || '').toLowerCase().includes('all skin')
        );
        if (!hasSkin) return false;
      }

      // 14. Finish (Cosmetics)
      if (filters.finishes?.length > 0) {
        const hasFin = filters.finishes.some((fin) =>
          (product.finish || '').toLowerCase().includes(fin.toLowerCase())
        );
        if (!hasFin) return false;
      }

      // 15. Price Range Filter
      if (filters.priceRange && filters.priceRange !== 'all') {
        if (filters.priceRange === 'under-2000' && product.price >= 2000) return false;
        if (filters.priceRange === '2000-5000' && (product.price < 2000 || product.price > 5000)) return false;
        if (filters.priceRange === '5000-20000' && (product.price < 5000 || product.price > 20000)) return false;
        if (filters.priceRange === 'above-20000' && product.price <= 20000) return false;
      }

      // 16. Availability Filter
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
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
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
      <ShopHero categoryTitle={filters.category === 'all' ? 'All Products' : filters.category} />

      {/* 2. CATEGORY NAVIGATION TABS */}
      <CategoryNavTabs
        activeCategory={filters.category}
        onSelectCategory={(cat) => handleFilterChange({ category: cat, subcategory: '' })}
      />

      {/* 3. MAIN PRODUCT DISCOVERY VIEW */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-14">
        {/* Search Bar & Subcategory pill if active */}
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
              <span className="text-[#A9B0B5]">Subcategory:</span>
              <span className="bg-[#101820] text-[#F7F3EA] px-3 py-1 font-medium rounded-none flex items-center gap-1.5">
                {filters.subcategory}
                <button
                  type="button"
                  onClick={() => handleFilterChange({ subcategory: '' })}
                  className="hover:text-[#C9A45C] ml-1"
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
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
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
                    Showing <span className="text-[#101820] font-semibold">{visibleProducts.length}</span> of{' '}
                    <span className="text-[#101820] font-semibold">{filteredProducts.length}</span> items
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
                      className="btn-shine inline-flex items-center gap-2 px-8 py-3.5 bg-[#101820] hover:bg-[#C9A45C] text-[#F7F3EA] hover:text-[#101820] text-xs uppercase tracking-widest font-semibold transition-all duration-300 mt-2 shadow-sm cursor-pointer"
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
