import React, { useEffect } from 'react';
import { X, RotateCcw, Check } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

const PRICE_OPTIONS = [
  { id: 'all', label: 'All Prices' },
  { id: 'under-2000', label: 'Under ₹2,000' },
  { id: '2000-5000', label: '₹2,000 – ₹5,000' },
  { id: '5000-20000', label: '₹5,000 – ₹20,000' },
  { id: 'above-20000', label: 'Above ₹20,000' },
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

  const currentCategory = (filters.category || 'all').toLowerCase();

  const toggleArrayItem = (key, value) => {
    const currentList = filters[key] || [];
    const next = currentList.includes(value)
      ? currentList.filter((v) => v !== value)
      : [...currentList, value];
    onFilterChange({ [key]: next });
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
        <div className="p-6 overflow-y-auto space-y-7 flex-grow text-[#F7F3EA]">
          {/* DYNAMIC FILTERS */}
          {(currentCategory === 'fashion' || currentCategory === 'all') && (
            <>
              {/* Sizes */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-3">
                  Size
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['XS', 'S', 'M', 'L', 'XL'].map((size) => {
                    const isSelected = filters.sizes?.includes(size);
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => toggleArrayItem('sizes', size)}
                        className={`min-w-[44px] h-10 px-3 text-xs font-medium uppercase tracking-wider transition-colors border cursor-pointer ${
                          isSelected
                            ? 'bg-[#C9A45C] text-[#101820] border-[#C9A45C] font-semibold'
                            : 'bg-white/5 text-[#F7F3EA]/80 border-white/10'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Colors */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-3">
                  Color
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {['White', 'Beige', 'Midnight Black', 'Navy Blue', 'Champagne Gold'].map((color) => {
                    const isSelected = filters.colors?.includes(color);
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => toggleArrayItem('colors', color)}
                        className={`py-2 px-3 text-xs uppercase tracking-wider flex items-center justify-between border cursor-pointer ${
                          isSelected
                            ? 'bg-[#C9A45C] text-[#101820] border-[#C9A45C] font-semibold'
                            : 'bg-white/5 text-[#F7F3EA]/80 border-white/10'
                        }`}
                      >
                        <span>{color}</span>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {currentCategory === 'furniture' && (
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-3">
                Room Type
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {['Living Room', 'Bedroom', 'Dining', 'Office', 'Outdoor'].map((room) => {
                  const isSelected = filters.roomTypes?.includes(room);
                  return (
                    <button
                      key={room}
                      type="button"
                      onClick={() => toggleArrayItem('roomTypes', room)}
                      className={`py-2 px-3 text-xs uppercase tracking-wider flex items-center justify-between border cursor-pointer ${
                        isSelected
                          ? 'bg-[#C9A45C] text-[#101820] border-[#C9A45C] font-semibold'
                          : 'bg-white/5 text-[#F7F3EA]/80 border-white/10'
                      }`}
                    >
                      <span>{room}</span>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {currentCategory === 'electronics' && (
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-3">
                Brand
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {['AetherTech', 'Zenith Systems', 'Quantum Audio', 'Visionary Display'].map((brand) => {
                  const isSelected = filters.brands?.includes(brand);
                  return (
                    <button
                      key={brand}
                      type="button"
                      onClick={() => toggleArrayItem('brands', brand)}
                      className={`py-2 px-3 text-xs uppercase tracking-wider flex items-center justify-between border cursor-pointer ${
                        isSelected
                          ? 'bg-[#C9A45C] text-[#101820] border-[#C9A45C] font-semibold'
                          : 'bg-white/5 text-[#F7F3EA]/80 border-white/10'
                      }`}
                    >
                      <span>{brand}</span>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {currentCategory === 'medicines' && (
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-3">
                Prescription Requirement
              </h4>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => onFilterChange({ prescriptionRequired: 'all' })}
                  className={`w-full py-2 px-3 text-xs uppercase tracking-wider text-left border cursor-pointer ${
                    filters.prescriptionRequired === undefined || filters.prescriptionRequired === 'all'
                      ? 'bg-[#C9A45C] text-[#101820] border-[#C9A45C] font-semibold'
                      : 'bg-white/5 text-[#F7F3EA]/80 border-white/10'
                  }`}
                >
                  All Medicines
                </button>
                <button
                  type="button"
                  onClick={() => onFilterChange({ prescriptionRequired: false })}
                  className={`w-full py-2 px-3 text-xs uppercase tracking-wider text-left border cursor-pointer ${
                    filters.prescriptionRequired === false
                      ? 'bg-[#C9A45C] text-[#101820] border-[#C9A45C] font-semibold'
                      : 'bg-white/5 text-[#F7F3EA]/80 border-white/10'
                  }`}
                >
                  Over-the-Counter (No Rx)
                </button>
                <button
                  type="button"
                  onClick={() => onFilterChange({ prescriptionRequired: true })}
                  className={`w-full py-2 px-3 text-xs uppercase tracking-wider text-left border cursor-pointer ${
                    filters.prescriptionRequired === true
                      ? 'bg-amber-400 text-[#101820] border-amber-400 font-semibold'
                      : 'bg-white/5 text-[#F7F3EA]/80 border-white/10'
                  }`}
                >
                  Prescription Required
                </button>
              </div>
            </div>
          )}

          {currentCategory === 'cosmetics' && (
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-3">
                Skin Type
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {['All Skin Types', 'Mature / Normal', 'Sensitive', 'Dry / Damaged'].map((st) => {
                  const isSelected = filters.skinTypes?.includes(st);
                  return (
                    <button
                      key={st}
                      type="button"
                      onClick={() => toggleArrayItem('skinTypes', st)}
                      className={`py-2 px-3 text-xs uppercase tracking-wider flex items-center justify-between border cursor-pointer ${
                        isSelected
                          ? 'bg-[#C9A45C] text-[#101820] border-[#C9A45C] font-semibold'
                          : 'bg-white/5 text-[#F7F3EA]/80 border-white/10'
                      }`}
                    >
                      <span>{st}</span>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price Range */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-3">
              Price Range
            </h4>
            <div className="space-y-2">
              {PRICE_OPTIONS.map((price) => (
                <label
                  key={price.id}
                  className="flex items-center gap-2.5 text-xs text-[#F7F3EA]/80 hover:text-white cursor-pointer py-1"
                >
                  <input
                    type="radio"
                    name="drawer_price"
                    checked={(filters.priceRange || 'all') === price.id}
                    onChange={() => onFilterChange({ priceRange: price.id })}
                    className="accent-[#C9A45C] cursor-pointer"
                  />
                  <span>{price.label}</span>
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
            className="flex-1 py-3.5 px-4 bg-transparent border border-white/20 text-[#F7F3EA] text-xs uppercase tracking-widest font-medium hover:bg-white/10 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
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
