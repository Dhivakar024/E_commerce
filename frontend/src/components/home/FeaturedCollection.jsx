import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shirt, Armchair, Smartphone, Pill, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useTheme } from '../../context/ThemeContext';

const STORE_BLOCKS = [
  {
    category: 'Fashion',
    title: 'Modern Apparel & Footwear',
    description: 'Timeless styles, refined workwear, and comfortable casuals for men, women, and kids.',
    cta: 'Shop Fashion',
    link: '/category/fashion',
    icon: Shirt,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop',
  },
  {
    category: 'Furniture',
    title: 'Home & Living Essentials',
    description: 'Architectural living room sofas, solid teak dining tables, and ergonomic office comfort.',
    cta: 'Explore Furniture',
    link: '/category/furniture',
    icon: Armchair,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
  },
  {
    category: 'Electronics',
    title: 'Smart Tech & Gadgets',
    description: 'OLED 4K displays, high-speed laptops, flagship smartphones, and pro audio gear.',
    cta: 'Discover Electronics',
    link: '/category/electronics',
    icon: Smartphone,
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=800&auto=format&fit=crop',
  },
  {
    category: 'Medicines',
    title: 'Health & Personal Wellness',
    description: 'Certified multivitamins, first-aid safety kits, herbal care, and diagnostic monitors.',
    cta: 'Shop Wellness',
    link: '/category/medicines',
    icon: Pill,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop',
  },
  {
    category: 'Cosmetics',
    title: 'Beauty & Skincare Formulations',
    description: 'Hydrating serums, velvet matte lip shades, luminous highlighters, and clean beauty.',
    cta: 'Explore Beauty',
    link: '/category/cosmetics',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop',
  },
];

// Single 3D Interactive Hub Card
const HubCard3D = ({ block, idx, isVisible, isDark }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1, imageX: 0, imageY: 0, mouseX: 50, mouseY: 50 });
  const Icon = block.icon;

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768 || window.matchMedia('(hover: none)').matches) return;

    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * 3;
    const rotateY = ((x - centerX) / centerX) * 3;

    const imageX = ((x - centerX) / centerX) * -5;
    const imageY = ((y - centerY) / centerY) * -5;

    const mouseX = Math.round((x / rect.width) * 100);
    const mouseY = Math.round((y / rect.height) * 100);

    setTilt({ rotateX, rotateY, scale: 1.012, imageX, imageY, mouseX, mouseY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1, imageX: 0, imageY: 0, mouseX: 50, mouseY: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 h-full"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.985)',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${idx * 80}ms`,
      }}
    >
      <div
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
          '--mouse-x': `${tilt.mouseX}%`,
          '--mouse-y': `${tilt.mouseY}%`,
          transition:
            tilt.scale === 1
              ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.3s ease'
              : 'transform 0.1s ease-out, box-shadow 0.1s ease-out',
        }}
        className={`group relative flex flex-col justify-between h-full overflow-hidden border preserve-3d shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 ${
          isDark
            ? 'bg-[#101820] border-white/10 hover:border-[#C9A45C] hover:shadow-[#C9A45C]/12 text-white'
            : 'bg-white border-black/10 hover:border-[#B08B43] hover:shadow-[#B08B43]/18 text-[#101820]'
        }`}
      >
        {/* Dynamic Light Sheen Overlay */}
        <div className="card-sheen-overlay absolute inset-0 z-20 pointer-events-none" />

        {/* Background Image Container with Parallax Depth */}
        <div className="relative aspect-[16/11] overflow-hidden bg-neutral-900 flex-shrink-0">
          <img
            src={block.image}
            alt={block.title}
            loading="lazy"
            style={{
              transform: `translate3d(${tilt.imageX}px, ${tilt.imageY}px, 0) scale(${tilt.scale > 1 ? 1.05 : 1})`,
              transition: tilt.scale === 1 ? 'transform 0.5s ease-out' : 'transform 0.1s ease-out',
            }}
            className="w-full h-full object-cover object-center filter brightness-85 group-hover:brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Category Pill Tag */}
          <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 bg-black/80 backdrop-blur-md border border-white/15 text-[9.5px] uppercase tracking-widest text-[#C9A45C] font-semibold transition-transform duration-300 group-hover:scale-105">
            <Icon className="w-3 h-3 text-[#C9A45C]" />
            <span>{block.category}</span>
          </div>
        </div>

        {/* Content Area with Exact Uniform Height */}
        <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-grow space-y-3">
          <div>
            {/* Fixed Height Title */}
            <div className="h-6 sm:h-7 flex items-center mb-1">
              <h3
                className={`font-serif text-[14px] sm:text-[15.5px] font-medium truncate transition-colors ${
                  isDark
                    ? 'text-white group-hover:text-[#C9A45C]'
                    : 'text-[#101820] group-hover:text-[#B08B43]'
                }`}
                title={block.title}
              >
                {block.title}
              </h3>
            </div>

            {/* Fixed Height Description (2 lines) */}
            <p
              className={`h-8 sm:h-9 text-[11.5px] sm:text-xs font-light leading-relaxed line-clamp-2 ${
                isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
              }`}
            >
              {block.description}
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-2.5 border-t border-black/5 dark:border-white/10">
            <Link
              to={block.link}
              className={`btn-shine inline-flex items-center justify-center gap-1.5 w-full py-2 text-[10.5px] sm:text-[11px] uppercase tracking-wider font-semibold border transition-all ${
                isDark
                  ? 'bg-white/5 hover:bg-[#C9A45C] hover:text-[#101820] text-[#F7F3EA] border-white/10 hover:border-[#C9A45C]'
                  : 'bg-[#F8F6F0] hover:bg-[#B08B43] hover:text-white text-[#101820] border-black/10 hover:border-[#B08B43]'
              }`}
            >
              <span>{block.cta}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FeaturedCollection = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });
  const { isDark } = useTheme();

  return (
    <section
      ref={sectionRef}
      className={`py-14 sm:py-20 border-y relative z-10 overflow-hidden transition-colors duration-250 ${
        isDark
          ? 'bg-[#1B2630]/40 border-white/5'
          : 'bg-[#F2EFE9]/60 border-black/5'
      }`}
    >
      {/* Subtle floating background decoration */}
      <div className="absolute top-12 right-12 w-48 h-48 bg-[#C9A45C]/5 rounded-full blur-3xl pointer-events-none animate-3d-float-1" />
      <div className="absolute bottom-8 left-8 w-40 h-40 bg-[#C9A45C]/5 rounded-full blur-3xl pointer-events-none animate-3d-float-2" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 border-b border-black/10 dark:border-white/10 pb-5 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <div>
            <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
              EXPLORE OUR STORE
            </span>
            <h2
              className={`font-serif text-3xl sm:text-4xl md:text-5xl font-normal mb-2 ${
                isDark ? 'text-white' : 'text-[#101820]'
              }`}
            >
              Curated Category Hubs
            </h2>
            <p
              className={`text-xs sm:text-sm font-light ${
                isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
              }`}
            >
              Shop across 5 dedicated marketplace departments with guaranteed authenticity and fast delivery.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#C9A45C] hover:text-[#B08B43] mt-3 md:mt-0 font-semibold transition-colors group"
          >
            <span>View Complete Marketplace</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* 5 Category Shopping Blocks (Compact Equal-Dimension Cards with 3D Depth) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
          {STORE_BLOCKS.map((block, idx) => (
            <HubCard3D
              key={block.category}
              block={block}
              idx={idx}
              isVisible={isVisible}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
