import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sparkles } from 'lucide-react';

const MARQUEE_ITEMS = [
  'FASHION & APPAREL',
  'FURNITURE & LIVING',
  'ELECTRONICS & GADGETS',
  'MEDICINES & WELLNESS',
  'COSMETICS & BEAUTY',
  'LAX360 PVT LTD',
  'VERIFIED AUTHENTIC',
  'EXPRESS DELIVERY',
];

export const MarketplaceMarquee = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`relative w-full overflow-hidden border-y py-3 select-none transition-colors duration-250 ${
        isDark
          ? 'bg-[#141E28] border-white/10 text-[#F7F3EA]'
          : 'bg-[#F2EFE9] border-black/10 text-[#101820]'
      }`}
      aria-hidden="true"
    >
      {/* Left/Right Edge Fades for Seamless Look */}
      <div
        className={`absolute left-0 inset-y-0 w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-r ${
          isDark ? 'from-[#141E28] to-transparent' : 'from-[#F2EFE9] to-transparent'
        }`}
      />
      <div
        className={`absolute right-0 inset-y-0 w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-l ${
          isDark ? 'from-[#141E28] to-transparent' : 'from-[#F2EFE9] to-transparent'
        }`}
      />

      <div className="animate-marquee flex items-center whitespace-nowrap">
        {/* Render 2 identical sets for seamless continuous loop */}
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 sm:gap-10 mx-3 sm:mx-5">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] uppercase transition-colors hover:text-[#C9A45C]">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C] flex-shrink-0 opacity-80" />
          </div>
        ))}
      </div>
    </div>
  );
};
