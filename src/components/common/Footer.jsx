import React from 'react';
import { Link } from 'react-router-dom';
import { FOOTER_SECTIONS } from '../../data/products';

export const Footer = () => {
  return (
    <footer className="bg-luxury-black text-luxury-cream/80 border-t border-white/10 pt-20 pb-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Brand Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-12 mb-12 border-b border-white/10 gap-6">
          <Link to="/" className="inline-block">
            <div className="flex flex-col">
              <span className="font-cinzel text-2xl tracking-[0.28em] font-semibold text-white">
                LAX360
              </span>
              <span className="text-[9px] uppercase tracking-ultra text-luxury-gold -mt-1 font-light">
                PVT LTD
              </span>
            </div>
          </Link>
          <p className="text-xs text-luxury-muted max-w-md font-light">
            Crafting modern silhouettes with noble materials and sustainable European craftsmanship.
          </p>
        </div>

        {/* 5 Footer Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 mb-16">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="font-serif text-xs uppercase tracking-ultra text-white font-medium mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5 text-xs text-luxury-muted">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.isExternal ? (
                      <a
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-luxury-champagne transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        className="hover:text-luxury-champagne transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Area with Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-luxury-muted">
          <div>
            <span>© 2026 LAX360 PVT LTD. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-wider text-luxury-subtle">
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
