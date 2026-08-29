import React from 'react';
import { SlidersHorizontal, ArrowDownUp, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'name-asc', label: 'Name: A to Z' },
  { id: 'name-desc', label: 'Name: Z to A' },
];

export const FilterToolbar = ({
  totalCount = 0,
  filters,
  onFilterChange,
  onClearFilters,
  onOpenMobileDrawer,
  activeFilterCount = 0,
}) => {
  const { isDark } = useTheme();
  const chips = [];

  if (filters.category && filters.category !== 'all' && filters.category !== 'All') {
    chips.push({
      label: `Category: ${filters.category}`,
      onRemove: () => onFilterChange({ category: 'all' }),
    });
  }

  filters.sizes?.forEach((size) => {
    chips.push({
      label: `Size: ${size}`,
      onRemove: () =>
        onFilterChange({ sizes: filters.sizes.filter((s) => s !== size) }),
    });
  });

  filters.colors?.forEach((color) => {
    chips.push({
      label: `Color: ${color}`,
      onRemove: () =>
        onFilterChange({ colors: filters.colors.filter((c) => c !== color) }),
    });
  });

  if (filters.priceRange && filters.priceRange !== 'all') {
    const priceLabels = {
      'under-1000': 'Under ₹1,000',
      '1000-2500': '₹1,000 – ₹2,500',
      '2500-5000': '₹2,500 – ₹5,000',
      'above-5000': 'Above ₹5,000',
    };
    chips.push({
      label: `Price: ${priceLabels[filters.priceRange] || filters.priceRange}`,
      onRemove: () => onFilterChange({ priceRange: 'all' }),
    });
  }

  if (filters.availability && filters.availability !== 'all') {
    chips.push({
      label: filters.availability === 'in-stock' ? 'In Stock' : 'Out of Stock',
      onRemove: () => onFilterChange({ availability: 'all' }),
    });
  }

  if (filters.searchQuery) {
    chips.push({
      label: `Search: "${filters.searchQuery}"`,
      onRemove: () => onFilterChange({ searchQuery: '' }),
    });
  }

  return (
    <div className="space-y-4 mb-8">
      {/* Top Bar: Count, Mobile Trigger, Sort Dropdown */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 border-y ${
        isDark ? 'border-white/10' : 'border-black/10'
      }`}>
        {/* Left: Count & Mobile Trigger */}
        <div className="flex items-center justify-between sm:justify-start gap-4">
          <span className={`text-xs uppercase tracking-widest font-medium ${
            isDark ? 'text-white' : 'text-[#101820]'
          }`}>
            {totalCount} {totalCount === 1 ? 'Product' : 'Products'}
          </span>

          {/* Mobile Filter & Sort Button */}
          <button
            onClick={onOpenMobileDrawer}
            className={`lg:hidden inline-flex items-center gap-2 px-3 py-2 border text-xs uppercase tracking-wider rounded-none transition-colors shadow-sm ${
              isDark
                ? 'bg-[#1B2630] border-white/15 text-white hover:border-[#C9A45C]'
                : 'bg-white border-black/15 text-[#101820] hover:border-[#B08B43]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>Filter & Sort</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#C9A45C] text-[#101820] font-bold text-[10px] flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Right: Sort Dropdown */}
        <div className="flex items-center justify-end gap-2 text-xs">
          <label htmlFor="sort-select" className={`flex items-center gap-1.5 uppercase tracking-wider text-[11px] font-medium ${
            isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
          }`}>
            <ArrowDownUp className="w-3.5 h-3.5" />
            <span>Sort By:</span>
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value })}
              className={`border text-xs uppercase tracking-wider py-1.5 px-3 pr-8 focus:outline-none focus:border-[#C9A45C] cursor-pointer transition-colors shadow-sm ${
                isDark
                  ? 'bg-[#1B2630] border-white/15 text-white'
                  : 'bg-white border-black/15 text-[#101820]'
              }`}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id} className={isDark ? 'bg-[#1B2630] text-white' : 'bg-white text-[#101820]'}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Removable Active Filter Chips */}
      {chips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1 animate-fade-in">
          <span className={`text-[11px] uppercase tracking-widest mr-1 ${
            isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
          }`}>
            Active Filters:
          </span>
          {chips.map((chip, idx) => (
            <span
              key={idx}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs tracking-wide rounded-none shadow-sm ${
                isDark
                  ? 'bg-white/10 text-white'
                  : 'bg-[#101820] text-white'
              }`}
            >
              <span>{chip.label}</span>
              <button
                onClick={chip.onRemove}
                className="hover:text-[#C9A45C] p-0.5 transition-colors cursor-pointer"
                aria-label={`Remove filter ${chip.label}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          <button
            onClick={onClearFilters}
            className="text-[11px] uppercase tracking-wider text-[#C9A45C] hover:text-[#B08B43] underline underline-offset-4 ml-2 transition-colors cursor-pointer font-medium"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};
