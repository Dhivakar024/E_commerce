import React from 'react';
import { RotateCcw } from 'lucide-react';

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

export const ProductFiltersSidebar = ({
  filters,
  onFilterChange,
  onClearFilters,
  activeFilterCount = 0,
}) => {
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
    <aside className="w-64 flex-shrink-0 space-y-8 pr-6 border-r border-black/10 hidden lg:block select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-black/10">
        <div className="flex items-center gap-2">
          <span className="font-serif text-sm uppercase tracking-widest text-[#101820] font-semibold">
            Filters
          </span>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-[#C9A45C] text-[#101820] text-[10px] font-bold">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#A9B0B5] hover:text-[#101820] transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 1. Category */}
      <div>
        <h4 className="text-xs uppercase tracking-widest text-[#101820] font-semibold mb-3">
          Category
        </h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2.5 text-xs text-[#101820]/80 hover:text-[#101820] cursor-pointer">
            <input
              type="radio"
              name="sidebar_category"
              checked={filters.category === 'All' || !filters.category}
              onChange={() => onFilterChange({ category: 'All' })}
              className="accent-[#C9A45C] cursor-pointer"
            />
            <span>All Categories</span>
          </label>
          {CATEGORY_OPTIONS.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2.5 text-xs text-[#101820]/80 hover:text-[#101820] cursor-pointer"
            >
              <input
                type="radio"
                name="sidebar_category"
                checked={filters.category?.toLowerCase() === cat.toLowerCase()}
                onChange={() => onFilterChange({ category: cat })}
                className="accent-[#C9A45C] cursor-pointer"
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 2. Size */}
      <div>
        <h4 className="text-xs uppercase tracking-widest text-[#101820] font-semibold mb-3">
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
                className={`min-w-[38px] h-9 px-2 text-xs font-medium uppercase tracking-wider transition-colors border ${
                  isSelected
                    ? 'bg-[#101820] text-[#F7F3EA] border-[#101820]'
                    : 'bg-white text-[#101820] border-black/15 hover:border-[#C9A45C]'
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
        <h4 className="text-xs uppercase tracking-widest text-[#101820] font-semibold mb-3">
          Color
        </h4>
        <div className="space-y-2">
          {COLOR_OPTIONS.map((color) => {
            const isSelected = filters.colors?.includes(color);
            return (
              <label
                key={color}
                className="flex items-center gap-2.5 text-xs text-[#101820]/80 hover:text-[#101820] cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleColor(color)}
                  className="accent-[#C9A45C] rounded-none cursor-pointer"
                />
                <span>{color}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 4. Price */}
      <div>
        <h4 className="text-xs uppercase tracking-widest text-[#101820] font-semibold mb-3">
          Price
        </h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2.5 text-xs text-[#101820]/80 hover:text-[#101820] cursor-pointer">
            <input
              type="radio"
              name="sidebar_price"
              checked={filters.priceRange === 'all' || !filters.priceRange}
              onChange={() => onFilterChange({ priceRange: 'all' })}
              className="accent-[#C9A45C] cursor-pointer"
            />
            <span>All Prices</span>
          </label>
          {PRICE_OPTIONS.map((price) => (
            <label
              key={price.id}
              className="flex items-center gap-2.5 text-xs text-[#101820]/80 hover:text-[#101820] cursor-pointer"
            >
              <input
                type="radio"
                name="sidebar_price"
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
        <h4 className="text-xs uppercase tracking-widest text-[#101820] font-semibold mb-3">
          Availability
        </h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2.5 text-xs text-[#101820]/80 hover:text-[#101820] cursor-pointer">
            <input
              type="radio"
              name="sidebar_availability"
              checked={filters.availability === 'all' || !filters.availability}
              onChange={() => onFilterChange({ availability: 'all' })}
              className="accent-[#C9A45C] cursor-pointer"
            />
            <span>All Items</span>
          </label>
          {AVAILABILITY_OPTIONS.map((avail) => (
            <label
              key={avail.id}
              className="flex items-center gap-2.5 text-xs text-[#101820]/80 hover:text-[#101820] cursor-pointer"
            >
              <input
                type="radio"
                name="sidebar_availability"
                checked={filters.availability === avail.id}
                onChange={() => onFilterChange({ availability: avail.id })}
                className="accent-[#C9A45C] cursor-pointer"
              />
              <span>{avail.label}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};
