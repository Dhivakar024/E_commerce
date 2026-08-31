import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTheme } from '../context/ThemeContext';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { MarketplaceMarquee } from '../components/common/MarketplaceMarquee';
import {
  ArrowRight,
  Shirt,
  Armchair,
  Smartphone,
  Pill,
  Sparkles,
  ShieldCheck,
  Truck,
  Layers,
  Award,
} from 'lucide-react';

const MARKETPLACE_COLLECTIONS = [
  {
    id: 'fashion',
    number: '01',
    name: 'Fashion',
    subtitle: 'Modern Apparel & Footwear',
    description:
      'Timeless silhouettes, pure French linen tailoring, structured Italian wool blazers, and luxury silk essentials.',
    tags: ['Pure Linen', 'Tailored Blazers', 'Silk Silhouettes', 'Footwear'],
    link: '/category/fashion',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
    icon: Shirt,
    itemCount: '10+ Curations',
  },
  {
    id: 'furniture',
    number: '02',
    name: 'Furniture & Living',
    subtitle: 'Home & Living Essentials',
    description:
      'Architectural living room seating, solid teak dining tables, minimalist oak coffee tables, and ergonomic workspaces.',
    tags: ['Boucle Seating', 'Solid Teak', 'Minimalist Oak', 'Living Decor'],
    link: '/category/furniture',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop',
    icon: Armchair,
    itemCount: '10+ Curations',
  },
  {
    id: 'electronics',
    number: '03',
    name: 'Electronics & Gadgets',
    subtitle: 'Smart Tech & Gadgets',
    description:
      'Flagship 5G smartphones, true wireless active noise-cancelling audio, 4K OLED smart displays, and creator laptops.',
    tags: ['Noise Cancelling', '4K OLED', '5G Flagships', 'Pro Audio'],
    link: '/category/electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
    icon: Smartphone,
    itemCount: '10+ Curations',
  },
  {
    id: 'medicines',
    number: '04',
    name: 'Medicines & Wellness',
    subtitle: 'Wellness & Everyday Care',
    description:
      'Certified daily multivitamins, diagnostic blood pressure monitors, emergency family safety kits, and herbal care.',
    tags: ['Daily Vitamins', 'Diagnostic Devices', 'Safety Kits', 'Herbal Care'],
    link: '/category/medicines',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1200&auto=format&fit=crop',
    icon: Pill,
    itemCount: '10+ Curations',
  },
  {
    id: 'cosmetics',
    number: '05',
    name: 'Cosmetics & Beauty',
    subtitle: 'Beauty & Personal Care',
    description:
      'Deep hydration botanical serums, luminous baked mineral highlighters, peptide fortifying treatments, and clean pigments.',
    tags: ['Hydration Serums', 'Highlighters', 'Peptides', 'Clean Beauty'],
    link: '/category/cosmetics',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
    icon: Sparkles,
    itemCount: '10+ Curations',
  },
];

const MARKETPLACE_STATS = [
  { value: '50+', label: 'CURATED COLLECTIONS', icon: Layers },
  { value: '5', label: 'MARKETPLACE DEPARTMENTS', icon: Award },
  { value: '100%', label: 'VERIFIED AUTHENTIC PRODUCTS', icon: ShieldCheck },
  { value: 'FAST', label: 'NATIONWIDE DELIVERY', icon: Truck },
];

// Single Compact 3D Interactive Collection Showcase Card
const CollectionShowcaseCard3D = ({ col, idx, isVisible, isDark }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    imageX: 0,
    imageY: 0,
    mouseX: 50,
    mouseY: 50,
  });
  const Icon = col.icon;

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768 || window.matchMedia('(hover: none)').matches) return;

    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * 2.5;
    const rotateY = ((x - centerX) / centerX) * 2.5;

    const imageX = ((x - centerX) / centerX) * -4;
    const imageY = ((y - centerY) / centerY) * -4;

    const mouseX = Math.round((x / rect.width) * 100);
    const mouseY = Math.round((y / rect.height) * 100);

    setTilt({ rotateX, rotateY, scale: 1.01, imageX, imageY, mouseX, mouseY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1, imageX: 0, imageY: 0, mouseX: 50, mouseY: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 h-full flex flex-col"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.985)',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${idx * 70}ms`,
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
        className={`group relative flex flex-col justify-between h-full border preserve-3d shadow-sm hover:shadow-xl hover:-translate-y-1 overflow-hidden transition-all duration-300 ${
          isDark
            ? 'bg-[#1B2630] border-white/10 hover:border-[#E6D09A] hover:shadow-[#6F5A2E]/20 text-white'
            : 'bg-white border-black/10 hover:border-[#785A1E] hover:shadow-black/10 text-[#101820]'
        }`}
      >
        {/* Dynamic Light Sheen Overlay */}
        <div className="card-sheen-overlay absolute inset-0 z-20 pointer-events-none" />

        {/* 1. Compact Visual Image Container (16:9 Aspect Ratio) */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900 flex-shrink-0 select-none">
          <img
            src={col.image}
            alt={col.name}
            loading="lazy"
            style={{
              transform: `translate3d(${tilt.imageX}px, ${tilt.imageY}px, 0) scale(${
                tilt.scale > 1 ? 1.04 : isVisible ? 1 : 1.03
              })`,
              transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease',
            }}
            className="w-full h-full object-cover object-center filter brightness-90 group-hover:brightness-100"
          />

          {/* Luxury Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 group-hover:from-black/90 transition-colors duration-300" />

          {/* Category Number & Department Badge */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
            <span className="px-2 py-0.5 bg-black/70 backdrop-blur-md border border-[#E6D09A]/40 text-[#E6D09A] font-serif text-[11px] font-semibold tracking-wider">
              {col.number}
            </span>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-black/60 backdrop-blur-md border border-white/15 text-[9px] uppercase tracking-widest text-white font-medium">
              <Icon className="w-3 h-3 text-[#E6D09A]" />
              <span>{col.name}</span>
            </div>
          </div>

          {/* Item Count Pill */}
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-black/60 backdrop-blur-md border border-white/10 text-[8px] uppercase tracking-wider text-[#A9B0B5] z-10">
            {col.itemCount}
          </div>

          {/* Floating Category Title inside Image Area */}
          <div className="absolute bottom-2.5 left-3 right-3 z-10">
            <span className="text-[9px] uppercase tracking-widest text-[#E6D09A] font-semibold block">
              {col.subtitle}
            </span>
            <h3 className="font-serif text-base sm:text-lg text-white font-normal leading-tight">
              {col.name}
            </h3>
          </div>
        </div>

        {/* 2. Structured Compact Content Block */}
        <div
          className={`p-3 sm:p-3.5 flex flex-col justify-between flex-grow space-y-2.5 border-t ${
            isDark ? 'bg-[#1B2630] border-white/5' : 'bg-white border-black/5'
          }`}
        >
          <div className="space-y-2">
            {/* Description (Strict 2-line clamp: h-7 sm:h-8) */}
            <p
              className={`h-7 sm:h-8 text-[11.5px] sm:text-[12px] font-light leading-relaxed line-clamp-2 ${
                isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
              }`}
            >
              {col.description}
            </p>

            {/* Curated Tags Chips (Single Row) */}
            <div className="flex items-center gap-1.5 overflow-hidden flex-nowrap">
              {col.tags.slice(0, 3).map((tag, tagIdx) => (
                <span
                  key={tagIdx}
                  className={`text-[9px] px-2 py-0.5 font-medium border transition-colors truncate flex-shrink-0 ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-[#F7F3EA]/80'
                      : 'bg-black/5 border-black/10 text-[#101820]/80'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 3. Action CTA Button */}
          <div className="pt-2 border-t border-black/5 dark:border-white/10">
            <Link
              to={col.link}
              className={`btn-shine inline-flex items-center justify-between w-full px-3.5 py-2 text-[11px] uppercase tracking-wider font-semibold border transition-all duration-300 shadow-xs ${
                isDark
                  ? 'bg-[#101820] hover:bg-[#6F5A2E] text-[#F7F3EA] border-white/15 hover:border-[#E6D09A]'
                  : 'bg-[#101820] hover:bg-[#785A1E] text-white border-black/15 hover:border-[#785A1E]'
              }`}
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Collections = () => {
  const { isDark } = useTheme();
  const [headerRef, isHeaderVisible] = useScrollReveal({ threshold: 0.1 });
  const [gridRef, isGridVisible] = useScrollReveal({ threshold: 0.05 });
  const [statsRef, isStatsVisible] = useScrollReveal({ threshold: 0.1 });
  const [ctaRef, isCtaVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <main
      className={`w-full min-h-screen pt-22 sm:pt-24 pb-12 overflow-x-hidden transition-colors duration-250 ${
        isDark ? 'bg-[#101820] text-[#F7F3EA]' : 'bg-[#F8F6F0] text-[#101820]'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8 sm:space-y-10">
        {/* 1. COLLECTION HERO SECTION */}
        <section
          ref={headerRef}
          className="text-center max-w-2xl mx-auto space-y-3 pt-2 transition-all duration-700 ease-out"
          style={{
            opacity: isHeaderVisible ? 1 : 0,
            transform: isHeaderVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A45C]/10 border border-[#C9A45C]/30 mb-0.5 animate-fade-in opacity-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-[#C9A45C]">
              COLLECTIONS
            </span>
          </div>

          <h1
            className={`font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.15] tracking-tight ${
              isDark ? 'text-white' : 'text-[#101820]'
            }`}
          >
            Curated Collections for Every Part of Life
          </h1>

          <p
            className={`text-xs sm:text-sm font-light leading-relaxed max-w-xl mx-auto ${
              isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
            }`}
          >
            Explore thoughtfully selected collections across fashion, home, technology, wellness and
            beauty — all from LAX360 PVT LTD.
          </p>
        </section>

        {/* 2. COMPACT COLLECTION SHOWCASE (Centered 2-Column Responsive Grid, max-w-5xl) */}
        <section ref={gridRef} className="max-w-4xl lg:max-w-5xl mx-auto space-y-5 w-full">
          <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-2.5">
            <div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-ultra text-[#C9A45C] font-semibold block">
                DEPARTMENT DISCOVERY
              </span>
              <h2
                className={`font-serif text-2xl sm:text-3xl font-normal ${
                  isDark ? 'text-white' : 'text-[#101820]'
                }`}
              >
                Marketplace Departments
              </h2>
            </div>
            <span
              className={`text-xs font-light hidden sm:block ${
                isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
              }`}
            >
              5 Core Collections
            </span>
          </div>

          {/* Compact 2-Column Responsive Grid matching product card proportions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 items-stretch w-full">
            {MARKETPLACE_COLLECTIONS.map((col, idx) => (
              <div
                key={col.id}
                className={
                  idx === MARKETPLACE_COLLECTIONS.length - 1
                    ? 'sm:col-span-2 max-w-md sm:max-w-lg mx-auto w-full'
                    : 'w-full'
                }
              >
                <CollectionShowcaseCard3D
                  col={col}
                  idx={idx}
                  isVisible={isGridVisible}
                  isDark={isDark}
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Full Viewport Width Marketplace Marquee Ticker (Matching Home Page) */}
      <div className="w-full my-7 sm:my-8">
        <MarketplaceMarquee />
      </div>

      {/* Container 2: Stats Strip & Final CTA */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8 sm:space-y-10">
        {/* 3. COMPACT PREMIUM MARKETPLACE STATS STRIP */}
        <section
          ref={statsRef}
          className="w-full border-y border-black/10 dark:border-white/10 py-7 sm:py-8 transition-all duration-700 ease-out"
          style={{
            opacity: isStatsVisible ? 1 : 0,
            transform: isStatsVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {MARKETPLACE_STATS.map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={idx}
                  className={`p-4 sm:p-5 border flex flex-col items-center text-center space-y-1.5 transition-all duration-300 hover:-translate-y-1 ${
                    isDark
                      ? 'bg-[#1B2630]/50 border-white/5 hover:border-[#E6D09A]/40'
                      : 'bg-white border-black/5 hover:border-[#785A1E]/40 shadow-xs'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center mb-0.5 ${
                      isDark ? 'bg-white/5 text-[#E6D09A]' : 'bg-black/5 text-[#785A1E]'
                    }`}
                  >
                    <StatIcon className="w-4 h-4" />
                  </div>
                  <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#C9A45C]">
                    {stat.value}
                  </span>
                  <span
                    className={`text-[9.5px] sm:text-[10px] uppercase tracking-widest font-semibold ${
                      isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
                    }`}
                  >
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. COMPACT FINAL CALL TO ACTION */}
        <section
          ref={ctaRef}
          className="text-center max-w-xl mx-auto space-y-4 py-4 transition-all duration-700 ease-out"
          style={{
            opacity: isCtaVisible ? 1 : 0,
            transform: isCtaVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <div className="space-y-2">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-ultra text-[#C9A45C] font-semibold block">
              FIND SOMETHING MADE FOR YOU
            </span>
            <h2
              className={`font-serif text-2xl sm:text-3xl md:text-4xl font-normal ${
                isDark ? 'text-white' : 'text-[#101820]'
              }`}
            >
              Explore the Complete Marketplace
            </h2>
            <p
              className={`text-xs sm:text-sm font-light leading-relaxed ${
                isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
              }`}
            >
              Discover products across every department with authentic quality assurance and fast nationwide
              delivery.
            </p>
          </div>

          <div className="pt-1">
            <Link
              to="/shop"
              className="btn-shine inline-flex items-center gap-2 px-8 py-3.5 bg-[#C9A45C] hover:bg-[#D8B872] text-[#101820] text-xs uppercase tracking-widest font-semibold transition-all shadow-md active:scale-95"
            >
              <span>EXPLORE MARKETPLACE</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </section>
      </div>

      {/* VIP Newsletter Section */}
      <div className="mt-10 sm:mt-14">
        <NewsletterSection />
      </div>
    </main>
  );
};
