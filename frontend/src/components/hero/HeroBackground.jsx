import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Shirt, Smartphone, Armchair, Star } from 'lucide-react';

export const HeroBackground = () => {
  const { isDark } = useTheme();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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
          const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
          const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
          setMousePos({ x, y });
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

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none perspective-1000">
      {/* Layer 1: Base Gradient Canvas (Deep Background Parallax: 3px) */}
      <div
        style={{
          transform: isDesktop
            ? `translate3d(${mousePos.x * -4}px, ${mousePos.y * -4}px, 0)`
            : 'none',
          transition: 'transform 0.2s ease-out',
        }}
        className={`absolute inset-[-20px] transition-colors duration-300 ${
          isDark
            ? 'bg-gradient-to-b from-[#0B1015] via-[#101820] to-[#101820]'
            : 'bg-gradient-to-b from-[#FAF8F3] via-[#F8F6F0] to-[#EFECE6]'
        }`}
      />

      {/* Layer 2: Ambient Gold Glow Orbs (Mid-layer Parallax: 8px) */}
      <div
        style={{
          transform: isDesktop
            ? `translate3d(${mousePos.x * 8}px, ${mousePos.y * 8}px, 0)`
            : 'none',
          transition: 'transform 0.25s ease-out',
          background: 'radial-gradient(circle, #C9A45C 0%, rgba(201, 164, 92, 0) 70%)',
        }}
        className="absolute -top-28 -right-28 w-[550px] h-[550px] rounded-full blur-[130px] pointer-events-none opacity-25 dark:opacity-30"
      />
      <div
        style={{
          transform: isDesktop
            ? `translate3d(${mousePos.x * -6}px, ${mousePos.y * -6}px, 0)`
            : 'none',
          transition: 'transform 0.25s ease-out',
          background: 'radial-gradient(circle, #C9A45C 0%, rgba(201, 164, 92, 0) 70%)',
        }}
        className="absolute top-1/2 -left-32 w-[450px] h-[450px] -translate-y-1/2 rounded-full blur-[140px] pointer-events-none opacity-15 dark:opacity-20"
      />

      {/* Subtle Geometric Luxury Grid Pattern (Parallax: 4px) */}
      <div
        style={{
          transform: isDesktop
            ? `translate3d(${mousePos.x * 4}px, ${mousePos.y * 4}px, 0)`
            : 'none',
          transition: 'transform 0.2s ease-out',
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none"
      />

      {/* Layer 3: Floating 3D Marketplace Showcase Cards (Desktop/Laptop only, Parallax: 12-16px) */}
      {isDesktop && (
        <div
          style={{
            transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`,
            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="absolute right-[4%] xl:right-[8%] top-[14%] bottom-[14%] w-[380px] xl:w-[440px] pointer-events-auto hidden lg:block"
        >
          {/* 3D Floating Widget 1: Fashion & Apparel (Top Right) */}
          <div
            style={{
              transform: `rotateY(${mousePos.x * -8}deg) rotateX(${mousePos.y * 8}deg)`,
              transition: 'transform 0.2s ease-out',
            }}
            className="absolute top-0 right-4 animate-3d-float-1 group cursor-pointer"
          >
            <div className={`p-3 rounded-none border backdrop-blur-xl shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:border-[#C9A45C] flex items-center gap-3 w-64 ${
              isDark ? 'bg-[#1B2630]/85 border-white/15 text-white' : 'bg-white/90 border-black/15 text-[#101820]'
            }`}>
              <div className="w-12 h-12 rounded-none overflow-hidden flex-shrink-0 bg-neutral-900 border border-black/10 dark:border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=300&auto=format&fit=crop"
                  alt="Fashion curation"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-widest text-[#C9A45C] font-semibold flex items-center gap-1">
                    <Shirt className="w-2.5 h-2.5" />
                    <span>Fashion</span>
                  </span>
                  <div className="flex items-center text-[#C9A45C] text-[10px]">
                    <Star className="w-2.5 h-2.5 fill-[#C9A45C]" />
                    <span className="ml-0.5 font-bold">4.9</span>
                  </div>
                </div>
                <h4 className="font-serif text-xs font-medium truncate mt-0.5">Classic French Linen</h4>
                <span className="text-[10px] text-[#A9B0B5] block">₹2,899 • Verified Style</span>
              </div>
            </div>
          </div>

          {/* 3D Floating Widget 2: Electronics & Audio (Middle Right) */}
          <div
            style={{
              transform: `rotateY(${mousePos.x * -6}deg) rotateX(${mousePos.y * 6}deg)`,
              transition: 'transform 0.2s ease-out',
            }}
            className="absolute top-[38%] left-0 animate-3d-float-2 group cursor-pointer"
          >
            <div className={`p-3 rounded-none border backdrop-blur-xl shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:border-[#C9A45C] flex items-center gap-3 w-64 ${
              isDark ? 'bg-[#1B2630]/85 border-white/15 text-white' : 'bg-white/90 border-black/15 text-[#101820]'
            }`}>
              <div className="w-12 h-12 rounded-none overflow-hidden flex-shrink-0 bg-neutral-900 border border-black/10 dark:border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&auto=format&fit=crop"
                  alt="Electronics curation"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-widest text-[#C9A45C] font-semibold flex items-center gap-1">
                    <Smartphone className="w-2.5 h-2.5" />
                    <span>Electronics</span>
                  </span>
                  <span className="text-[8px] bg-[#C9A45C]/20 text-[#C9A45C] px-1 py-0.2 font-semibold">5G / ANC</span>
                </div>
                <h4 className="font-serif text-xs font-medium truncate mt-0.5">Aura Wireless Pro</h4>
                <span className="text-[10px] text-[#A9B0B5] block">₹8,999 • Flagship Tech</span>
              </div>
            </div>
          </div>

          {/* 3D Floating Widget 3: Furniture & Living (Bottom Right) */}
          <div
            style={{
              transform: `rotateY(${mousePos.x * -8}deg) rotateX(${mousePos.y * 8}deg)`,
              transition: 'transform 0.2s ease-out',
            }}
            className="absolute bottom-4 right-2 animate-3d-float-3 group cursor-pointer"
          >
            <div className={`p-3 rounded-none border backdrop-blur-xl shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:border-[#C9A45C] flex items-center gap-3 w-64 ${
              isDark ? 'bg-[#1B2630]/85 border-white/15 text-white' : 'bg-white/90 border-black/15 text-[#101820]'
            }`}>
              <div className="w-12 h-12 rounded-none overflow-hidden flex-shrink-0 bg-neutral-900 border border-black/10 dark:border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=300&auto=format&fit=crop"
                  alt="Furniture curation"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-widest text-[#C9A45C] font-semibold flex items-center gap-1">
                    <Armchair className="w-2.5 h-2.5" />
                    <span>Furniture</span>
                  </span>
                  <span className="text-[8px] bg-emerald-500/15 text-emerald-400 px-1 py-0.2 font-semibold">Solid Oak</span>
                </div>
                <h4 className="font-serif text-xs font-medium truncate mt-0.5">Sculptural Boucle Chair</h4>
                <span className="text-[10px] text-[#A9B0B5] block">₹14,499 • Luxury Comfort</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Layer 4: Vignette & Bottom Edge Soft Blend */}
      <div
        className={`absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t pointer-events-none ${
          isDark ? 'from-[#101820] to-transparent' : 'from-[#F8F6F0] to-transparent'
        }`}
      />
    </div>
  );
};
