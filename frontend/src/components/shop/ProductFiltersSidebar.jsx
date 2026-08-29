import React from 'react';
import { RotateCcw } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { useTheme } from '../../context/ThemeContext';

const PRICE_OPTIONS = [
  { id: 'all', label: 'All Prices' },
  { id: 'under-2000', label: 'Under ₹2,000' },
  { id: '2000-5000', label: '₹2,000 – ₹5,000' },
  { id: '5000-20000', label: '₹5,000 – ₹20,000' },
  { id: 'above-20000', label: 'Above ₹20,000' },
];

export const ProductFiltersSidebar = ({
  filters,
  onFilterChange,
  onClearFilters,
  activeFilterCount = 0,
}) => {
  const { isDark } = useTheme();
  const currentCategory = (filters.category || 'all').toLowerCase();

  const toggleArrayItem = (key, value) => {
    const currentList = filters[key] || [];
    const next = currentList.includes(value)
      ? currentList.filter((v) => v !== value)
      : [...currentList, value];
    onFilterChange({ [key]: next });
  };

  const textHeaderClass = isDark ? 'text-white' : 'text-[#101820]';
  const textBodyClass = isDark ? 'text-[#F7F3EA]/80 hover:text-white' : 'text-[#101820]/80 hover:text-[#101820]';
  const borderClass = isDark ? 'border-white/10' : 'border-black/10';

  return (
    <aside className={`w-64 flex-shrink-0 space-y-7 pr-6 border-r hidden lg:block select-none transition-colors duration-250 ${borderClass} ${
      isDark ? 'text-[#F7F3EA]' : 'text-[#101820]'
    }`}>
      {/* Header */}
      <div className={`flex items-center justify-between pb-4 border-b ${borderClass}`}>
        <div className="flex items-center gap-2">
          <span className={`font-serif text-sm uppercase tracking-widest font-semibold ${textHeaderClass}`}>
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
            className={`flex items-center gap-1 text-[11px] uppercase tracking-wider transition-colors cursor-pointer ${
              isDark ? 'text-[#A9B0B5] hover:text-white' : 'text-[#717D86] hover:text-[#101820]'
            }`}
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 1. Category Switcher */}
      <div>
        <h4 className={`text-xs uppercase tracking-widest font-semibold mb-3 ${textHeaderClass}`}>
          Category
        </h4>
        <div className="space-y-2">
          <label className={`flex items-center gap-2.5 text-xs cursor-pointer font-medium ${textBodyClass}`}>
            <input
              type="radio"
              name="sidebar_category"
              checked={currentCategory === 'all'}
              onChange={() => onFilterChange({ category: 'all', subcategories: [] })}
              className="accent-[#C9A45C] cursor-pointer"
            />
            <span>All Categories</span>
          </label>
          {CATEGORIES.map((cat) => (
            <label
              key={cat.id}
              className={`flex items-center gap-2.5 text-xs cursor-pointer ${textBodyClass}`}
            >
              <input
                type="radio"
                name="sidebar_category"
                checked={currentCategory === cat.slug}
                onChange={() => onFilterChange({ category: cat.slug, subcategories: [] })}
                className="accent-[#C9A45C] cursor-pointer"
              />
              <span className={currentCategory === cat.slug ? `font-semibold ${textHeaderClass}` : ''}>
                {cat.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 2. DYNAMIC CATEGORY-SPECIFIC FILTERS */}

      {/* A. FASHION FILTERS */}
      {(currentCategory === 'fashion' || currentCategory === 'all') && (
        <>
          {/* Sizes */}
          <div>
            <h4 className={`text-xs uppercase tracking-widest font-semibold mb-3 ${textHeaderClass}`}>
              Size
            </h4>
            <div className="flex flex-wrap gap-2">
              {['XS', 'S', 'M', 'L', 'XL', 'One Size'].map((size) => {
                const isSelected = filters.sizes?.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleArrayItem('sizes', size)}
                    className={`min-w-[36px] h-8 px-2 text-xs font-medium uppercase tracking-wider transition-colors border cursor-pointer ${
                      isSelected
                        ? 'bg-[#C9A45C] text-[#101820] border-[#C9A45C] font-semibold'
                        : isDark
                          ? 'bg-[#1B2630] text-white border-white/15 hover:border-[#C9A45C]'
                          : 'bg-white text-[#101820] border-black/15 hover:border-[#B08B43]'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color */}
          <div>
            <h4 className={`text-xs uppercase tracking-widest font-semibold mb-3 ${textHeaderClass}`}>
              Color
            </h4>
            <div className="space-y-1.5">
              {['White', 'Beige', 'Midnight Black', 'Navy Blue', 'Champagne Gold'].map((color) => {
                const isSelected = filters.colors?.includes(color);
                return (
                  <label key={color} className={`flex items-center gap-2 text-xs cursor-pointer ${textBodyClass}`}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleArrayItem('colors', color)}
                      className="accent-[#C9A45C]"
                    />
                    <span>{color}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* B. FURNITURE FILTERS */}
      {currentCategory === 'furniture' && (
        <>
          <div>
            <h4 className={`text-xs uppercase tracking-widest font-semibold mb-3 ${textHeaderClass}`}>
              Room Type
            </h4>
            <div className="space-y-1.5">
              {['Living Room', 'Bedroom', 'Dining', 'Office', 'Outdoor'].map((room) => {
                const isSelected = filters.roomTypes?.includes(room);
                return (
                  <label key={room} className={`flex items-center gap-2 text-xs cursor-pointer ${textBodyClass}`}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleArrayItem('roomTypes', room)}
                      className="accent-[#C9A45C]"
                    />
                    <span>{room}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* C. ELECTRONICS FILTERS */}
      {currentCategory === 'electronics' && (
        <>
          <div>
            <h4 className={`text-xs uppercase tracking-widest font-semibold mb-3 ${textHeaderClass}`}>
              Brand
            </h4>
            <div className="space-y-1.5">
              {['AetherTech', 'Zenith Systems', 'Quantum Audio', 'Visionary Display', 'Lumina Optics', 'Pulse Technologies'].map((b) => {
                const isSelected = filters.brands?.includes(b);
                return (
                  <label key={b} className={`flex items-center gap-2 text-xs cursor-pointer ${textBodyClass}`}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleArrayItem('brands', b)}
                      className="accent-[#C9A45C]"
                    />
                    <span>{b}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* D. MEDICINES & WELLNESS */}
      {currentCategory === 'medicines' && (
        <>
          <div>
            <h4 className={`text-xs uppercase tracking-widest font-semibold mb-3 ${textHeaderClass}`}>
              Product Form
            </h4>
            <div className="space-y-1.5">
              {['Capsules', 'Tablets', 'Liquid', 'Drops', 'Device', 'Kit'].map((f) => {
                const isSelected = filters.forms?.includes(f);
                return (
                  <label key={f} className={`flex items-center gap-2 text-xs cursor-pointer ${textBodyClass}`}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleArrayItem('forms', f)}
                      className="accent-[#C9A45C]"
                    />
                    <span>{f}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* E. COSMETICS */}
      {currentCategory === 'cosmetics' && (
        <>
          <div>
            <h4 className={`text-xs uppercase tracking-widest font-semibold mb-3 ${textHeaderClass}`}>
              Skin Type
            </h4>
            <div className="space-y-1.5">
              {['All Skin Types', 'Dry', 'Oily', 'Sensitive', 'Combination'].map((st) => {
                const isSelected = filters.skinTypes?.includes(st);
                return (
                  <label key={st} className={`flex items-center gap-2 text-xs cursor-pointer ${textBodyClass}`}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleArrayItem('skinTypes', st)}
                      className="accent-[#C9A45C]"
                    />
                    <span>{st}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* 3. Price Filter */}
      <div className={`pt-4 border-t ${borderClass}`}>
        <h4 className={`text-xs uppercase tracking-widest font-semibold mb-3 ${textHeaderClass}`}>
          Price Range
        </h4>
        <div className="space-y-2">
          {PRICE_OPTIONS.map((opt) => (
            <label key={opt.id} className={`flex items-center gap-2.5 text-xs cursor-pointer ${textBodyClass}`}>
              <input
                type="radio"
                name="sidebar_price"
                checked={filters.priceRange === opt.id}
                onChange={() => onFilterChange({ priceRange: opt.id })}
                className="accent-[#C9A45C] cursor-pointer"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};
