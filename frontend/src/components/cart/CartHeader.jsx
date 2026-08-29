import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const CartHeader = ({ itemCount = 0 }) => {
  const { isDark } = useTheme();

  return (
    <div className="mb-10 sm:mb-12">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className={`flex items-center gap-2 text-xs tracking-wider mb-6 ${
        isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
      }`}>
        <Link to="/" className="hover:text-[#C9A45C] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 opacity-50" />
        <span className="text-[#C9A45C] font-semibold">Shopping Bag</span>
      </nav>

      {/* Title & Dynamic Count */}
      <div className={`flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b gap-4 ${
        isDark ? 'border-white/10' : 'border-black/10'
      }`}>
        <div>
          <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
            YOUR BAG
          </span>
          <h1 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-normal ${
            isDark ? 'text-white' : 'text-[#101820]'
          }`}>
            Shopping Bag
          </h1>
          <p className={`text-xs sm:text-sm font-light mt-2 ${
            isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
          }`}>
            Review your selected marketplace items before proceeding to checkout.
          </p>
        </div>

        {itemCount > 0 && (
          <span className={`text-xs uppercase tracking-widest font-semibold border px-3.5 py-1.5 self-start sm:self-auto shadow-sm ${
            isDark ? 'bg-[#1B2630] border-white/10 text-white' : 'bg-white border-black/10 text-[#101820]'
          }`}>
            {itemCount} {itemCount === 1 ? 'Item' : 'Items'} in Bag
          </span>
        )}
      </div>
    </div>
  );
};
