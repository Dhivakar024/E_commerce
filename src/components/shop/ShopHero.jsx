import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const ShopHero = ({ categoryTitle }) => {
  const isAll = !categoryTitle || categoryTitle.toLowerCase() === 'all';
  const heading = isAll ? 'Shop All' : `${categoryTitle}'s Collection`;

  return (
    <section className="relative pt-32 pb-14 sm:pt-36 sm:pb-16 bg-gradient-to-b from-luxury-charcoal/80 via-luxury-black to-luxury-black border-b border-white/5 overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-luxury-gold/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs tracking-wider text-luxury-muted mb-6">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <Link to="/shop" className={`hover:text-white transition-colors ${isAll ? 'text-luxury-champagne font-medium' : ''}`}>
            Shop
          </Link>
          {!isAll && (
            <>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              <span className="text-luxury-champagne font-medium capitalize">
                {categoryTitle}
              </span>
            </>
          )}
        </nav>

        {/* Hero Header Content */}
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-ultra text-luxury-gold block mb-3 font-medium">
            OUR COLLECTION
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-4 leading-tight tracking-tight">
            {heading}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-luxury-cream/75 font-light max-w-xl leading-relaxed">
            Discover thoughtfully designed pieces made for everyday expression. Mastercrafted with noble natural textiles and timeless architectural cuts.
          </p>
        </div>
      </div>
    </section>
  );
};
