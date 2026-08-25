import React from 'react';
import { RotateCcw } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

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
  const currentCategory = (filters.category || 'all').toLowerCase();

  const toggleArrayItem = (key, value) => {
    const currentList = filters[key] || [];
    const next = currentList.includes(value)
      ? currentList.filter((v) => v !== value)
      : [...currentList, value];
    onFilterChange({ [key]: next });
  };

  return (
    <aside className="w-64 flex-shrink-0 space-y-7 pr-6 border-r border-black/10 hidden lg:block select-none text-[#101820]">
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
            className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#A9B0B5] hover:text-[#101820] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 1. Category Switcher */}
      <div>
        <h4 className="text-xs uppercase tracking-widest text-[#101820] font-semibold mb-3">
          Category
        </h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2.5 text-xs text-[#101820]/80 hover:text-[#101820] cursor-pointer font-medium">
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
              className="flex items-center gap-2.5 text-xs text-[#101820]/80 hover:text-[#101820] cursor-pointer"
            >
              <input
                type="radio"
                name="sidebar_category"
                checked={currentCategory === cat.slug}
                onChange={() => onFilterChange({ category: cat.slug, subcategories: [] })}
                className="accent-[#C9A45C] cursor-pointer"
              />
              <span className={currentCategory === cat.slug ? 'font-semibold text-[#101820]' : ''}>
                {cat.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. DYNAMIC CATEGORY-SPECIFIC FILTERS */}
      {/* ========================================================= */}

      {/* A. FASHION FILTERS */}
      {(currentCategory === 'fashion' || currentCategory === 'all') && (
        <>
          {/* Sizes */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#101820] font-semibold mb-3">
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

          {/* Color */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#101820] font-semibold mb-3">
              Color
            </h4>
            <div className="space-y-1.5">
              {['White', 'Beige', 'Midnight Black', 'Navy Blue', 'Champagne Gold'].map((color) => {
                const isSelected = filters.colors?.includes(color);
                return (
                  <label key={color} className="flex items-center gap-2 text-xs text-[#101820]/80 cursor-pointer">
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

          {/* Material */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#101820] font-semibold mb-3">
              Material
            </h4>
            <div className="space-y-1.5">
              {['100% French Linen', 'Virgin Wool Blend', 'Mulberry Silk', 'Pure Cashmere', 'Organic Cotton'].map((mat) => {
                const isSelected = filters.materials?.includes(mat);
                return (
                  <label key={mat} className="flex items-center gap-2 text-xs text-[#101820]/80 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleArrayItem('materials', mat)}
                      className="accent-[#C9A45C]"
                    />
                    <span>{mat}</span>
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
          {/* Room Type */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#101820] font-semibold mb-3">
              Room Type
            </h4>
            <div className="space-y-1.5">
              {['Living Room', 'Bedroom', 'Dining', 'Office', 'Outdoor'].map((room) => {
                const isSelected = filters.roomTypes?.includes(room);
                return (
                  <label key={room} className="flex items-center gap-2 text-xs text-[#101820]/80 cursor-pointer">
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

          {/* Material */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#101820] font-semibold mb-3">
              Furniture Material
            </h4>
            <div className="space-y-1.5">
              {['Solid Teak', 'Solid Oak', 'Calacatta Marble', 'Sheesham Wood', 'Velvet Upholstery'].map((mat) => {
                const isSelected = filters.materials?.includes(mat);
                return (
                  <label key={mat} className="flex items-center gap-2 text-xs text-[#101820]/80 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleArrayItem('materials', mat)}
                      className="accent-[#C9A45C]"
                    />
                    <span>{mat}</span>
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
          {/* Electronics Brand */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#101820] font-semibold mb-3">
              Brand
            </h4>
            <div className="space-y-1.5">
              {['AetherTech', 'Zenith Systems', 'Quantum Audio', 'Visionary Display', 'Lumina Optics', 'Pulse Technologies'].map((b) => {
                const isSelected = filters.brands?.includes(b);
                return (
                  <label key={b} className="flex items-center gap-2 text-xs text-[#101820]/80 cursor-pointer">
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

          {/* RAM */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#101820] font-semibold mb-3">
              RAM Memory
            </h4>
            <div className="flex flex-wrap gap-2">
              {['8 GB', '16 GB', '32 GB'].map((ram) => {
                const isSelected = filters.rams?.includes(ram);
                return (
                  <button
                    key={ram}
                    type="button"
                    onClick={() => toggleArrayItem('rams', ram)}
                    className={`px-2.5 py-1 text-xs font-medium border cursor-pointer ${
                      isSelected
                        ? 'bg-[#101820] text-[#F7F3EA] border-[#101820]'
                        : 'bg-white text-[#101820] border-black/15 hover:border-[#C9A45C]'
                    }`}
                  >
                    {ram}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Storage */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#101820] font-semibold mb-3">
              Storage Capacity
            </h4>
            <div className="flex flex-wrap gap-2">
              {['256 GB', '512 GB', '1 TB'].map((storage) => {
                const isSelected = filters.storages?.includes(storage);
                return (
                  <button
                    key={storage}
                    type="button"
                    onClick={() => toggleArrayItem('storages', storage)}
                    className={`px-2.5 py-1 text-xs font-medium border cursor-pointer ${
                      isSelected
                        ? 'bg-[#101820] text-[#F7F3EA] border-[#101820]'
                        : 'bg-white text-[#101820] border-black/15 hover:border-[#C9A45C]'
                    }`}
                  >
                    {storage}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* D. MEDICINES FILTERS */}
      {currentCategory === 'medicines' && (
        <>
          {/* Prescription Status */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#101820] font-semibold mb-3">
              Prescription Requirement
            </h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs text-[#101820]/80 cursor-pointer">
                <input
                  type="radio"
                  name="rx_filter"
                  checked={filters.prescriptionRequired === undefined || filters.prescriptionRequired === 'all'}
                  onChange={() => onFilterChange({ prescriptionRequired: 'all' })}
                  className="accent-[#C9A45C]"
                />
                <span>All Medicines</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-emerald-800 font-medium cursor-pointer">
                <input
                  type="radio"
                  name="rx_filter"
                  checked={filters.prescriptionRequired === false}
                  onChange={() => onFilterChange({ prescriptionRequired: false })}
                  className="accent-[#C9A45C]"
                />
                <span>Over-the-Counter (No Rx)</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-amber-800 font-medium cursor-pointer">
                <input
                  type="radio"
                  name="rx_filter"
                  checked={filters.prescriptionRequired === true}
                  onChange={() => onFilterChange({ prescriptionRequired: true })}
                  className="accent-[#C9A45C]"
                />
                <span>Prescription Required</span>
              </label>
            </div>
          </div>

          {/* Form */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#101820] font-semibold mb-3">
              Form
            </h4>
            <div className="space-y-1.5">
              {['Capsules', 'Softgels', 'Medical Kit', 'Sachets', 'Topical Gel', 'Syrup'].map((form) => {
                const isSelected = filters.forms?.includes(form);
                return (
                  <label key={form} className="flex items-center gap-2 text-xs text-[#101820]/80 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleArrayItem('forms', form)}
                      className="accent-[#C9A45C]"
                    />
                    <span>{form}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* E. COSMETICS FILTERS */}
      {currentCategory === 'cosmetics' && (
        <>
          {/* Cosmetics Brand */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#101820] font-semibold mb-3">
              Brand
            </h4>
            <div className="space-y-1.5">
              {['LuxeBotanics', 'LAX360 Beauté', 'LuxeBotanics Labs', 'LAX360 Haute Parfumerie'].map((b) => {
                const isSelected = filters.brands?.includes(b);
                return (
                  <label key={b} className="flex items-center gap-2 text-xs text-[#101820]/80 cursor-pointer">
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

          {/* Skin Type */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#101820] font-semibold mb-3">
              Skin Type
            </h4>
            <div className="space-y-1.5">
              {['All Skin Types', 'Mature / Normal', 'Sensitive', 'Dry / Damaged'].map((st) => {
                const isSelected = filters.skinTypes?.includes(st);
                return (
                  <label key={st} className="flex items-center gap-2 text-xs text-[#101820]/80 cursor-pointer">
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

          {/* Finish */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#101820] font-semibold mb-3">
              Finish
            </h4>
            <div className="space-y-1.5">
              {['Luminous Dewy', 'Velvet Matte', 'Glass Skin', 'Extrait Parfum'].map((fin) => {
                const isSelected = filters.finishes?.includes(fin);
                return (
                  <label key={fin} className="flex items-center gap-2 text-xs text-[#101820]/80 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleArrayItem('finishes', fin)}
                      className="accent-[#C9A45C]"
                    />
                    <span>{fin}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* 3. Global Price Range */}
      <div>
        <h4 className="text-xs uppercase tracking-widest text-[#101820] font-semibold mb-3">
          Price
        </h4>
        <div className="space-y-2">
          {PRICE_OPTIONS.map((price) => (
            <label
              key={price.id}
              className="flex items-center gap-2.5 text-xs text-[#101820]/80 hover:text-[#101820] cursor-pointer"
            >
              <input
                type="radio"
                name="sidebar_price"
                checked={(filters.priceRange || 'all') === price.id}
                onChange={() => onFilterChange({ priceRange: price.id })}
                className="accent-[#C9A45C] cursor-pointer"
              />
              <span>{price.label}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};
