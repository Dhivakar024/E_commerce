import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const CartEmptyState = () => {
  return (
    <div className="py-24 sm:py-32 px-6 text-center max-w-md mx-auto space-y-6 animate-fade-in text-[#101820]">
      <div className="w-16 h-16 rounded-full bg-black/5 border border-black/10 flex items-center justify-center mx-auto text-[#C9A45C]">
        <ShoppingBag className="w-8 h-8" />
      </div>

      <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
        SHOPPING BAG
      </span>

      <h2 className="font-serif text-3xl sm:text-4xl text-[#101820] font-normal">
        Your Cart is Empty
      </h2>

      <p className="text-xs sm:text-sm text-[#A9B0B5] font-light leading-relaxed">
        Looks like you haven't added any products yet. Explore our marketplace departments across fashion, furniture, electronics, medicines, and cosmetics.
      </p>

      <div className="pt-2">
        <Link
          to="/shop"
          className="btn-shine inline-flex items-center gap-2.5 px-9 py-4 bg-[#101820] text-[#F7F3EA] hover:bg-[#C9A45C] hover:text-[#101820] text-xs uppercase tracking-widest font-semibold transition-all shadow-xl"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
