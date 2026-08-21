import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const CartHeader = ({ itemCount = 0 }) => {
  return (
    <div className="mb-10 sm:mb-12">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs tracking-wider text-[#A9B0B5] mb-6">
        <Link to="/" className="hover:text-[#101820] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 opacity-50" />
        <span className="text-[#C9A45C] font-semibold">Shopping Cart</span>
      </nav>

      {/* Title & Dynamic Count */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-black/10 gap-4">
        <div>
          <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
            YOUR BAG
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#101820]">
            Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-[#A9B0B5] font-light mt-2">
            Review your selected pieces before checkout.
          </p>
        </div>

        {itemCount > 0 && (
          <span className="text-xs uppercase tracking-widest text-[#101820] font-semibold bg-white border border-black/10 px-3.5 py-1.5 self-start sm:self-auto shadow-sm">
            {itemCount} {itemCount === 1 ? 'Item' : 'Items'} in Bag
          </span>
        )}
      </div>
    </div>
  );
};
