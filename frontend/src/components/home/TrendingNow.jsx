import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsVisible, setItemsVisible] = useState(4);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });
  const pauseTimeoutRef = useRef(null);
  const containerRef = useRef(null);

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
        PRODUCTS.find((p) => p.slug === 'visionary-pulse-smartphone-pro-5g') || PRODUCTS[21],
        PRODUCTS.find((p) => p.slug === 'volumizing-peptide-lash-brow-fortifying-serum') || PRODUCTS[49],
      ].filter(Boolean);
    }
    return PRODUCTS.filter(
      (p) => (p.categorySlug || p.category || '').toLowerCase() === activeCategory.toLowerCase()
    );
  }, [activeCategory]);

  // Responsive items count calculation (Desktop: 4, Tablet: 2-3, Mobile: 1-2)
  useEffect(() => {
    const updateVisibleItems = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setItemsVisible(4); // Desktop large: 4 cards
      } else if (width >= 1024) {
        setItemsVisible(3); // Desktop standard: 3 cards
      } else if (width >= 640) {
        setItemsVisible(2); // Tablet: 2 cards
      } else {
        setItemsVisible(1); // Mobile: 1 card with peek
      }
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  // Reset carousel to first slide when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  const totalProducts = displayedProducts.length;
  const maxIndex = Math.max(0, totalProducts - itemsVisible);

  // Navigation handlers with seamless loop
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  // Pause on user interaction and resume after 4s
  const triggerTemporaryPause = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 4500);
  };

  // Auto-scroll effect
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isPaused || isDragging || maxIndex === 0) return;

    const interval = setInterval(() => {
      handleNext();
    }, 3800);

    return () => clearInterval(interval);
  }, [isPaused, isDragging, maxIndex, handleNext]);

  // Mouse Drag Handlers
  const handleMouseDown = (e) => {
    triggerTemporaryPause();
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - startX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    if (dragOffset < -50) {
      handleNext();
    } else if (dragOffset > 50) {
      handlePrev();
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    triggerTemporaryPause();
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    if (dragOffset < -40) {
      handleNext();
    } else if (dragOffset > 40) {
      handlePrev();
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  // Calculate slide translation percentage
  const slideWidthPercent = 100 / itemsVisible;
  const baseTranslate = -(currentIndex * slideWidthPercent);

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-28 bg-[#101820] relative z-10 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header with Carousel Controls */}
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

          <div className="flex items-center gap-4 mt-5 md:mt-0">
            {/* Carousel Prev/Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  triggerTemporaryPause();
                  handlePrev();
                }}
                className="w-10 h-10 rounded-none border border-white/15 bg-[#1B2630] hover:bg-[#C9A45C] hover:text-[#101820] hover:border-[#C9A45C] text-[#F7F3EA] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
                aria-label="Previous trending products"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  triggerTemporaryPause();
                  handleNext();
                }}
                className="w-10 h-10 rounded-none border border-white/15 bg-[#1B2630] hover:bg-[#C9A45C] hover:text-[#101820] hover:border-[#C9A45C] text-[#F7F3EA] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
                aria-label="Next trending products"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <Link
              to="/shop"
              className="group hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C9A45C] hover:text-white font-semibold transition-colors ml-2"
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
                onClick={() => {
                  triggerTemporaryPause();
                  setActiveCategory(tab.slug);
                }}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#C9A45C] text-[#101820] shadow-lg scale-105'
                    : 'bg-white/5 text-[#A9B0B5] hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Auto-scrolling Sliding Product Track with Drag & Touch Support */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            if (!isDragging) setIsPaused(false);
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative overflow-hidden cursor-grab active:cursor-grabbing -mx-3"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            transitionDelay: '150ms',
          }}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translate3d(${baseTranslate}%, 0, 0) translate3d(${dragOffset}px, 0, 0)`,
              transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {displayedProducts.map((product) => (
              <div
                key={product.id}
                style={{ width: `${slideWidthPercent}%`, flexShrink: 0 }}
                className="p-3 h-full"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination indicator dots */}
        {maxIndex > 0 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: Math.min(10, maxIndex + 1) }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  triggerTemporaryPause();
                  setCurrentIndex(idx);
                }}
                className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-7 bg-[#C9A45C]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to product slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
