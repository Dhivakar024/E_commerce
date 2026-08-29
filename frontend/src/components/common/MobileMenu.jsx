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
        className={`fixed top-0 right-0 w-[85%] max-w-sm h-full z-50 p-6 flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-out md:hidden shadow-2xl ${
          isDark
            ? 'bg-[#101820] text-[#F7F3EA] border-l border-white/10'
            : 'bg-[#F8F6F0] text-[#101820] border-l border-black/10'
        } ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-lg tracking-[0.25em] font-semibold">
                LAX360
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#C9A45C] px-1.5 py-0.5 border border-[#C9A45C]/30 rounded font-semibold">
                PVT LTD
              </span>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${
                isDark ? 'text-[#F7F3EA]/70 hover:text-white hover:bg-white/10' : 'text-[#101820]/70 hover:text-[#101820] hover:bg-black/5'
              }`}
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="mt-5 mb-5">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A9B0B5]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands..."
                className={`w-full py-2.5 pl-9 pr-4 text-xs transition-colors focus:outline-none focus:border-[#C9A45C] border ${
                  isDark
                    ? 'bg-white/5 border-white/15 text-white placeholder:text-[#A9B0B5]/60'
                    : 'bg-white border-black/15 text-[#101820] placeholder:text-[#4A5560]/60'
                }`}
              />
            </div>
          </form>

          {/* Navigation Links: HOME, SHOP, COLLECTIONS, ABOUT, CONTACT */}
          <nav className="flex flex-col space-y-1">
            {/* 1. HOME */}
            <NavLink
              to="/"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between py-3 px-3 text-xs tracking-widest uppercase font-medium transition-all ${
                  isActive
                    ? 'text-[#C9A45C] bg-white/5 pl-4 font-semibold'
                    : isDark ? 'text-[#F7F3EA]/80 hover:text-white hover:bg-white/5' : 'text-[#101820]/80 hover:text-[#101820] hover:bg-black/5'
                }`
              }
            >
              <span>Home</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-40" />
            </NavLink>

            {/* 2. SHOP */}
            <NavLink
              to="/shop"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between py-3 px-3 text-xs tracking-widest uppercase font-medium transition-all ${
                  isActive
                    ? 'text-[#C9A45C] bg-white/5 pl-4 font-semibold'
                    : isDark ? 'text-[#F7F3EA]/80 hover:text-white hover:bg-white/5' : 'text-[#101820]/80 hover:text-[#101820] hover:bg-black/5'
                }`
              }
            >
              <span>Shop</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-40" />
            </NavLink>

            {/* 3. COLLECTIONS */}
            <NavLink
              to="/collections"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between py-3 px-3 text-xs tracking-widest uppercase font-medium transition-all ${
                  isActive
                    ? 'text-[#C9A45C] bg-white/5 pl-4 font-semibold'
                    : isDark ? 'text-[#F7F3EA]/80 hover:text-white hover:bg-white/5' : 'text-[#101820]/80 hover:text-[#101820] hover:bg-black/5'
                }`
              }
            >
              <span>Collections</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-40" />
            </NavLink>

            {/* 4. ABOUT */}
            <NavLink
              to="/about"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between py-3 px-3 text-xs tracking-widest uppercase font-medium transition-all ${
                  isActive
                    ? 'text-[#C9A45C] bg-white/5 pl-4 font-semibold'
                    : isDark ? 'text-[#F7F3EA]/80 hover:text-white hover:bg-white/5' : 'text-[#101820]/80 hover:text-[#101820] hover:bg-black/5'
                }`
              }
            >
              <span>About</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-40" />
            </NavLink>

            {/* 5. CONTACT */}
            <NavLink
              to="/contact"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between py-3 px-3 text-xs tracking-widest uppercase font-medium transition-all ${
                  isActive
                    ? 'text-[#C9A45C] bg-white/5 pl-4 font-semibold'
                    : isDark ? 'text-[#F7F3EA]/80 hover:text-white hover:bg-white/5' : 'text-[#101820]/80 hover:text-[#101820] hover:bg-black/5'
                }`
              }
            >
              <span>Contact</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-40" />
            </NavLink>

            {/* THEME TOGGLE ROW IN MOBILE MENU */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`w-full flex items-center justify-between py-3 px-3 text-xs tracking-widest uppercase font-medium transition-all cursor-pointer ${
                isDark ? 'text-[#F7F3EA]/80 hover:text-white hover:bg-white/5' : 'text-[#101820]/80 hover:text-[#101820] hover:bg-black/5'
              }`}
            >
              <div className="flex items-center gap-2">
                {isDark ? <Sun className="w-4 h-4 text-[#C9A45C]" /> : <Moon className="w-4 h-4 text-[#B08B43]" />}
                <span>{isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
              </div>
              <span className="text-[10px] uppercase font-semibold text-[#C9A45C]">
                {isDark ? 'Dark' : 'Light'}
              </span>
            </button>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-5 border-t border-white/10 space-y-4">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <NavLink
              to={isAuthenticated ? '/account' : '/login'}
              onClick={onClose}
              className={`flex flex-col items-center gap-1.5 p-2 rounded transition-colors ${
                isDark ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-black/5 hover:bg-black/10 text-[#101820]'
              }`}
            >
              <User className="w-4 h-4 text-[#C9A45C]" />
              <span className="text-[10px] tracking-wider uppercase font-medium">Account</span>
            </NavLink>

            <NavLink
              to="/wishlist"
              onClick={onClose}
              className={`flex flex-col items-center gap-1.5 p-2 rounded transition-colors ${
                isDark ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-black/5 hover:bg-black/10 text-[#101820]'
              }`}
            >
              <Heart className="w-4 h-4 text-[#C9A45C]" />
              <span className="text-[10px] tracking-wider uppercase font-medium">
                Saved {wishlistCount > 0 ? `(${wishlistCount})` : ''}
              </span>
            </NavLink>

            <NavLink
              to="/cart"
              onClick={onClose}
              className={`flex flex-col items-center gap-1.5 p-2 rounded transition-colors ${
                isDark ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-black/5 hover:bg-black/10 text-[#101820]'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-[#C9A45C]" />
              <span className="text-[10px] tracking-wider uppercase font-medium">
                Bag ({cartCount})
              </span>
            </NavLink>
          </div>

          <p className="text-[10px] text-center text-[#A9B0B5] font-light">
            LAX360 PVT LTD • All in One Marketplace
          </p>
        </div>
      </div>
    </>
  );
};
