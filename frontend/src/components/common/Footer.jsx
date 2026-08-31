import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import {
  ArrowUp,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ShieldCheck,
  Truck,
  Sparkles,
  Check,
  Mail,
} from 'lucide-react';

const FOOTER_COLUMNS = [
  {
    id: 'shop',
    title: 'SHOP DEPARTMENTS',
    links: [
      { label: 'Fashion & Apparel', path: '/category/fashion' },
      { label: 'Furniture & Living', path: '/category/furniture' },
      { label: 'Electronics & Gadgets', path: '/category/electronics' },
      { label: 'Medicines & Wellness', path: '/category/medicines' },
      { label: 'Cosmetics & Beauty', path: '/category/cosmetics' },
    ],
  },
  {
    id: 'care',
    title: 'CUSTOMER CARE',
    links: [
      { label: 'Contact Us', path: '/contact' },
      { label: 'Help & FAQs', path: '/faq' },
      { label: 'Track Your Order', path: '/account/orders' },
      { label: 'Shipping & Delivery', path: '/shipping' },
      { label: 'Returns & Exchange', path: '/returns' },
    ],
  },
  {
    id: 'about',
    title: 'ABOUT LAX360',
    links: [
      { label: 'Our Story & Mission', path: '/about' },
      { label: 'Marketplace Collections', path: '/collections' },
      { label: 'Customer Assistance', path: '/contact' },
      { label: 'All Products Catalog', path: '/shop' },
    ],
  },
];

export const Footer = () => {
  const { isDark } = useTheme();
  const [footerRef, isVisible] = useScrollReveal({ threshold: 0.1 });

  // Mouse parallax state for background depth
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  // 3D Brand Tilt state
  const [brandTilt, setBrandTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });

  // Mobile Accordions state (all open by default on desktop, collapsible on mobile)
  const [openSections, setOpenSections] = useState({
    shop: true,
    care: true,
    about: true,
  });

  // Newsletter subscription state
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Back to Top button visibility
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Detect desktop & window scroll
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024 && !window.matchMedia('(pointer: coarse)').matches);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('resize', checkDesktop);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Mouse Parallax for background decorative layers
  const handleFooterMouseMove = (e) => {
    if (!isDesktop) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setMouseOffset({ x, y });
  };

  const handleFooterMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // 3D Logo Tilt Interaction
  const handleBrandMouseMove = (e) => {
    if (!isDesktop) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * 4;
    const rotateY = ((x - centerX) / centerX) * 4;

    setBrandTilt({ rotateX, rotateY, scale: 1.02 });
  };

  const handleBrandMouseLeave = () => {
    setBrandTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  };

  // Toggle mobile accordions
  const toggleSection = (id) => {
    if (window.innerWidth >= 640) return; // Keep open on desktop
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Handle newsletter submit
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!emailInput.trim() || !emailInput.includes('@')) return;
    setIsSubscribed(true);
    setEmailInput('');
    setTimeout(() => {
      setIsSubscribed(false);
    }, 4500);
  };

  // Scroll to Top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleFooterMouseMove}
      onMouseLeave={handleFooterMouseLeave}
      className={`relative z-20 pt-14 sm:pt-20 pb-12 overflow-hidden border-t select-none transition-colors duration-300 ${
        isDark
          ? 'bg-[#080D12] text-[#F7F3EA] border-white/[0.08]'
          : 'bg-[#E4DFD5] text-[#101820] border-black/[0.08]'
      }`}
    >
      {/* 1. Animated Travelling Gold Light on Top Divider */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-black/10 dark:bg-white/10 overflow-hidden">
        <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent animate-gold-travel" />
      </div>

      {/* 2. Floating 3D Background Decorative Layers (Mouse Parallax) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Ambient Gold Glow Orbs */}
        <div
          style={{
            transform: isDesktop
              ? `translate3d(${mouseOffset.x * 6}px, ${mouseOffset.y * 6}px, 0)`
              : 'none',
            transition: 'transform 0.25s ease-out',
            background: 'radial-gradient(circle, #C9A45C 0%, rgba(201, 164, 92, 0) 70%)',
          }}
          className="absolute -top-32 right-10 w-[500px] h-[500px] rounded-full blur-[140px] opacity-10 dark:opacity-15"
        />
        <div
          style={{
            transform: isDesktop
              ? `translate3d(${mouseOffset.x * -4}px, ${mouseOffset.y * -4}px, 0)`
              : 'none',
            transition: 'transform 0.25s ease-out',
            background: 'radial-gradient(circle, #1B2630 0%, rgba(27, 38, 48, 0) 70%)',
          }}
          className="absolute -bottom-24 -left-20 w-[450px] h-[450px] rounded-full blur-[140px] opacity-15 dark:opacity-20"
        />

        {/* Subtle Decorative Geometric Lines */}
        <div
          style={{
            transform: isDesktop
              ? `translate3d(${mouseOffset.x * 3}px, ${mouseOffset.y * 3}px, 0)`
              : 'none',
            transition: 'transform 0.2s ease-out',
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* 3. Integrated Marketplace VIP Newsletter Area */}
        <div
          className="mb-14 sm:mb-16 p-6 sm:p-8 border shadow-lg transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transitionDelay: '80ms',
            backgroundColor: isDark ? 'rgba(27, 38, 48, 0.6)' : 'rgba(255, 255, 255, 0.75)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#C9A45C]/10 border border-[#C9A45C]/30 text-[10px] uppercase tracking-widest text-[#C9A45C] font-semibold mb-2">
                <Sparkles className="w-3 h-3 text-[#C9A45C]" />
                <span>STAY IN THE LOOP</span>
              </div>
              <h3 className={`font-serif text-xl sm:text-2xl font-normal mb-1.5 ${
                isDark ? 'text-white' : 'text-[#101820]'
              }`}>
                Subscribe to Marketplace Dispatch
              </h3>
              <p className={`text-xs sm:text-sm font-light ${
                isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
              }`}>
                Discover new arrivals, marketplace releases and curated selections across all 5 departments.
              </p>
            </div>

            {/* Newsletter Input Form */}
            <form onSubmit={handleNewsletterSubmit} className="flex-grow max-w-md">
              {isSubscribed ? (
                <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold animate-fade-in">
                  <Check className="w-4 h-4" />
                  <span>You're subscribed to LAX360 Dispatch. Thank you!</span>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-grow">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A9B0B5]" />
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="Enter your email address..."
                      required
                      className={`w-full pl-10 pr-4 py-2.5 text-xs border rounded-none focus:outline-none focus:border-[#C9A45C] transition-colors ${
                        isDark
                          ? 'bg-[#101820] border-white/15 text-white placeholder-white/40'
                          : 'bg-white border-black/15 text-[#101820] placeholder-black/40'
                      }`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-shine px-6 py-2.5 bg-[#C9A45C] hover:bg-[#D8B872] text-[#101820] text-xs uppercase tracking-widest font-semibold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95"
                  >
                    <span>JOIN</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* 4. Brand Area with 3D Interaction */}
        <div
          className="flex flex-col lg:flex-row lg:items-center justify-between pb-10 mb-12 border-b border-black/10 dark:border-white/10 gap-6 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transitionDelay: '140ms',
          }}
        >
          {/* Brand Box with 3D Tilt */}
          <div
            onMouseMove={handleBrandMouseMove}
            onMouseLeave={handleBrandMouseLeave}
            style={{
              transform: `rotateX(${brandTilt.rotateX}deg) rotateY(${brandTilt.rotateY}deg) scale(${brandTilt.scale})`,
              transition: brandTilt.scale === 1 ? 'transform 0.4s ease, box-shadow 0.4s ease' : 'transform 0.1s ease-out',
            }}
            className="perspective-1000 inline-block"
          >
            <Link
              to="/"
              className={`p-4 border block transition-all duration-300 shadow-sm ${
                isDark
                  ? 'bg-[#1B2630]/60 border-white/10 hover:border-[#C9A45C] hover:shadow-black/50'
                  : 'bg-white border-black/10 hover:border-[#B08B43] hover:shadow-black/10'
              }`}
            >
              <div className="flex flex-col">
                <span className={`font-cinzel text-2xl sm:text-3xl tracking-[0.28em] font-semibold ${
                  isDark ? 'text-white' : 'text-[#101820]'
                }`}>
                  LAX360
                </span>
                <span className="text-[9px] uppercase tracking-ultra text-[#C9A45C] -mt-1 font-semibold">
                  PVT LTD
                </span>
              </div>
            </Link>
          </div>

          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C] animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#C9A45C] font-semibold">
                ONE PLATFORM. INFINITE POSSIBILITIES.
              </span>
            </div>
            <p className={`text-xs sm:text-sm font-light leading-relaxed ${
              isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
            }`}>
              A modern, multi-category digital marketplace bringing verified fashion, furniture, electronics, medicines, and cosmetics together into one unified, authenticated experience.
            </p>
          </div>
        </div>

        {/* 5. Three Symmetrical Navigation Columns with Micro-Interactions & Mobile Accordion */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 lg:gap-12 mb-14">
          {FOOTER_COLUMNS.map((section, colIdx) => {
            const isOpen = openSections[section.id];

            return (
              <div
                key={section.id}
                className="space-y-4 border-b sm:border-b-0 pb-4 sm:pb-0 border-black/10 dark:border-white/10 transition-all duration-700 ease-out"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                  transitionDelay: `${200 + colIdx * 70}ms`,
                }}
              >
                {/* Column Header with Mobile Accordion Toggle */}
                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between text-left cursor-pointer sm:cursor-default py-1"
                >
                  <h4 className={`font-serif text-xs uppercase tracking-ultra font-semibold flex items-center gap-2 ${
                    isDark ? 'text-white' : 'text-[#101820]'
                  }`}>
                    <span className="w-1 h-3 bg-[#C9A45C] hidden sm:inline-block" />
                    <span>{section.title}</span>
                  </h4>
                  <ChevronDown
                    className={`w-4 h-4 sm:hidden text-[#C9A45C] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Column Links List */}
                <div className={`${isOpen ? 'block' : 'hidden'} sm:block transition-all duration-300`}>
                  <ul className={`space-y-2.5 text-xs ${
                    isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
                  }`}>
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          to={link.path}
                          className="group inline-flex items-center gap-1.5 transition-all duration-300 hover:text-[#C9A45C] hover:translate-x-1.5 cursor-pointer"
                        >
                          <span className="relative">
                            {link.label}
                            <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#C9A45C] transition-all duration-300 group-hover:w-full" />
                          </span>
                          <ArrowUpRight className="w-3 h-3 text-[#C9A45C] opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* 6. Bottom Copyright & Delivery Assurance Area */}
        <div
          className="pt-8 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
            transitionDelay: '380ms',
          }}
        >
          <div className={isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}>
            <span>© 2026 LAX360 PVT LTD. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-5 text-[11px] uppercase tracking-wider text-[#A9B0B5] flex-wrap justify-center">
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>Fast Nationwide Delivery</span>
            </div>
            <span className="text-[#C9A45C]">•</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>Verified Authentic Products</span>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Floating Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 z-40 w-11 h-11 border shadow-2xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1.5 active:translate-y-0 cursor-pointer animate-fade-in group ${
            isDark
              ? 'bg-[#1B2630] border-[#C9A45C]/40 text-[#F7F3EA] hover:border-[#C9A45C] hover:shadow-[#C9A45C]/25'
              : 'bg-white border-[#B08B43]/40 text-[#101820] hover:border-[#B08B43] hover:shadow-[#B08B43]/25'
          }`}
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4 text-[#C9A45C] transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>
      )}
    </footer>
  );
};
