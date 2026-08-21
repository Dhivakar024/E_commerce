import React, { useEffect } from 'react';
import { X, RotateCcw, Check } from 'lucide-react';

const CATEGORY_OPTIONS = ['Women', 'Men', 'New Arrivals', 'Accessories'];
const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL'];
const COLOR_OPTIONS = ['Black', 'White', 'Beige', 'Brown', 'Blue'];
const PRICE_OPTIONS = [
  { id: 'under-1000', label: 'Under ₹1,000' },
  { id: '1000-2500', label: '₹1,000 – ₹2,500' },
  { id: '2500-5000', label: '₹2,500 – ₹5,000' },
  { id: 'above-5000', label: 'Above ₹5,000' },
];
const AVAILABILITY_OPTIONS = [
  { id: 'in-stock', label: 'In Stock' },
  { id: 'out-of-stock', label: 'Out of Stock' },
];

export const FilterDrawer = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearFilters,
  activeFilterCount = 0,
}) => {
  // Lock background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleSize = (size) => {
    const next = filters.sizes?.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...(filters.sizes || []), size];
    onFilterChange({ sizes: next });
  };

  const toggleColor = (color) => {
    const next = filters.colors?.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...(filters.colors || []), color];
    onFilterChange({ colors: next });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-md z-50 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-[#1B2630] border-l border-white/10 z-50 flex flex-col justify-between transition-transform duration-300 ease-out lg:hidden shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#101820]">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg tracking-wider text-[#F7F3EA] font-medium">
              Filter & Refine
            </span>
            {activeFilterCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#C9A45C] text-[#101820] text-xs font-bold">
                {activeFilterCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#A9B0B5] hover:text-[#F7F3EA] rounded-full transition-colors"
            aria-label="Close filter drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Filters Body */}
        <div className="p-6 overflow-y-auto space-y-8 flex-grow">
          {/* 1. Category */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-3">
              Category
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onFilterChange({ category: 'All' })}
                className={`py-2 px-3 text-xs uppercase tracking-wider text-left border ${
                  filters.category === 'All' || !filters.category
                    ? 'bg-[#C9A45C] text-[#101820] border-[#C9A45C] font-semibold'
                    : 'bg-white/5 text-[#F7F3EA]/80 border-white/10 hover:border-white/20'
                }`}
              >
                All
              </button>
              {CATEGORY_OPTIONS.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onFilterChange({ category: cat })}
                  className={`py-2 px-3 text-xs uppercase tracking-wider text-left border ${
                    filters.category?.toLowerCase() === cat.toLowerCase()
                      ? 'bg-[#C9A45C] text-[#101820] border-[#C9A45C] font-semibold'
                      : 'bg-white/5 text-[#F7F3EA]/80 border-white/10 hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Size */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-3">
              Size
            </h4>
            <div className="flex flex-wrap gap-2">
              {SIZE_OPTIONS.map((size) => {
                const isSelected = filters.sizes?.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`min-w-[44px] h-10 px-3 text-xs font-medium uppercase tracking-wider transition-colors border ${
                      isSelected
                        ? 'bg-[#C9A45C] text-[#101820] border-[#C9A45C] font-semibold'
                        : 'bg-white/5 text-[#F7F3EA]/80 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Color */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-3">
              Color
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {COLOR_OPTIONS.map((color) => {
                const isSelected = filters.colors?.includes(color);
                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => toggleColor(color)}
                    className={`py-2.5 px-3 text-xs uppercase tracking-wider flex items-center justify-between border ${
                      isSelected
                        ? 'bg-[#C9A45C] text-[#101820] border-[#C9A45C] font-semibold'
                        : 'bg-white/5 text-[#F7F3EA]/80 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <span>{color}</span>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Price */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-3">
              Price Range
            </h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2.5 text-xs text-[#F7F3EA]/80 hover:text-white cursor-pointer py-1">
                <input
                  type="radio"
                  name="drawer_price"
                  checked={filters.priceRange === 'all' || !filters.priceRange}
                  onChange={() => onFilterChange({ priceRange: 'all' })}
                  className="accent-[#C9A45C] cursor-pointer"
                />
                <span>All Prices</span>
              </label>
              {PRICE_OPTIONS.map((price) => (
                <label
                  key={price.id}
                  className="flex items-center gap-2.5 text-xs text-[#F7F3EA]/80 hover:text-white cursor-pointer py-1"
                >
                  <input
                    type="radio"
                    name="drawer_price"
                    checked={filters.priceRange === price.id}
                    onChange={() => onFilterChange({ priceRange: price.id })}
                    className="accent-[#C9A45C] cursor-pointer"
                  />
                  <span>{price.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 5. Availability */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-3">
              Availability
            </h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2.5 text-xs text-[#F7F3EA]/80 hover:text-white cursor-pointer py-1">
                <input
                  type="radio"
                  name="drawer_availability"
                  checked={filters.availability === 'all' || !filters.availability}
                  onChange={() => onFilterChange({ availability: 'all' })}
                  className="accent-[#C9A45C] cursor-pointer"
                />
                <span>All Items</span>
              </label>
              {AVAILABILITY_OPTIONS.map((avail) => (
                <label
                  key={avail.id}
                  className="flex items-center gap-2.5 text-xs text-[#F7F3EA]/80 hover:text-white cursor-pointer py-1"
                >
                  <input
                    type="radio"
                    name="drawer_availability"
                    checked={filters.availability === avail.id}
                    onChange={() => onFilterChange({ availability: avail.id })}
                    className="accent-[#C9A45C] cursor-pointer"
                  />
                  <span>{avail.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/10 flex items-center gap-3 bg-[#101820]">
          <button
            type="button"
            onClick={onClearFilters}
            className="flex-1 py-3.5 px-4 bg-transparent border border-white/20 text-[#F7F3EA] text-xs uppercase tracking-widest font-medium hover:bg-white/10 flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="btn-shine flex-1 py-3.5 px-4 bg-[#C9A45C] hover:bg-[#D8B872] text-[#101820] text-xs uppercase tracking-widest font-semibold flex items-center justify-center transition-colors shadow-lg cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};
