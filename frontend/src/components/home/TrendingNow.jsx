import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useTheme } from '../../context/ThemeContext';

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
  const { isDark } = useTheme();
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

  // Responsive items count calculation (Desktop: 4, Laptop: 3-4, Tablet: 2-3, Mobile: 2)
  useEffect(() => {
    const updateVisibleItems = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setItemsVisible(4); // Desktop Large: 4 cards
      } else if (width >= 1024) {
        setItemsVisible(4); // Desktop standard: 4 cards
      } else if (width >= 768) {
        setItemsVisible(3); // Tablet: 3 cards
      } else if (width >= 480) {
        setItemsVisible(2); // Small Tablet / Large Mobile: 2 cards
      } else {
        setItemsVisible(2); // Mobile: 2 cards for compact balanced display
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
  const maxIndex = Math.max(0, Math.ceil(totalProducts - itemsVisible));

  // Navigation handlers with seamless loop
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  // Pause on user interaction and resume after 4.5s
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
    }, 4000);

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
    if (dragOffset < -45) {
      handleNext();
    } else if (dragOffset > 45) {
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
    if (dragOffset < -35) {
      handleNext();
    } else if (dragOffset > 35) {
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
      className={`py-10 sm:py-14 relative z-10 overflow-hidden select-none transition-colors duration-250 ${
        isDark ? 'bg-[#101820]' : 'bg-[#F8F6F0]'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header with Carousel Controls */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between mb-5 sm:mb-6 border-b border-black/10 dark:border-white/10 pb-4 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <div>
            <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
              MARKETPLACE HIGHLIGHTS
            </span>
            <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-normal mb-2 ${
              isDark ? 'text-white' : 'text-[#101820]'
            }`}>
              Trending Now
            </h2>
            <p className={`text-xs sm:text-sm font-light ${
              isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
            }`}>
              Top-rated selections across electronics, home furniture, fashion, health and cosmetics.
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {/* Carousel Prev/Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  triggerTemporaryPause();
                  handlePrev();
                }}
                className={`w-9 h-9 rounded-none border flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md active:scale-95 ${
                  isDark
                    ? 'border-white/15 bg-[#1B2630] hover:bg-[#C9A45C] hover:text-[#101820] hover:border-[#C9A45C] text-[#F7F3EA]'
                    : 'border-black/10 bg-white hover:bg-[#B08B43] hover:text-white hover:border-[#B08B43] text-[#101820]'
                }`}
                aria-label="Previous trending products"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  triggerTemporaryPause();
                  handleNext();
                }}
                className={`w-9 h-9 rounded-none border flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md active:scale-95 ${
                  isDark
                    ? 'border-white/15 bg-[#1B2630] hover:bg-[#C9A45C] hover:text-[#101820] hover:border-[#C9A45C] text-[#F7F3EA]'
                    : 'border-black/10 bg-white hover:bg-[#B08B43] hover:text-white hover:border-[#B08B43] text-[#101820]'
                }`}
                aria-label="Next trending products"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <Link
              to="/shop"
              className="group hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#C9A45C] hover:text-[#B08B43] font-semibold transition-colors ml-2"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C9A45C] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Category Quick Navigation Filter Tabs */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 scrollbar-none transition-all duration-700 ease-out"
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
                className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#C9A45C] text-[#101820] shadow-md scale-105'
                    : isDark
                      ? 'bg-white/5 text-[#A9B0B5] hover:text-white hover:bg-white/10 border border-white/10'
                      : 'bg-white text-[#4A5560] hover:text-[#101820] hover:bg-black/5 border border-black/10 shadow-xs'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Auto-scrolling Sliding Product Track with Drag & Touch Support & 3D Perspective */}
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
          className="relative overflow-hidden cursor-grab active:cursor-grabbing -mx-2 sm:-mx-2.5 perspective-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            transitionDelay: '150ms',
          }}
        >
          <div
            className="flex transition-transform duration-500 ease-out preserve-3d"
            style={{
              transform: `translate3d(${baseTranslate}%, 0, 0) translate3d(${dragOffset}px, 0, 0)`,
              transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {displayedProducts.map((product) => (
              <div
                key={product.id}
                style={{ width: `${slideWidthPercent}%`, flexShrink: 0 }}
                className="p-2 sm:p-2.5 h-full"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination indicator dots */}
        {maxIndex > 0 && (
          <div className="flex items-center justify-center gap-1.5 mt-6">
            {Array.from({ length: Math.min(8, maxIndex + 1) }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  triggerTemporaryPause();
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-6 bg-[#C9A45C]'
                    : isDark ? 'w-1.5 bg-white/20 hover:bg-white/40' : 'w-1.5 bg-black/20 hover:bg-black/40'
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
