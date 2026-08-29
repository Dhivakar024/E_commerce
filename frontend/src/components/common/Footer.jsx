import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const FOOTER_COLUMNS = [
  {
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

  return (
    <footer className={`border-t pt-16 sm:pt-20 pb-12 relative z-10 transition-colors duration-250 ${
      isDark
        ? 'bg-[#101820] text-[#F7F3EA]/80 border-white/10'
        : 'bg-[#F2EFE9] text-[#101820]/80 border-black/10'
    }`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Brand Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-10 mb-12 border-b border-black/10 dark:border-white/10 gap-6">
          <Link to="/" className="inline-block">
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
          <p className={`text-xs sm:text-sm max-w-lg font-light leading-relaxed ${
            isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
          }`}>
            A modern, multi-category digital marketplace bringing verified fashion, furniture, electronics, medicines, and cosmetics together into one unified experience.
          </p>
        </div>

        {/* 3 Balanced Footer Columns (Legal column removed) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 mb-14">
          {FOOTER_COLUMNS.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className={`font-serif text-xs uppercase tracking-ultra font-semibold ${
                isDark ? 'text-white' : 'text-[#101820]'
              }`}>
                {section.title}
              </h4>
              <ul className={`space-y-2.5 text-xs ${
                isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
              }`}>
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="hover:text-[#C9A45C] transition-colors inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Copyright Area */}
        <div className="pt-8 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A9B0B5] dark:text-[#A9B0B5]">
          <div>
            <span>© 2026 LAX360 PVT LTD. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-wider text-[#A9B0B5]">
            <span>Fast Nationwide Delivery • Verified Authentic Products</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
