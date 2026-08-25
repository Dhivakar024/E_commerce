import React from 'react';
import { Link } from 'react-router-dom';

const MULTI_FOOTER_SECTIONS = [
  {
    title: 'Marketplace',
    links: [
      { label: 'Fashion & Apparel', path: '/category/fashion' },
      { label: 'Furniture & Living', path: '/category/furniture' },
      { label: 'Electronics & Tech', path: '/category/electronics' },
      { label: 'Medicines & Health', path: '/category/medicines' },
      { label: 'Cosmetics & Beauty', path: '/category/cosmetics' },
      { label: 'All Products', path: '/shop' },
    ],
  },
  {
    title: 'Customer Care',
    links: [
      { label: 'Track Order', path: '/account/orders' },
      { label: 'Shipping & Delivery', path: '/shipping' },
      { label: 'Returns & Exchanges', path: '/returns' },
      { label: 'Prescription Policy', path: '/category/medicines' },
      { label: 'FAQ & Support', path: '/faq' },
      { label: 'Contact Us', path: '/contact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About LAX360', path: '/about' },
      { label: 'Our Standards', path: '/about' },
      { label: 'Collections', path: '/collections' },
      { label: 'Terms & Conditions', path: '/terms' },
      { label: 'Privacy Policy', path: '/privacy' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'My Profile', path: '/account' },
      { label: 'Order History', path: '/account/orders' },
      { label: 'Saved Wishlist', path: '/wishlist' },
      { label: 'Shopping Bag', path: '/cart' },
      { label: 'Customer Login', path: '/login' },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-[#101820] text-[#F7F3EA]/80 border-t border-white/10 pt-20 pb-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Brand Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-12 mb-12 border-b border-white/10 gap-6">
          <Link to="/" className="inline-block">
            <div className="flex flex-col">
              <span className="font-cinzel text-2xl sm:text-3xl tracking-[0.28em] font-semibold text-white">
                LAX360
              </span>
              <span className="text-[9px] uppercase tracking-ultra text-[#C9A45C] -mt-1 font-semibold">
                PVT LTD
              </span>
            </div>
          </Link>
          <p className="text-xs text-[#A9B0B5] max-w-md font-light leading-relaxed">
            Everything You Need. All in One Place. Premium multi-category e-commerce platform delivering fashion, furniture, electronics, certified healthcare, and luxury cosmetics.
          </p>
        </div>

        {/* 4 Footer Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-16">
          {MULTI_FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="font-serif text-xs uppercase tracking-ultra text-white font-medium mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5 text-xs text-[#A9B0B5]">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="hover:text-[#C9A45C] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Area with Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A9B0B5]">
          <div>
            <span>© 2026 LAX360 PVT LTD. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-wider text-[#A9B0B5]">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/about" className="hover:text-white transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
