import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import {
  ArrowUp,
  ArrowUpRight,
  ChevronDown,
  ShieldCheck,
  Truck,
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
      { label: 'Track Your Order', path: '/account?tab=orders' },
      { label: 'Shipping & Delivery', path: '/faq' },
      { label: 'Returns & Exchange', path: '/faq' },
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

  // Mobile Accordions state (open by default on desktop, collapsible on mobile)
  const [openSections, setOpenSections] = useState({
    shop: true,
    care: true,
    about: true,
  });

  // Back to Top button visibility
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSection = (id) => {
    if (window.innerWidth >= 640) return;
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative z-20 pt-10 sm:pt-12 md:pt-14 pb-6 sm:pb-8 overflow-hidden border-t select-none transition-all duration-300 ease-in-out bg-[var(--bg-footer)] border-[var(--footer-border)] shadow-[var(--footer-shadow)] text-[#101820]"
    >
      {/* 1. Animated Travelling Dark/Gold Light on Top Divider */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] overflow-hidden bg-black/10">
        <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-[#101820]/40 to-transparent animate-gold-travel" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* 2. Top Footer Row: Brand on Left, Description on Right */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between pb-7 sm:pb-8 border-b border-black/10 gap-4 sm:gap-8 transition-all duration-500 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          {/* Brand Logo */}
          <Link
            to="/"
            className="inline-block group focus:outline-none flex-shrink-0"
            aria-label="LAX360 PVT LTD Home"
          >
            <div className="flex flex-col">
              <span className="font-cinzel text-2xl sm:text-3xl tracking-[0.25em] font-bold text-[#101820] group-hover:text-black transition-colors duration-300">
                LAX360
              </span>
              <span className="text-[8.5px] sm:text-[9px] uppercase tracking-ultra -mt-0.5 font-bold text-[#101820]/80 group-hover:text-black transition-colors duration-300">
                PVT LTD
              </span>
            </div>
          </Link>

          {/* Short Marketplace Description */}
          <p className="text-xs sm:text-sm font-normal max-w-xl leading-relaxed text-[#101820]/85">
            A modern, multi-category digital marketplace bringing verified fashion,
            furniture, electronics, medicines, and cosmetics together into one
            unified, authenticated experience.
          </p>
        </div>

        {/* 3. Three Balanced Columns: Shop Departments | Customer Care | About LAX360 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 py-7 sm:py-8">
          {FOOTER_COLUMNS.map((section, colIdx) => {
            const isOpen = openSections[section.id];

            return (
              <div
                key={section.id}
                className="space-y-3 sm:space-y-3.5 border-b sm:border-b-0 pb-3.5 sm:pb-0 border-black/10 transition-all duration-500 ease-out"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                  transitionDelay: `${colIdx * 50}ms`,
                }}
              >
                {/* Column Header with Mobile Accordion Toggle */}
                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between text-left cursor-pointer sm:cursor-default py-0.5"
                >
                  <h4 className="font-serif text-xs uppercase tracking-ultra font-bold text-[#101820] flex items-center gap-2">
                    <span className="w-1 h-3 hidden sm:inline-block bg-[#101820]" />
                    <span>{section.title}</span>
                  </h4>
                  <ChevronDown
                    className={`w-4 h-4 sm:hidden transition-transform duration-300 text-[#101820] ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Column Links List with Compact Spacing */}
                <div
                  className={`${
                    isOpen ? 'block' : 'hidden'
                  } sm:block transition-all duration-300`}
                >
                  <ul className="space-y-2 sm:space-y-2.5 text-xs text-[#101820]/80">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          to={link.path}
                          className="group inline-flex items-center gap-1.5 transition-all duration-300 hover:translate-x-1 cursor-pointer font-medium hover:text-black"
                        >
                          <span className="relative">
                            {link.label}
                            <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full bg-[#101820]" />
                          </span>
                          <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-[#101820]" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. Bottom Footer Row: Copyright & Delivery Assurance */}
        <div
          className="pt-6 sm:pt-7 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-3.5 text-xs text-[#101820]/80 transition-all duration-500 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
          }}
        >
          <div>
            <span>© 2026 LAX360 PVT LTD. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-5 text-[11px] uppercase tracking-wider flex-wrap justify-center font-medium text-[#101820]">
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#101820]" />
              <span>Fast Nationwide Delivery</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#101820]" />
              <span>Verified Authentic Products</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Floating Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-10 h-10 sm:w-11 sm:h-11 border border-black/20 shadow-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 active:translate-y-0 cursor-pointer animate-fade-in group bg-[#C9A45C] text-[#101820] hover:bg-[#D8B872]"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 text-[#101820]" />
        </button>
      )}
    </footer>
  );
};
