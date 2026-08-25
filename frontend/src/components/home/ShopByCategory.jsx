import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Shirt, Armchair, Smartphone, Pill, Sparkles } from 'lucide-react';
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

// Individual 3D Interactive Category Card
const CategoryCard3D = ({ cat, index, isVisible }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const IconComponent = cat.icon;

  const handleMouseMove = (e) => {
    // Disable on touch screens/mobile
    if (window.innerWidth < 768 || window.matchMedia('(hover: none)').matches) return;

    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle clamped tilt (-6 to 6 degrees max)
    const rotateX = ((centerY - y) / centerY) * 5.5;
    const rotateY = ((x - centerX) / centerX) * 5.5;

    setTilt({ rotateX, rotateY, scale: 1.02 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translateY(0)'
          : 'translateY(36px)',
        transitionDelay: `${index * 90}ms`,
      }}
    >
      <Link
        to={`/category/${cat.slug}`}
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
          transition:
            tilt.scale === 1
              ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease'
              : 'transform 0.12s ease-out, box-shadow 0.12s ease-out',
        }}
        className="group relative flex flex-col overflow-hidden bg-[#1B2630] border border-white/10 hover:border-[#C9A45C] rounded-none shadow-xl hover:shadow-2xl hover:shadow-black/70 preserve-3d block"
      >
        {/* Visual Image Area */}
        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
          <img
            src={cat.image}
            alt={cat.name}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-90 group-hover:brightness-100"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#101820] via-[#101820]/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />

          {/* 3D Category Icon Tag */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-widest text-[#C9A45C] font-semibold transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
            <IconComponent className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-6" />
            <span>0{index + 1}</span>
          </div>

          <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/50 backdrop-blur-md text-[9px] uppercase tracking-wider text-[#A9B0B5]">
            {cat.itemCount}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 flex flex-col justify-between flex-grow bg-[#1B2630] border-t border-white/5 space-y-3">
          <div>
            <h3 className="font-serif text-xl text-white font-medium mb-1.5 group-hover:text-[#C9A45C] transition-colors">
              {cat.name}
            </h3>
            <p className="text-xs text-[#A9B0B5] leading-relaxed font-light">
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

  return (
    <section
      id="shop-by-category"
      ref={sectionRef}
      className="py-20 sm:py-28 bg-[#101820] relative z-10 overflow-hidden"
    >
      {/* Floating decorative backdrop elements */}
      <div className="absolute top-10 left-8 w-32 h-32 bg-[#C9A45C]/5 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute bottom-10 right-8 w-40 h-40 bg-[#C9A45C]/5 rounded-full blur-3xl pointer-events-none animate-float-reverse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-3 font-semibold">
            SHOP BY CATEGORY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#F7F3EA] mb-3">
            Explore All Categories
          </h2>
          <p className="text-xs sm:text-sm text-[#A9B0B5] font-light leading-relaxed">
            Shop across fashion, furniture, electronics, medicines and cosmetics from LAX360 PVT LTD.
          </p>
        </div>

        {/* 5 Equal 3D Category Cards with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-6">
          {MARKETPLACE_CATEGORIES.map((cat, index) => (
            <CategoryCard3D
              key={cat.id}
              cat={cat}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
