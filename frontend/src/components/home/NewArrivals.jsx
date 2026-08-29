import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useTheme } from '../../context/ThemeContext';

export const NewArrivals = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsVisible, setItemsVisible] = useState(4);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });
  const { isDark } = useTheme();
  const pauseTimeoutRef = useRef(null);

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

  // Responsive items count calculation
  useEffect(() => {
    const updateVisibleItems = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setItemsVisible(4);
      } else if (width >= 1024) {
        setItemsVisible(4);
      } else if (width >= 768) {
        setItemsVisible(3);
      } else if (width >= 480) {
        setItemsVisible(2);
      } else {
        setItemsVisible(2);
      }
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  const totalProducts = newMultiProducts.length;
  const maxIndex = Math.max(0, Math.ceil(totalProducts - itemsVisible));

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const triggerTemporaryPause = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 4500);
  };

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

  // Touch Swipe Handlers
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

  const slideWidthPercent = 100 / itemsVisible;
  const baseTranslate = -(currentIndex * slideWidthPercent);

  return (
    <section
      ref={sectionRef}
      className={`py-16 sm:py-24 relative z-10 overflow-hidden select-none transition-colors duration-250 ${
        isDark ? 'bg-[#101820]' : 'bg-[#F8F6F0]'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header with View All & Carousel Arrows */}
        <div
          className="flex items-end justify-between mb-8 sm:mb-10 border-b border-black/10 dark:border-white/10 pb-5 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <div>
            <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
              NEW RELEASES
            </span>
            <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-normal ${
              isDark ? 'text-white' : 'text-[#101820]'
            }`}>
              New Arrivals
            </h2>
            <p className={`text-xs sm:text-sm font-light mt-1 ${
              isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
            }`}>
              Latest additions across electronics, furniture, beauty, wellness, and fashion.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Carousel Arrows */}
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
                aria-label="Previous new arrivals"
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
                aria-label="Next new arrivals"
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

        {/* Multi-Category Products Sliding Carousel */}
        <div
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
          className="relative overflow-hidden cursor-grab active:cursor-grabbing -mx-2 sm:-mx-2.5"
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
            {newMultiProducts.map((product) => (
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
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
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
                aria-label={`Go to new arrival slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
