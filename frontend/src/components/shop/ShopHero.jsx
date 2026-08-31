import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ShopHero = ({ categoryTitle, activeCategory }) => {
  const { isDark } = useTheme();
  const currentCat = categoryTitle || activeCategory;
  const isAll = !currentCat || currentCat.toLowerCase() === 'all';
  const heading = isAll ? 'All Marketplace Products' : `${currentCat}'s Department`;

  return (
    <section className={`relative pt-2 pb-6 sm:pt-3 sm:pb-8 border-b overflow-hidden transition-colors duration-250 ${
      isDark
        ? 'bg-gradient-to-b from-[#151F28] via-[#101820] to-[#101820] border-white/[0.08] text-white'
        : 'bg-gradient-to-b from-[#EDE9DF] via-[#F8F6F0] to-[#F8F6F0] border-black/[0.08] text-[#101820]'
    }`}>
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-36 bg-[#C9A45C]/5 blur-[90px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className={`flex items-center gap-1.5 sm:gap-2 text-xs tracking-wider mb-3.5 sm:mb-4 ${
          isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
        }`}>
          <Link to="/" className="hover:text-[#C9A45C] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <Link to="/shop" className={`hover:text-[#C9A45C] transition-colors ${isAll ? 'text-[#C9A45C] font-semibold' : ''}`}>
            Shop
          </Link>
          {!isAll && (
            <>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              <span className="text-[#C9A45C] font-semibold capitalize">
                {currentCat}
              </span>
            </>
          )}
        </nav>

        {/* Hero Header Content */}
        <div className="max-w-3xl space-y-1.5 sm:space-y-2">
          <span className="text-[10px] sm:text-xs uppercase tracking-ultra text-[#C9A45C] block font-semibold">
            LAX360 MARKETPLACE
          </span>
          <h1 className={`font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-normal leading-tight tracking-tight ${
            isDark ? 'text-white' : 'text-[#101820]'
          }`}>
            {heading}
          </h1>
          <p className={`text-xs sm:text-sm font-light max-w-xl leading-relaxed ${
            isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
          }`}>
            Explore our curated catalog spanning fashion, furniture, electronics, medicines, and cosmetics with nationwide verified delivery.
          </p>
        </div>
      </div>
    </section>
  );
};
