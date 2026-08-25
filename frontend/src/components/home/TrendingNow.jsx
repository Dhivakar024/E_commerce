import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const QUICK_FILTER_TABS = [
  { label: 'ALL', slug: 'all' },
  { label: 'FASHION', slug: 'fashion' },
  { label: 'FURNITURE', slug: 'furniture' },
  { label: 'ELECTRONICS', slug: 'electronics' },
  { label: 'MEDICINES', slug: 'medicines' },
  { label: 'COSMETICS', slug: 'cosmetics' },
];

export const TrendingNow = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const scrollContainerRef = useRef(null);
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });

  // Filter products based on selected category tab
  const displayedProducts = useMemo(() => {
    if (activeCategory === 'all') {
      return [
        PRODUCTS.find((p) => p.slug === 'aura-wireless-noise-cancelling-headphones') || PRODUCTS[20],
        PRODUCTS.find((p) => p.slug === 'sculptural-boucle-armchair-in-ivory') || PRODUCTS[12],
        PRODUCTS.find((p) => p.slug === 'classic-pure-linen-shirt') || PRODUCTS[0],
        PRODUCTS.find((p) => p.slug === 'hyaluronic-botanical-deep-hydration-serum') || PRODUCTS[40],
        PRODUCTS.find((p) => p.slug === 'advanced-daily-multivitamin-immunity-complex') || PRODUCTS[30],
        PRODUCTS.find((p) => p.slug === 'lumina-pro-65-inch-oled-4k-smart-tv') || PRODUCTS[22],
        PRODUCTS.find((p) => p.slug === 'solid-teak-dining-table-expandable') || PRODUCTS[10],
        PRODUCTS.find((p) => p.slug === 'signature-tailored-wool-blazer') || PRODUCTS[1],
      ].filter(Boolean);
    }
    return PRODUCTS.filter(
      (p) => (p.categorySlug || p.category || '').toLowerCase() === activeCategory.toLowerCase()
    ).slice(0, 8);
  }, [activeCategory]);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-28 bg-[#101820] relative z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-white/10 pb-6 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <div>
            <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
              MARKETPLACE HIGHLIGHTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-2">
              Trending Now
            </h2>
            <p className="text-xs sm:text-sm text-[#A9B0B5] font-light">
              Top-rated selections across electronics, home furniture, fashion, health and cosmetics.
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {/* Carousel Prev/Next Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={handleScrollLeft}
                className="w-9 h-9 rounded-none border border-white/15 bg-white/5 hover:bg-[#C9A45C] hover:text-[#101820] hover:border-[#C9A45C] text-[#F7F3EA] flex items-center justify-center transition-all cursor-pointer"
                aria-label="Scroll carousel left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleScrollRight}
                className="w-9 h-9 rounded-none border border-white/15 bg-white/5 hover:bg-[#C9A45C] hover:text-[#101820] hover:border-[#C9A45C] text-[#F7F3EA] flex items-center justify-center transition-all cursor-pointer"
                aria-label="Scroll carousel right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C9A45C] hover:text-white font-semibold transition-colors"
            >
              <span>View All</span>
              <ArrowUpRight className="w-4 h-4 text-[#C9A45C] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Category Quick Navigation Filter Tabs */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
            transitionDelay: '100ms',
          }}
        >
          {QUICK_FILTER_TABS.map((tab) => {
            const isActive = activeCategory === tab.slug;
            return (
              <button
                key={tab.slug}
                type="button"
                onClick={() => setActiveCategory(tab.slug)}
                className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#C9A45C] text-[#101820] shadow-md scale-105'
                    : 'bg-white/5 text-[#A9B0B5] hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Horizontal Smooth Carousel with Snap on Mobile */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
            transitionDelay: '200ms',
          }}
        >
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="w-[82vw] sm:w-[320px] md:w-[300px] lg:w-[285px] flex-shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
