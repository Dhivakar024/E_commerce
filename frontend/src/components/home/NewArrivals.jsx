import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });

  // Select new arrivals across multiple categories
  const newMultiProducts = [
    PRODUCTS.find((p) => p.slug === 'visionary-pulse-smartphone-pro-5g') || PRODUCTS[21],
    PRODUCTS.find((p) => p.slug === 'nordic-solid-oak-minimalist-coffee-table') || PRODUCTS[11],
    PRODUCTS.find((p) => p.slug === 'volumizing-peptide-lash-brow-fortifying-serum') || PRODUCTS[49],
    PRODUCTS.find((p) => p.slug === 'complete-emergency-family-first-aid-trauma-kit') || PRODUCTS[31],
    PRODUCTS.find((p) => p.slug === 'italian-silk-satin-slip-dress') || PRODUCTS[2],
    PRODUCTS.find((p) => p.slug === 'zenith-pro-16-inch-creator-laptop') || PRODUCTS[23],
    PRODUCTS.find((p) => p.slug === 'luminous-baked-mineral-powder-highlighter') || PRODUCTS[41],
    PRODUCTS.find((p) => p.slug === 'digital-upper-arm-blood-pressure-monitor') || PRODUCTS[32],
  ].filter(Boolean);

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-28 bg-[#101820] relative z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header with View All & Carousel Arrows */}
        <div
          className="flex items-end justify-between mb-12 sm:mb-14 border-b border-white/10 pb-6 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <div>
            <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
              NEW RELEASES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white">
              New Arrivals
            </h2>
            <p className="text-xs sm:text-sm text-[#A9B0B5] font-light mt-1">
              Latest additions across electronics, furniture, beauty, wellness, and fashion.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Carousel Arrows */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={handleScrollLeft}
                className="w-9 h-9 rounded-none border border-white/15 bg-white/5 hover:bg-[#C9A45C] hover:text-[#101820] hover:border-[#C9A45C] text-[#F7F3EA] flex items-center justify-center transition-all cursor-pointer"
                aria-label="Scroll new arrivals left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleScrollRight}
                className="w-9 h-9 rounded-none border border-white/15 bg-white/5 hover:bg-[#C9A45C] hover:text-[#101820] hover:border-[#C9A45C] text-[#F7F3EA] flex items-center justify-center transition-all cursor-pointer"
                aria-label="Scroll new arrivals right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <Link
              to="/shop"
              className="group inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#C9A45C] hover:text-white font-semibold transition-colors"
            >
              <span>View All</span>
              <ArrowUpRight className="w-4 h-4 text-[#C9A45C] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Multi-Category Products Horizontal Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
            transitionDelay: '150ms',
          }}
        >
          {newMultiProducts.map((product) => (
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
