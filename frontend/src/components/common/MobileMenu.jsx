import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  X,
  ShoppingBag,
  Heart,
  User,
  Search,
  ArrowRight,
  Sun,
  Moon,
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export const MobileMenu = ({ isOpen, onClose }) => {
  const { cartCount, wishlistCount } = useShop();
  const { isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Collections', path: '/collections' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

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
        className={`fixed top-0 right-0 w-[85%] max-w-sm h-full z-50 p-6 flex flex-col justify-between overflow-y-auto transition-all duration-300 ease-out md:hidden shadow-2xl ${
          isDark
            ? 'bg-[#6F5A2E] text-[#F7F3EA] border-l border-[#E6D09A]/30'
            : 'bg-[#E6D09A] text-[#101820] border-l border-[#785A1E]/20'
        } ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-black/15 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className={`font-cinzel text-lg tracking-[0.25em] font-semibold ${
                isDark ? 'text-white' : 'text-[#101820]'
              }`}>
                LAX360
              </span>
              <span className={`text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded font-bold ${
                isDark
                  ? 'text-[#C9A45C] border border-[#C9A45C]/40 bg-[#C9A45C]/10'
                  : 'text-[#101820] border border-[#101820]/30 bg-black/10'
              }`}>
                PVT LTD
              </span>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isDark
                  ? 'text-[#F7F3EA]/80 hover:text-white hover:bg-white/10'
                  : 'text-[#101820] hover:text-black hover:bg-black/15'
              }`}
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="mt-5 mb-5">
            <div className="relative">
              <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
                isDark ? 'text-[#A9B0B5]' : 'text-[#101820]/70'
              }`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands..."
                className={`w-full py-2.5 pl-9 pr-4 text-xs transition-colors focus:outline-none border ${
                  isDark
                    ? 'bg-white/5 border-white/15 text-white placeholder:text-[#A9B0B5]/60 focus:border-[#C9A45C]'
                    : 'bg-white/90 border-[#B8944D] text-[#101820] placeholder:text-[#4A5560]/70 focus:border-[#101820]'
                }`}
              />
            </div>
          </form>

          {/* Navigation Links: HOME, SHOP, COLLECTIONS, ABOUT, CONTACT */}
          <nav className="flex flex-col space-y-1.5">
            {navLinks.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between py-3 px-3.5 text-xs tracking-widest uppercase font-medium transition-all rounded ${
                    isActive
                      ? isDark
                        ? 'text-[#C9A45C] bg-[#C9A45C]/15 border-l-2 border-[#C9A45C] font-semibold pl-4'
                        : 'text-[#101820] bg-black/15 border-l-2 border-[#101820] font-bold pl-4'
                      : isDark
                        ? 'text-[#F7F3EA]/85 hover:text-[#C9A45C] hover:bg-white/5'
                        : 'text-[#101820] font-semibold hover:text-black hover:bg-black/10'
                  }`
                }
              >
                <span>{item.label}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </NavLink>
            ))}

            {/* THEME TOGGLE ROW IN MOBILE MENU */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`w-full flex items-center justify-between py-3 px-3.5 text-xs tracking-widest uppercase font-medium transition-all rounded cursor-pointer mt-2 ${
                isDark
                  ? 'text-[#C9A45C] bg-white/5 border border-[#C9A45C]/30 hover:bg-[#C9A45C]/15'
                  : 'text-[#101820] bg-black/10 border border-[#B8944D] hover:bg-black/20 font-bold'
              }`}
            >
              <div className="flex items-center gap-2">
                {isDark ? <Sun className="w-4 h-4 text-[#C9A45C]" /> : <Moon className="w-4 h-4 text-[#101820]" />}
                <span>{isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
              </div>
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                isDark ? 'bg-[#C9A45C]/20 text-[#C9A45C]' : 'bg-[#101820] text-white'
              }`}>
                {isDark ? 'Dark' : 'Light'}
              </span>
            </button>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-5 border-t border-black/15 dark:border-white/10 space-y-4">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <NavLink
              to={isAuthenticated ? '/account' : '/login'}
              onClick={onClose}
              className={`flex flex-col items-center gap-1.5 p-2 rounded transition-colors ${
                isDark
                  ? 'bg-white/5 hover:bg-white/10 text-white'
                  : 'bg-black/10 hover:bg-black/20 text-[#101820]'
              }`}
            >
              <User className={`w-4 h-4 ${isDark ? 'text-[#C9A45C]' : 'text-[#101820]'}`} />
              <span className="text-[10px] tracking-wider uppercase font-semibold">Account</span>
            </NavLink>

            <NavLink
              to="/wishlist"
              onClick={onClose}
              className={`flex flex-col items-center gap-1.5 p-2 rounded transition-colors ${
                isDark
                  ? 'bg-white/5 hover:bg-white/10 text-white'
                  : 'bg-black/10 hover:bg-black/20 text-[#101820]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isDark ? 'text-[#C9A45C]' : 'text-[#101820]'}`} />
              <span className="text-[10px] tracking-wider uppercase font-semibold">
                Saved {wishlistCount > 0 ? `(${wishlistCount})` : ''}
              </span>
            </NavLink>

            <NavLink
              to="/cart"
              onClick={onClose}
              className={`flex flex-col items-center gap-1.5 p-2 rounded transition-colors ${
                isDark
                  ? 'bg-white/5 hover:bg-white/10 text-white'
                  : 'bg-black/10 hover:bg-black/20 text-[#101820]'
              }`}
            >
              <ShoppingBag className={`w-4 h-4 ${isDark ? 'text-[#C9A45C]' : 'text-[#101820]'}`} />
              <span className="text-[10px] tracking-wider uppercase font-semibold">
                Bag ({cartCount})
              </span>
            </NavLink>
          </div>

          <p className={`text-[10px] text-center font-light ${
            isDark ? 'text-[#A9B0B5]' : 'text-[#101820]/80 font-medium'
          }`}>
            LAX360 PVT LTD • All in One Marketplace
          </p>
        </div>
      </div>
    </>
  );
};
