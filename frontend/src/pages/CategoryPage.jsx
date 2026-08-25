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

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
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

  // Filter products specifically for this category
  const matchingProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Must match this category
      const prodCatSlug = (product.categorySlug || product.category || '').toLowerCase();
      if (prodCatSlug !== categoryData.slug.toLowerCase()) {
        return false;
      }

      // Subcategory
      if (filters.subcategory && filters.subcategory.trim()) {
        const sub = filters.subcategory.toLowerCase();
        const prodSub = (product.subcategory || '').toLowerCase();
        if (prodSub !== sub && !prodSub.includes(sub)) {
          return false;
        }
      }

      // Sizes
      if (filters.sizes?.length > 0) {
        const hasSize = product.sizes?.some((s) =>
          filters.sizes.some((fs) => s.toLowerCase().includes(fs.toLowerCase()))
        );
        if (!hasSize) return false;
      }

      // Colors
      if (filters.colors?.length > 0) {
        const hasColor = product.colors?.some((c) =>
          filters.colors.some((fc) => c.toLowerCase().includes(fc.toLowerCase()))
        );
        if (!hasColor) return false;
      }

      // Materials
      if (filters.materials?.length > 0) {
        const hasMat = filters.materials.some((m) =>
          (product.material || '').toLowerCase().includes(m.toLowerCase())
        );
        if (!hasMat) return false;
      }

      // Room types
      if (filters.roomTypes?.length > 0) {
        const hasRoom = filters.roomTypes.some((r) =>
          (product.roomType || product.subcategory || '').toLowerCase().includes(r.toLowerCase())
        );
        if (!hasRoom) return false;
      }

      // Brands
      if (filters.brands?.length > 0) {
        const hasBrand = filters.brands.some((b) =>
          (product.brand || '').toLowerCase().includes(b.toLowerCase())
        );
        if (!hasBrand) return false;
      }

      // RAM
      if (filters.rams?.length > 0) {
        const hasRam = filters.rams.some((ram) =>
          (product.ram || '').toLowerCase().includes(ram.toLowerCase())
        );
        if (!hasRam) return false;
      }

      // Storage
      if (filters.storages?.length > 0) {
        const hasStorage = filters.storages.some((st) =>
          (product.storage || '').toLowerCase().includes(st.toLowerCase())
        );
        if (!hasStorage) return false;
      }

      // Forms (Medicines)
      if (filters.forms?.length > 0) {
        const hasForm = filters.forms.some((f) =>
          (product.form || '').toLowerCase().includes(f.toLowerCase())
        );
        if (!hasForm) return false;
      }

      // Prescription status
      if (filters.prescriptionRequired !== undefined && filters.prescriptionRequired !== 'all') {
        if (Boolean(product.prescriptionRequired) !== Boolean(filters.prescriptionRequired)) {
          return false;
        }
      }

      // Skin type (Cosmetics)
      if (filters.skinTypes?.length > 0) {
        const hasSkin = filters.skinTypes.some((st) =>
          (product.skinType || '').toLowerCase().includes(st.toLowerCase()) ||
          (product.skinType || '').toLowerCase().includes('all skin')
        );
        if (!hasSkin) return false;
      }

      // Finish (Cosmetics)
      if (filters.finishes?.length > 0) {
        const hasFin = filters.finishes.some((fin) =>
          (product.finish || '').toLowerCase().includes(fin.toLowerCase())
        );
        if (!hasFin) return false;
      }

      // Price
      if (filters.priceRange && filters.priceRange !== 'all') {
        if (filters.priceRange === 'under-2000' && product.price >= 2000) return false;
        if (filters.priceRange === '2000-5000' && (product.price < 2000 || product.price > 5000)) return false;
        if (filters.priceRange === '5000-20000' && (product.price < 5000 || product.price > 20000)) return false;
        if (filters.priceRange === 'above-20000' && product.price <= 20000) return false;
      }

      // Availability
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
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'featured':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  }, [categoryData, filters]);

  return (
    <main className="w-full bg-[#F7F3EA] text-[#101820] min-h-screen">
      {/* 1. Category Hero Banner */}
      <section className="relative bg-[#101820] text-white pt-32 sm:pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={categoryData.image}
            alt={categoryData.name}
            className="w-full h-full object-cover object-center filter brightness-40 blur-xs scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#101820] via-[#101820]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs tracking-wider text-[#A9B0B5] mb-6">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <Link to="/shop" className="hover:text-white transition-colors">
              Categories
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <span className="text-[#C9A45C] font-semibold">{categoryData.name}</span>
          </nav>

          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1B2630]/90 border border-white/15 text-[#C9A45C] text-xs font-semibold uppercase tracking-widest">
              <IconComponent className="w-3.5 h-3.5" />
              <span>{categoryData.name} Collection</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-white">
              {categoryData.name}
            </h1>

            <p className="text-sm sm:text-base text-[#F7F3EA]/80 font-light leading-relaxed">
              {categoryData.description}
            </p>
          </div>

          {/* Subcategories Horizontal Filter Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-xs uppercase tracking-widest text-[#A9B0B5] mr-2">
              Subcategories:
            </span>
            <button
              type="button"
              onClick={() => handleSubcategoryClick('')}
              className={`px-4 py-1.5 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
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
                  className={`px-4 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer ${
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-14">
        {/* Back Link & Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#101820] hover:text-[#C9A45C] font-semibold transition-colors"
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
        <div className="flex items-start gap-8 lg:gap-10">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
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
