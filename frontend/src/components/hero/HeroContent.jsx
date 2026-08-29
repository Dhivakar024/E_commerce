import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagneticButton } from '../common/MagneticButton';
import { useTheme } from '../../context/ThemeContext';
import { Shirt, Armchair, Smartphone, Pill, Sparkles, ShieldCheck, Truck, ArrowRight } from 'lucide-react';

const HERO_CATEGORIES = [
  { name: 'Fashion', slug: 'fashion', icon: Shirt },
  { name: 'Furniture', slug: 'furniture', icon: Armchair },
  { name: 'Electronics', slug: 'electronics', icon: Smartphone },
  { name: 'Medicines', slug: 'medicines', icon: Pill },
  { name: 'Cosmetics', slug: 'cosmetics', icon: Sparkles },
];

export const HeroContent = () => {
  const { isDark } = useTheme();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024 && !window.matchMedia('(pointer: coarse)').matches);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    if (prefersReducedMotion) return () => window.removeEventListener('resize', checkDesktop);

    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const { innerWidth, innerHeight } = window;
          const x = (e.clientX / innerWidth - 0.5) * 6; // -3px to 3px
          const y = (e.clientY / innerHeight - 0.5) * 6; // -3px to 3px
          setMouseOffset({ x, y });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkDesktop);
    };
  }, []);

  const scrollToCategories = () => {
    const el = document.getElementById('shop-by-category');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{
        transform: isDesktop ? `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)` : 'none',
        transition: 'transform 0.15s ease-out',
      }}
      className="relative z-10 w-full max-w-4xl py-4 sm:py-6 md:py-8 preserve-3d"
    >
      {/* 1. Brand Badge (0ms delay) */}
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A45C]/10 border border-[#C9A45C]/30 mb-3 sm:mb-4 animate-fade-in opacity-0">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C] animate-pulse" />
        <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-[#C9A45C]">
          LAX360 PVT LTD • MULTI-CATEGORY MARKETPLACE
        </span>
      </div>

      {/* 2. Main Headline (100ms delay, enhanced Level 1 typography) */}
      <h1
        className={`font-serif text-[2.35rem] sm:text-4xl md:text-5xl lg:text-[3.85rem] leading-[1.1] tracking-tight mb-3 sm:mb-4 animate-fade-in opacity-0 [animation-delay:100ms] ${
          isDark ? 'text-[#F7F3EA]' : 'text-[#101820]'
        }`}
      >
        Everything You Need.<br />
        <span className="text-[#C9A45C] italic font-normal">All in One Place.</span>
      </h1>

      {/* 3. Subheading (200ms delay, enhanced Level 4 typography) */}
      <p
        className={`max-w-2xl text-[13.5px] sm:text-[15px] md:text-base font-light leading-relaxed mb-6 sm:mb-7 animate-fade-in opacity-0 [animation-delay:200ms] ${
          isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
        }`}
      >
        Discover fashion, furniture, electronics, medicines, and cosmetics — curated with verified quality
        assurance, transparent pricing, and fast nationwide delivery.
      </p>

      {/* 4. CTA Buttons with 3D Depth & Arrow Micro-Interaction (300ms delay) */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 animate-fade-in opacity-0 [animation-delay:300ms]">
        <MagneticButton
          to="/shop"
          className="group btn-shine inline-flex items-center justify-center rounded-none bg-[#C9A45C] hover:bg-[#D8B872] px-8 py-3.5 text-xs sm:text-[13px] font-semibold uppercase tracking-[0.16em] text-[#101820] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[#C9A45C]/25 active:translate-y-0"
        >
          <span>SHOP NOW</span>
          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1.5" />
        </MagneticButton>

        <MagneticButton
          onClick={scrollToCategories}
          className={`inline-flex items-center justify-center rounded-none border px-8 py-3.5 text-xs sm:text-[13px] font-medium uppercase tracking-[0.16em] transition-all duration-300 hover:-translate-y-1 active:translate-y-0 cursor-pointer ${
            isDark
              ? 'border-white/25 bg-white/5 text-[#F7F3EA] hover:border-white hover:bg-white/10'
              : 'border-black/20 bg-black/5 text-[#101820] hover:border-black hover:bg-black/10'
          }`}
        >
          EXPLORE CATEGORIES
        </MagneticButton>
      </div>

      {/* 5. Quick Category Badges Bar with 3D Hover Lift (400ms delay) */}
      <div className="pt-4 border-t border-black/10 dark:border-white/10 animate-fade-in opacity-0 [animation-delay:400ms]">
        <div className="flex items-center gap-2 flex-wrap mb-3.5">
          <span
            className={`text-[11px] sm:text-xs uppercase tracking-wider font-semibold mr-1 ${
              isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
            }`}
          >
            Core Departments:
          </span>
          {HERO_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className={`group inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                  isDark
                    ? 'bg-[#1B2630]/80 hover:bg-[#1B2630] border-white/10 hover:border-[#C9A45C] hover:shadow-black/60 text-[#F7F3EA]'
                    : 'bg-white hover:bg-white border-black/10 hover:border-[#B08B43] hover:shadow-black/10 text-[#101820]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-[#C9A45C] transition-transform duration-300 group-hover:scale-110" />
                <span>{cat.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Marketplace Trust Features */}
        <div
          className={`flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs uppercase tracking-wider font-medium flex-wrap ${
            isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C9A45C]" />
            <span>100% Genuine Products</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-[#C9A45C]" />
            <span>Express Delivery Nationwide</span>
          </div>
        </div>
      </div>
    </div>
  );
};
