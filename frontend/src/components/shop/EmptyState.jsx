import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

export const EmptyState = ({ onClearFilters }) => {
  return (
    <div className="py-24 sm:py-32 px-6 text-center max-w-md mx-auto flex flex-col items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-black/5 border border-black/10 flex items-center justify-center mb-6 text-[#C9A45C]">
        <SearchX className="w-8 h-8" />
      </div>

      <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
        MARKETPLACE DISCOVERY
      </span>

      <h3 className="font-serif text-2xl sm:text-3xl text-[#101820] font-normal mb-3">
        No Products Found
      </h3>

      <p className="text-xs sm:text-sm text-[#A9B0B5] font-light leading-relaxed mb-8">
        We couldn't find products matching your selected filters in this category. Try adjusting your filters or clearing search terms.
      </p>

      <button
        onClick={onClearFilters}
        className="btn-shine inline-flex items-center gap-2 px-8 py-3.5 bg-[#101820] text-[#F7F3EA] hover:bg-[#C9A45C] hover:text-[#101820] text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Clear All Filters</span>
      </button>
    </div>
  );
};
