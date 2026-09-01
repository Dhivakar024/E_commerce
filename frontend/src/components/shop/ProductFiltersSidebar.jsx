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
  className = '',
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
    <aside className={`w-64 flex-shrink-0 space-y-6 pr-5 border-r select-none transition-colors duration-250 ${borderClass} ${
      isDark ? 'text-[#F7F3EA]' : 'text-[#101820]'
    } ${className}`}>
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

      {/* DYNAMIC CATEGORY-SPECIFIC FILTERS */}

      {/* Fashion: Subcategory / Fashion For, Sizes, Colors, Materials */}
      {currentCategory === 'fashion' && (
        <>
          {/* Dedicated "FASHION FOR" Filter */}
          <div>
            <h4 className={`text-xs uppercase tracking-widest font-semibold mb-3 ${textHeaderClass}`}>
              Fashion For
            </h4>
            <div className="space-y-1.5">
              {[
                { id: '', label: 'All Fashion' },
                { id: 'Men', label: 'Men' },
                { id: 'Women', label: 'Women' },
                { id: 'Boys', label: 'Boys' },
                { id: 'Girls', label: 'Girls' },
              ].map((opt) => {
                const isSelected = (filters.subcategory || '') === opt.id || (opt.id === '' && (!filters.subcategory || filters.subcategory === 'all'));
                return (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-2.5 text-xs cursor-pointer py-1 px-2 rounded transition-colors ${
                      isSelected
                        ? isDark ? 'bg-[#C9A45C]/20 text-[#C9A45C] font-semibold' : 'bg-[#B08B43]/15 text-[#B08B43] font-semibold'
                        : textBodyClass
                    }`}
                  >
                    <input
                      type="radio"
                      name="fashion-for"
                      checked={isSelected}
                      onChange={() => onFilterChange({ subcategory: opt.id })}
                      className="accent-[#C9A45C] cursor-pointer"
                    />
                    <span>{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className={`text-xs uppercase tracking-widest font-semibold mb-3 ${textHeaderClass}`}>
              Sizes
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL', '38', '40', '42', '44', 'UK 7', 'UK 8', 'UK 9', 'UK 10'].map((size) => {
                const isSelected = (filters.sizes || []).includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleArrayItem('sizes', size)}
                    className={`px-2.5 py-1 text-xs border uppercase tracking-wider transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#C9A45C] text-[#101820] border-[#C9A45C] font-semibold'
                        : isDark
                          ? 'bg-white/5 border-white/10 hover:border-white/30 text-white/80'
                          : 'bg-black/5 border-black/10 hover:border-black/30 text-[#101820]/80'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className={`text-xs uppercase tracking-widest font-semibold mb-3 ${textHeaderClass}`}>
              Materials
            </h4>
            <div className="space-y-1.5">
              {['100% French Linen', 'Virgin Wool', 'Mulberry Silk', 'Organic Cotton', 'Full Grain Leather', 'Italian Cashmere'].map((mat) => (
                <label key={mat} className={`flex items-center gap-2 text-xs cursor-pointer ${textBodyClass}`}>
                  <input
                    type="checkbox"
                    checked={(filters.materials || []).includes(mat)}
                    onChange={() => toggleArrayItem('materials', mat)}
                    className="accent-[#C9A45C] cursor-pointer"
                  />
                  <span>{mat}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Furniture: Room Types, Materials */}
      {currentCategory === 'furniture' && (
        <>
          <div>
            <h4 className={`text-xs uppercase tracking-widest font-semibold mb-3 ${textHeaderClass}`}>
              Room Type
            </h4>
            <div className="space-y-1.5">
              {['Living Room', 'Dining Room', 'Bedroom', 'Home Office', 'Entryway'].map((room) => (
                <label key={room} className={`flex items-center gap-2 text-xs cursor-pointer ${textBodyClass}`}>
                  <input
                    type="checkbox"
                    checked={(filters.roomTypes || []).includes(room)}
                    onChange={() => toggleArrayItem('roomTypes', room)}
                    className="accent-[#C9A45C] cursor-pointer"
                  />
                  <span>{room}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className={`text-xs uppercase tracking-widest font-semibold mb-3 ${textHeaderClass}`}>
              Material
            </h4>
            <div className="space-y-1.5">
              {['Solid Teak Wood', 'Solid White Oak', 'Boucle Fabric', 'Full-Grain Italian Leather', 'Tempered Glass & Steel', 'Velvet & Walnut'].map((mat) => (
                <label key={mat} className={`flex items-center gap-2 text-xs cursor-pointer ${textBodyClass}`}>
                  <input
                    type="checkbox"
                    checked={(filters.materials || []).includes(mat)}
                    onChange={() => toggleArrayItem('materials', mat)}
                    className="accent-[#C9A45C] cursor-pointer"
                  />
                  <span>{mat}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Electronics: RAM, Storage, Brands */}
      {currentCategory === 'electronics' && (
        <>
          <div>
            <h4 className={`text-xs uppercase tracking-widest font-semibold mb-3 ${textHeaderClass}`}>
              RAM & Memory
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {['8GB', '12GB', '16GB', '32GB'].map((ram) => {
                const isSelected = (filters.rams || []).includes(ram);
                return (
                  <button
                    key={ram}
                    type="button"
                    onClick={() => toggleArrayItem('rams', ram)}
                    className={`px-2.5 py-1 text-xs border uppercase tracking-wider transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#C9A45C] text-[#101820] border-[#C9A45C] font-semibold'
                        : isDark
                          ? 'bg-white/5 border-white/10 hover:border-white/30 text-white/80'
                          : 'bg-black/5 border-black/10 hover:border-black/30 text-[#101820]/80'
                    }`}
                  >
                    {ram}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className={`text-xs uppercase tracking-widest font-semibold mb-3 ${textHeaderClass}`}>
              Storage
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {['128GB', '256GB', '512GB', '1TB'].map((storage) => {
                const isSelected = (filters.storages || []).includes(storage);
                return (
                  <button
                    key={storage}
                    type="button"
                    onClick={() => toggleArrayItem('storages', storage)}
                    className={`px-2.5 py-1 text-xs border uppercase tracking-wider transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#C9A45C] text-[#101820] border-[#C9A45C] font-semibold'
                        : isDark
                          ? 'bg-white/5 border-white/10 hover:border-white/30 text-white/80'
                          : 'bg-black/5 border-black/10 hover:border-black/30 text-[#101820]/80'
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

      {/* Medicines: Form & Prescription */}
      {currentCategory === 'medicines' && (
        <>
          <div>
            <h4 className={`text-xs uppercase tracking-widest font-semibold mb-3 ${textHeaderClass}`}>
              Form
            </h4>
            <div className="space-y-1.5">
              {['Capsules', 'Tablets', 'Syrup / Liquid', 'Diagnostic Kit', 'Cream / Ointment'].map((form) => (
                <label key={form} className={`flex items-center gap-2 text-xs cursor-pointer ${textBodyClass}`}>
                  <input
                    type="checkbox"
                    checked={(filters.forms || []).includes(form)}
                    onChange={() => toggleArrayItem('forms', form)}
                    className="accent-[#C9A45C] cursor-pointer"
                  />
                  <span>{form}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className={`text-xs uppercase tracking-widest font-semibold mb-3 ${textHeaderClass}`}>
              Prescription Requirement
            </h4>
            <div className="space-y-2">
              {[
                { id: 'all', label: 'All Medicines' },
                { id: 'no', label: 'OTC (No Rx Needed)' },
                { id: 'yes', label: 'Prescription Required' },
              ].map((opt) => (
                <label key={opt.id} className={`flex items-center gap-2 text-xs cursor-pointer ${textBodyClass}`}>
                  <input
                    type="radio"
                    name="prescriptionRequired"
                    checked={filters.prescriptionRequired === opt.id}
                    onChange={() => onFilterChange({ prescriptionRequired: opt.id })}
                    className="accent-[#C9A45C] cursor-pointer"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Cosmetics: Skin Types */}
      {currentCategory === 'cosmetics' && (
        <div>
          <h4 className={`text-xs uppercase tracking-widest font-semibold mb-3 ${textHeaderClass}`}>
            Skin Type
          </h4>
          <div className="space-y-1.5">
            {['All Skin Types', 'Dry Skin', 'Oily & Combination', 'Sensitive Skin'].map((type) => (
              <label key={type} className={`flex items-center gap-2 text-xs cursor-pointer ${textBodyClass}`}>
                <input
                  type="checkbox"
                  checked={(filters.skinTypes || []).includes(type)}
                  onChange={() => toggleArrayItem('skinTypes', type)}
                  className="accent-[#C9A45C] cursor-pointer"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* 3. Global Price Range Filter */}
      <div>
        <h4 className={`text-xs uppercase tracking-widest font-semibold mb-3 ${textHeaderClass}`}>
          Price Range
        </h4>
        <div className="space-y-2">
          {PRICE_OPTIONS.map((opt) => (
            <label key={opt.id} className={`flex items-center gap-2.5 text-xs cursor-pointer ${textBodyClass}`}>
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange === opt.id}
                onChange={() => onFilterChange({ priceRange: opt.id })}
                className="accent-[#C9A45C] cursor-pointer"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 4. Availability Filter */}
      <div>
        <h4 className={`text-xs uppercase tracking-widest font-semibold mb-3 ${textHeaderClass}`}>
          Availability
        </h4>
        <div className="space-y-2">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'in-stock', label: 'In Stock Only' },
            { id: 'pre-order', label: 'Pre-Order Items' },
          ].map((opt) => (
            <label key={opt.id} className={`flex items-center gap-2.5 text-xs cursor-pointer ${textBodyClass}`}>
              <input
                type="radio"
                name="availability"
                checked={filters.availability === opt.id}
                onChange={() => onFilterChange({ availability: opt.id })}
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
