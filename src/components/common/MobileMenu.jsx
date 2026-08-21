import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Heart, User, Search, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';

export const MobileMenu = ({ isOpen, onClose, navLinks = [] }) => {
  const { cartCount, wishlistCount } = useShop();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-md z-50 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed top-0 right-0 w-[85%] max-w-sm h-full bg-luxury-black/95 border-l border-white/10 z-50 p-6 flex flex-col justify-between transition-transform duration-300 ease-out md:hidden shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-lg tracking-[0.25em] font-semibold text-white">
                LAX360
              </span>
              <span className="text-[9px] uppercase tracking-widest text-luxury-gold px-1.5 py-0.5 border border-luxury-gold/30 rounded">
                PVT LTD
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-luxury-cream/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="mt-6 mb-6">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-luxury-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collection, fabrics..."
                className="w-full bg-white/5 border border-white/10 rounded-none py-2.5 pl-9 pr-4 text-xs text-luxury-cream placeholder:text-luxury-muted/60 focus:outline-none focus:border-luxury-gold/50 transition-colors"
              />
            </div>
          </form>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between py-3.5 px-3 text-sm tracking-widest uppercase font-light transition-all rounded ${
                    isActive
                      ? 'text-luxury-gold bg-white/5 font-medium pl-4'
                      : 'text-luxury-cream/80 hover:text-white hover:bg-white/5 hover:pl-4'
                  }`
                }
              >
                <span>{link.label}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-40" />
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <NavLink
              to={isAuthenticated ? '/account' : '/login'}
              onClick={onClose}
              className="flex flex-col items-center gap-1.5 p-2 rounded bg-white/5 hover:bg-white/10 text-luxury-cream transition-colors"
            >
              <User className="w-4 h-4 text-luxury-champagne" />
              <span className="text-[10px] tracking-wider uppercase">Account</span>
            </NavLink>

            <NavLink
              to="/wishlist"
              onClick={onClose}
              className="flex flex-col items-center gap-1.5 p-2 rounded bg-white/5 hover:bg-white/10 text-luxury-cream transition-colors"
            >
              <Heart className="w-4 h-4 text-luxury-champagne" />
              <span className="text-[10px] tracking-wider uppercase">
                Saved {wishlistCount > 0 ? `(${wishlistCount})` : ''}
              </span>
            </NavLink>

            <NavLink
              to="/cart"
              onClick={onClose}
              className="flex flex-col items-center gap-1.5 p-2 rounded bg-white/5 hover:bg-white/10 text-luxury-cream transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-luxury-gold" />
              <span className="text-[10px] tracking-wider uppercase">
                Bag ({cartCount})
              </span>
            </NavLink>
          </div>

          <p className="text-[11px] text-center text-luxury-muted font-light">
            Complimentary insured express delivery on all orders.
          </p>
        </div>
      </div>
    </>
  );
};
