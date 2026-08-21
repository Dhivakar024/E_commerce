import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

export const EmptyState = ({ onClearFilters }) => {
  return (
    <div className="py-24 sm:py-32 px-6 text-center max-w-md mx-auto flex flex-col items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-luxury-gold">
        <SearchX className="w-8 h-8" />
      </div>

      <span className="text-xs uppercase tracking-ultra text-luxury-gold block mb-2 font-medium">
        NO MATCHES
      </span>

      <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-3">
        No products found
      </h3>

      <p className="text-xs sm:text-sm text-luxury-muted font-light leading-relaxed mb-8">
        Try adjusting your filters or search for something else to explore our collection.
      </p>

      <button
        onClick={onClearFilters}
        className="btn-shine inline-flex items-center gap-2 px-8 py-3.5 bg-white text-luxury-black hover:bg-luxury-champagne text-xs uppercase tracking-widest font-medium transition-colors"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Clear All Filters</span>
      </button>
    </div>
  );
};
