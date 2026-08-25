import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight, Shirt, Armchair, Smartphone, Pill, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const MARKETPLACE_CATEGORIES = [
  {
    id: 'fashion',
    slug: 'fashion',
    name: 'Fashion',
    description: 'Discover everyday styles for every occasion.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
    icon: Shirt,
    itemCount: '10+ Items',
  },
  {
    id: 'furniture',
    slug: 'furniture',
    name: 'Furniture',
    description: 'Transform your home with modern furniture.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop',
    icon: Armchair,
    itemCount: '10+ Items',
  },
  {
    id: 'electronics',
    slug: 'electronics',
    name: 'Electronics',
    description: 'Explore smart devices and everyday technology.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    icon: Smartphone,
    itemCount: '10+ Items',
  },
  {
    id: 'medicines',
    slug: 'medicines',
    name: 'Medicines',
    description: 'Everyday healthcare and personal wellness essentials.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop',
    icon: Pill,
    itemCount: '10+ Items',
  },
  {
    id: 'cosmetics',
    slug: 'cosmetics',
    name: 'Cosmetics',
    description: 'Beauty, skincare and personal care essentials.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
    icon: Sparkles,
    itemCount: '10+ Items',
  },
];

// Single 3D Interactive Category Card with Clamped Tilt
const CategoryCard3D = ({ cat, index }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const IconComponent = cat.icon;

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768 || window.matchMedia('(hover: none)').matches) return;

    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * 4.5;
    const rotateY = ((x - centerX) / centerX) * 4.5;

    setTilt({ rotateX, rotateY, scale: 1.015 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 h-full p-2.5 sm:p-3"
    >
      <Link
        to={`/category/${cat.slug}`}
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
          transition:
            tilt.scale === 1
              ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease'
              : 'transform 0.12s ease-out, box-shadow 0.12s ease-out',
        }}
        className="group relative flex flex-col h-full overflow-hidden bg-[#1B2630] border border-white/10 hover:border-[#C9A45C] rounded-none shadow-xl hover:shadow-2xl hover:shadow-black/70 preserve-3d block select-none"
      >
        {/* Visual Image Area */}
        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 flex-shrink-0">
          <img
            src={cat.image}
            alt={cat.name}
            loading="lazy"
            draggable={false}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-90 group-hover:brightness-100"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#101820] via-[#101820]/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />

          {/* 3D Category Icon Tag */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-widest text-[#C9A45C] font-semibold transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
            <IconComponent className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-6" />
            <span>0{index + 1}</span>
          </div>

          <div className="absolute top-3.5 right-3.5 px-2 py-0.5 bg-black/50 backdrop-blur-md text-[9px] uppercase tracking-wider text-[#A9B0B5]">
            {cat.itemCount}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 flex flex-col justify-between flex-grow bg-[#1B2630] border-t border-white/5 space-y-3">
          <div>
            <h3 className="font-serif text-xl text-white font-medium mb-1.5 group-hover:text-[#C9A45C] transition-colors">
              {cat.name}
            </h3>
            <p className="text-xs text-[#A9B0B5] leading-relaxed font-light line-clamp-2">
              {cat.description}
            </p>
          </div>

          {/* Explore Link with Slide Micro-interaction */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs tracking-widest uppercase text-[#C9A45C] font-semibold">
            <span>Explore</span>
            <ArrowUpRight className="w-4 h-4 text-[#C9A45C] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export const ShopByCategory = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsVisible, setItemsVisible] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const pauseTimeoutRef = useRef(null);
  const containerRef = useRef(null);

  const totalItems = MARKETPLACE_CATEGORIES.length;

  // Responsive items calculation
  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth >= 1024) {
        setItemsVisible(3); // Desktop: 3 cards
      } else if (window.innerWidth >= 640) {
        setItemsVisible(2); // Tablet: 2 cards
      } else {
        setItemsVisible(1); // Mobile: 1 card
      }
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  const maxIndex = Math.max(0, totalItems - itemsVisible);

  // Safe navigation functions with cyclic looping
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  // Pause autoplay temporarily on interaction
  const triggerTemporaryPause = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 4500);
  };

  // Autoplay effect
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isPaused || isDragging) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, isDragging, handleNext]);

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
      id="shop-by-category"
      ref={sectionRef}
      className="py-20 sm:py-28 bg-[#101820] relative z-10 overflow-hidden select-none"
    >
      {/* Floating decorative backdrop elements */}
      <div className="absolute top-10 left-8 w-32 h-32 bg-[#C9A45C]/5 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute bottom-10 right-8 w-40 h-40 bg-[#C9A45C]/5 rounded-full blur-3xl pointer-events-none animate-float-reverse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header with Carousel Controls */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 border-b border-white/10 pb-6 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <div>
            <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
              SHOP BY CATEGORY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#F7F3EA] mb-2">
              Explore All Categories
            </h2>
            <p className="text-xs sm:text-sm text-[#A9B0B5] font-light leading-relaxed">
              Browse across fashion, furniture, electronics, medicines and cosmetics from LAX360 PVT LTD.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 mt-5 md:mt-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  triggerTemporaryPause();
                  handlePrev();
                }}
                className="w-10 h-10 rounded-none border border-white/15 bg-[#1B2630] hover:bg-[#C9A45C] hover:text-[#101820] hover:border-[#C9A45C] text-[#F7F3EA] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
                aria-label="Previous categories"
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
                aria-label="Next categories"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Sliding Viewport Container */}
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
          className="relative overflow-hidden cursor-grab active:cursor-grabbing -mx-2.5 sm:-mx-3"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translate3d(${baseTranslate}%, 0, 0) translate3d(${dragOffset}px, 0, 0)`,
              transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {MARKETPLACE_CATEGORIES.map((cat, index) => (
              <div
                key={cat.id}
                style={{ width: `${slideWidthPercent}%`, flexShrink: 0 }}
              >
                <CategoryCard3D cat={cat} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
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
              aria-label={`Go to category slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
