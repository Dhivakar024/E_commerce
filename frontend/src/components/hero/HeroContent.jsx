import React from 'react';
import { Link } from 'react-router-dom';

export const HeroContent = () => {
  const scrollToCategories = () => {
    const el = document.getElementById('shop-by-category');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative z-10 max-w-xl lg:max-w-3xl px-1 pt-20 sm:pt-24 md:pt-8 pb-20">
      <p className="mb-3 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.32em] text-[#C9A45C] animate-fade-in opacity-0">
        LAX360 PVT LTD • MULTI-CATEGORY MARKETPLACE
      </p>

      <h1 className="font-serif text-[2.25rem] leading-[1.12] tracking-[0.01em] text-[#F7F3EA] sm:text-5xl md:text-6xl lg:text-[4.25rem] lg:leading-[1.08] mb-4 sm:mb-6 animate-fade-in opacity-0 [animation-delay:120ms]">
        Everything You Need.<br />
        <span className="text-[#C9A45C] italic font-normal">All in One Place.</span>
      </h1>

      <p className="max-w-xl text-sm sm:text-base md:text-lg font-light leading-relaxed text-[#F7F3EA]/90 mb-8 sm:mb-10 animate-fade-in opacity-0 [animation-delay:240ms]">
        Discover fashion, furniture, electronics, cosmetics and everyday essentials from LAX360 PVT LTD.
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 animate-fade-in opacity-0 [animation-delay:380ms]">
        <Link
          to="/shop"
          className="btn-shine inline-flex items-center justify-center rounded-none bg-[#C9A45C] hover:bg-[#D8B872] px-8 py-3.5 text-xs sm:text-[13px] font-semibold uppercase tracking-[0.18em] text-[#101820] shadow-lg shadow-black/40 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
        >
          Shop Now
        </Link>

        <button
          type="button"
          onClick={scrollToCategories}
          className="inline-flex items-center justify-center rounded-none border border-[#F7F3EA]/60 bg-transparent px-8 py-3.5 text-xs sm:text-[13px] font-medium uppercase tracking-[0.18em] text-[#F7F3EA] transition-all duration-300 hover:border-[#F7F3EA] hover:bg-[#F7F3EA]/10 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
        >
          Explore Categories
        </button>
      </div>
    </div>
  );
};
