import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight, Shirt, Armchair, Smartphone, Pill, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useTheme } from '../../context/ThemeContext';

const MARKETPLACE_CATEGORIES = [
  {
    id: 'fashion',
    slug: 'fashion',
    name: 'Fashion',
    description: 'Everyday styles and apparel for all occasions.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
    icon: Shirt,
    itemCount: '10+ Items',
  },
  {
    id: 'furniture',
    slug: 'furniture',
    name: 'Furniture',
    description: 'Modern furniture and living space solutions.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop',
    icon: Armchair,
    itemCount: '10+ Items',
  },
  {
    id: 'electronics',
    slug: 'electronics',
    name: 'Electronics',
    description: 'Smart tech, audio and everyday devices.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    icon: Smartphone,
    itemCount: '10+ Items',
  },
  {
    id: 'medicines',
    slug: 'medicines',
    name: 'Medicines',
    description: 'Everyday healthcare and personal wellness.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop',
    icon: Pill,
    itemCount: '10+ Items',
  },
  {
    id: 'cosmetics',
    slug: 'cosmetics',
    name: 'Cosmetics',
    description: 'Clean skincare and beauty essentials.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
    icon: Sparkles,
    itemCount: '10+ Items',
  },
];

// Single Compact 3D Interactive Category Card with Image Depth & Light Sheen
const CategoryCard3D = ({ cat, index, isDark }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1, imageX: 0, imageY: 0, mouseX: 50, mouseY: 50 });
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

    const rotateX = ((centerY - y) / centerY) * 4;
    const rotateY = ((x - centerX) / centerX) * 4;

    const imageX = ((x - centerX) / centerX) * -6;
    const imageY = ((y - centerY) / centerY) * -6;

    const mouseX = Math.round((x / rect.width) * 100);
    const mouseY = Math.round((y / rect.height) * 100);

    setTilt({ rotateX, rotateY, scale: 1.015, imageX, imageY, mouseX, mouseY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1, imageX: 0, imageY: 0, mouseX: 50, mouseY: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 h-full p-2 sm:p-2.5"
    >
      <Link
        to={`/category/${cat.slug}`}
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
          '--mouse-x': `${tilt.mouseX}%`,
          '--mouse-y': `${tilt.mouseY}%`,
          transition:
            tilt.scale === 1
              ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.3s ease'
              : 'transform 0.1s ease-out, box-shadow 0.1s ease-out',
        }}
        className={`group relative flex flex-col h-full overflow-hidden rounded-none shadow-md hover:shadow-2xl preserve-3d block select-none border transition-all duration-300 ${
          isDark
            ? 'bg-[#1B2630] border-white/10 hover:border-[#C9A45C] hover:shadow-[#C9A45C]/10'
            : 'bg-white border-black/10 hover:border-[#B08B43] hover:shadow-[#B08B43]/15'
        }`}
      >
        {/* Dynamic Light Sheen Overlay */}
        <div className="card-sheen-overlay absolute inset-0 z-20 pointer-events-none" />

        {/* Compact Visual Image Area with Parallax Depth */}
        <div className="relative aspect-[16/11] overflow-hidden bg-neutral-900 flex-shrink-0">
          <img
            src={cat.image}
            alt={cat.name}
            loading="lazy"
            draggable={false}
            style={{
              transform: `translate3d(${tilt.imageX}px, ${tilt.imageY}px, 0) scale(${tilt.scale > 1 ? 1.08 : 1})`,
              transition: tilt.scale === 1 ? 'transform 0.5s ease-out' : 'transform 0.1s ease-out',
            }}
            className="w-full h-full object-cover object-center filter brightness-90 group-hover:brightness-100"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-85 group-hover:opacity-70 transition-opacity duration-500" />

          {/* Category Index Badge */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 bg-black/60 backdrop-blur-md border border-white/15 text-[9px] uppercase tracking-widest text-[#C9A45C] font-semibold transition-transform duration-300 group-hover:scale-105">
            <IconComponent className="w-3 h-3 text-[#C9A45C]" />
            <span>0{index + 1}</span>
          </div>

          <div className="absolute top-2.5 right-2.5 px-1.5 py-0.5 bg-black/50 backdrop-blur-md text-[8px] uppercase tracking-wider text-white/80">
            {cat.itemCount}
          </div>
        </div>

        {/* Card Content with Exact Uniform Height */}
        <div className={`p-3.5 sm:p-4 flex flex-col justify-between flex-grow border-t space-y-2.5 ${
          isDark
            ? 'bg-[#1B2630] border-white/5 text-white'
            : 'bg-white border-black/5 text-[#101820]'
        }`}>
          <div>
            <h3 className={`font-serif text-base sm:text-lg font-medium mb-1 transition-colors ${
              isDark
                ? 'text-white group-hover:text-[#C9A45C]'
                : 'text-[#101820] group-hover:text-[#B08B43]'
            }`}>
              {cat.name}
            </h3>
            <p className={`text-[11px] sm:text-xs leading-relaxed font-light line-clamp-2 h-8 ${
              isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
            }`}>
              {cat.description}
            </p>
          </div>

          {/* Explore Link */}
          <div className={`pt-2.5 border-t flex items-center justify-between text-[10px] sm:text-xs tracking-wider uppercase font-semibold ${
            isDark
              ? 'border-white/10 text-[#C9A45C]'
              : 'border-black/5 text-[#B08B43]'
          }`}>
            <span>Explore Department</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export const ShopByCategory = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsVisible, setItemsVisible] = useState(4);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const { isDark } = useTheme();
  const pauseTimeoutRef = useRef(null);
  const containerRef = useRef(null);

  const totalItems = MARKETPLACE_CATEGORIES.length;

  // Responsive items calculation for compact category carousel
  useEffect(() => {
    const updateVisibleItems = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setItemsVisible(4);
      } else if (width >= 1024) {
        setItemsVisible(3);
      } else if (width >= 640) {
        setItemsVisible(2);
      } else {
        setItemsVisible(1.2);
      }
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  const maxIndex = Math.max(0, Math.ceil(totalItems - itemsVisible));

  // Safe navigation functions with cyclic looping
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
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
    if (prefersReducedMotion || isPaused || isDragging || maxIndex === 0) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4200);

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
      className={`py-14 sm:py-20 relative z-10 overflow-hidden select-none transition-colors duration-250 border-y ${
        isDark ? 'bg-[#151F28] border-white/[0.08]' : 'bg-[#EDE9DF] border-black/[0.08]'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header with Carousel Controls */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 border-b border-black/10 dark:border-white/10 pb-5 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <div>
            <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
              SHOP BY CATEGORY
            </span>
            <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-normal mb-2 ${
              isDark ? 'text-[#F7F3EA]' : 'text-[#101820]'
            }`}>
              Explore All Categories
            </h2>
            <p className={`text-xs sm:text-sm font-light leading-relaxed ${
              isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
            }`}>
              Browse across fashion, furniture, electronics, medicines and cosmetics from LAX360 PVT LTD.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 mt-4 md:mt-0">
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
                aria-label="Previous categories"
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
                aria-label="Next categories"
              >
                <ChevronRight className="w-4 h-4" />
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
          className="relative overflow-hidden cursor-grab active:cursor-grabbing -mx-2 sm:-mx-2.5"
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
                <CategoryCard3D cat={cat} index={index} isDark={isDark} />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
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
                aria-label={`Go to category slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
