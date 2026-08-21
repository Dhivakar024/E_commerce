import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({
  value = '',
  onChange,
  onClear,
  className = '',
}) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A9B0B5] pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="Search by name, category, fabric, or tag..."
        className="w-full bg-white border border-black/15 hover:border-black/30 focus:border-[#C9A45C] text-xs sm:text-sm text-[#101820] placeholder:text-[#A9B0B5] pl-10 pr-10 py-2.5 sm:py-3 transition-colors focus:outline-none shadow-sm"
        aria-label="Search products"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#A9B0B5] hover:text-[#101820] transition-colors"
          aria-label="Clear search text"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
