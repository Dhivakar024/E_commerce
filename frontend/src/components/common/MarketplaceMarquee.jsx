import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const MARQUEE_ITEMS = [
  'FASHION & APPAREL',
  'FURNITURE & LIVING',
  'ELECTRONICS & GADGETS',
  'MEDICINES & WELLNESS',
  'COSMETICS & BEAUTY',
  'LAX360 PVT LTD',
  'VERIFIED AUTHENTIC',
  'EXPRESS NATIONWIDE DELIVERY',
];

export const MarketplaceMarquee = () => {
  const { isDark } = useTheme();

  return (
    <section
      className={`relative w-full max-w-none overflow-hidden border-y py-3.5 sm:py-4 select-none transition-colors duration-250 ${
        isDark
          ? 'bg-[#151F28] border-white/[0.08] text-[#F7F3EA]'
          : 'bg-[#EDE9DF] border-black/[0.08] text-[#101820]'
      }`}
      aria-label="Marketplace departments marquee"
    >
      {/* Left/Right Edge Fades for Seamless Look */}
      <div
        className={`absolute left-0 inset-y-0 w-12 sm:w-24 z-10 pointer-events-none bg-gradient-to-r ${
          isDark ? 'from-[#151F28] to-transparent' : 'from-[#EDE9DF] to-transparent'
        }`}
      />
      <div
        className={`absolute right-0 inset-y-0 w-12 sm:w-24 z-10 pointer-events-none bg-gradient-to-l ${
          isDark ? 'from-[#151F28] to-transparent' : 'from-[#EDE9DF] to-transparent'
        }`}
      />

      <div className="animate-marquee flex items-center whitespace-nowrap">
        {/* Render 4 sets to ensure 100% full-width coverage and seamless infinite marquee animation on 1920px+ displays */}
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 sm:gap-10 mx-3 sm:mx-6 flex-shrink-0">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] uppercase transition-colors hover:text-[#C9A45C]">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C] flex-shrink-0 opacity-80" />
          </div>
        ))}
      </div>
    </section>
  );
};
