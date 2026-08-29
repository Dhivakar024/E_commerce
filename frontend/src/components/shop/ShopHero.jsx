import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ShopHero = ({ categoryTitle }) => {
  const { isDark } = useTheme();
  const isAll = !categoryTitle || categoryTitle.toLowerCase() === 'all';
  const heading = isAll ? 'All Marketplace Products' : `${categoryTitle}'s Department`;

  return (
    <section className={`relative pt-32 pb-14 sm:pt-36 sm:pb-16 border-b overflow-hidden transition-colors duration-250 ${
      isDark
        ? 'bg-gradient-to-b from-[#1B2630] via-[#101820] to-[#101820] border-white/10 text-white'
        : 'bg-gradient-to-b from-[#EFECE6] via-[#F8F6F0] to-[#F8F6F0] border-black/10 text-[#101820]'
    }`}>
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-[#C9A45C]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className={`flex items-center gap-2 text-xs tracking-wider mb-6 ${
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
                {categoryTitle}
              </span>
            </>
          )}
        </nav>

        {/* Hero Header Content */}
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-3 font-semibold">
            LAX360 MARKETPLACE
          </span>
          <h1 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-normal mb-4 leading-tight tracking-tight ${
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
