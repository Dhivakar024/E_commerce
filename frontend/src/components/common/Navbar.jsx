import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  Shield,
  X,
} from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { ThemeToggle } from './ThemeToggle';
import { useShop } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartBouncing, setCartBouncing] = useState(false);
  const [wishlistBouncing, setWishlistBouncing] = useState(false);

  const headerRef = useRef(null);
  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const scrollProgress = useScrollProgress();
  const { isDark } = useTheme();

  const { cartCount, wishlistCount } = useShop();
  const { user, isAuthenticated, isAdmin } = useAuth();

  // Watch scroll for sticky compact transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate cart icon on count change
  useEffect(() => {
    if (cartCount > 0) {
      setCartBouncing(true);
      const timer = setTimeout(() => setCartBouncing(false), 500);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  // Animate wishlist icon on count change
  useEffect(() => {
    if (wishlistCount > 0) {
      setWishlistBouncing(true);
      const timer = setTimeout(() => setWishlistBouncing(false), 500);
      return () => clearTimeout(timer);
    }
  }, [wishlistCount]);

  // Close mobile menu and search on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Auto-focus search input when expanded
  useEffect(() => {
    if (searchOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [searchOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
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
      {/* 1. Scroll Progress Indicator Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#C9A45C] via-[#D8B872] to-[#C9A45C] z-50 origin-left transition-all duration-100 ease-out shadow-sm shadow-[#C9A45C]/30 pointer-events-none"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
        aria-hidden="true"
      />

      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ease-in-out ${
          isScrolled
            ? 'glass-nav py-2.5 sm:py-3 shadow-xl'
            : 'glass-nav-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* LEFT: Brand Logo with 3D Hover Depth */}
          <Link
            to="/"
            className="group flex items-center gap-2 text-decoration-none focus:outline-none transition-transform duration-300 hover:scale-102 flex-shrink-0"
            aria-label="LAX360 PVT LTD Home"
          >
            <div className="flex flex-col">
              <span
                className={`font-cinzel text-xl sm:text-2xl tracking-[0.28em] font-semibold transition-colors duration-400 ${
                  isDark
                    ? 'text-white group-hover:text-[#C9A45C]'
                    : 'text-[#101820] group-hover:text-[#B08B43]'
                }`}
              >
                LAX360
              </span>
              <span
                className={`text-[8px] sm:text-[9px] uppercase tracking-ultra -mt-1 font-bold transition-colors duration-400 ${
                  isDark
                    ? 'text-[#C9A45C]'
                    : 'text-[#B08B43]'
                }`}
              >
                PVT LTD
              </span>
            </div>
          </Link>

          {/* CENTER: Navigation Links (Desktop) */}
          <nav
            className="hidden md:flex items-center space-x-6 lg:space-x-8"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                className={({ isActive }) =>
                  `relative py-1 px-2 text-xs uppercase tracking-widest transition-all duration-300 font-medium hover:-translate-y-0.5 rounded ${
                    isActive
                      ? isDark
                        ? 'text-[#C9A45C] font-semibold'
                        : 'text-[#101820] font-bold'
                      : isDark
                        ? 'text-[#F7F3EA]/85 hover:text-[#C9A45C] hover:bg-white/5'
                        : 'text-[#101820]/80 font-medium hover:text-[#B08B43] hover:bg-black/5'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && (
                      <span
                        className={`absolute -bottom-1 left-1 right-1 h-[2px] transform origin-left transition-transform duration-300 ${
                          isDark
                            ? 'bg-[#C9A45C] shadow-xs shadow-[#C9A45C]'
                            : 'bg-[#B08B43]'
                        }`}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT: Action Icons + Inline Expandable Search + Dark/Light Theme Toggle */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Inline Expandable Search Input (No Fullscreen Modal) */}
            <div ref={searchContainerRef} className="relative flex items-center">
              <form
                onSubmit={handleSearchSubmit}
                className={`flex items-center overflow-hidden transition-all duration-300 ease-in-out border rounded-full ${
                  searchOpen
                    ? isDark
                      ? 'w-44 sm:w-60 md:w-68 bg-[#1B2630] border-[#C9A45C]/50 shadow-md shadow-black/40'
                      : 'w-44 sm:w-60 md:w-68 bg-white border-[#B08B43]/50 shadow-md shadow-black/10'
                    : 'w-9 h-9 sm:w-10 sm:h-10 bg-transparent border-transparent'
                }`}
              >
                <button
                  type={searchOpen && searchQuery.trim() ? 'submit' : 'button'}
                  onClick={() => {
                    if (!searchOpen) {
                      setSearchOpen(true);
                    } else if (searchQuery.trim()) {
                      handleSearchSubmit();
                    } else {
                      setSearchOpen(false);
                    }
                  }}
                  className={`p-2 transition-all duration-300 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer ${
                    isDark
                      ? 'text-[#F7F3EA]/85 hover:text-[#C9A45C] hover:bg-[#C9A45C]/15 focus:ring-1 focus:ring-[#C9A45C]/50'
                      : 'text-[#101820] hover:text-[#B08B43] hover:bg-black/5 focus:ring-1 focus:ring-[#B08B43]/50'
                  }`}
                  aria-label="Search catalog"
                  title={searchOpen ? 'Search' : 'Open search'}
                >
                  <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </button>

                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className={`bg-transparent text-xs py-1.5 pr-2 focus:outline-none flex-grow transition-opacity duration-200 ${
                    searchOpen ? 'opacity-100' : 'opacity-0 w-0 pointer-events-none'
                  } ${
                    isDark
                      ? 'text-white placeholder:text-[#A9B0B5]/60'
                      : 'text-[#101820] placeholder:text-[#717D86]/60'
                  }`}
                  tabIndex={searchOpen ? 0 : -1}
                />

                {searchOpen && (
                  <button
                    type="button"
                    onClick={() => {
                      if (searchQuery) {
                        setSearchQuery('');
                        searchInputRef.current?.focus();
                      } else {
                        setSearchOpen(false);
                      }
                    }}
                    className={`p-1.5 mr-1 rounded-full transition-colors flex-shrink-0 cursor-pointer ${
                      isDark
                        ? 'text-[#A9B0B5] hover:text-white'
                        : 'text-[#717D86] hover:text-[#101820]'
                    }`}
                    aria-label="Close or clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>
            </div>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className={`relative hidden sm:inline-flex p-2 transition-all duration-300 rounded-full focus:outline-none hover:scale-105 active:scale-95 group ${
                isDark
                  ? 'text-[#F7F3EA]/85 hover:text-[#C9A45C] hover:bg-[#C9A45C]/15 focus:ring-1 focus:ring-[#C9A45C]/50'
                  : 'text-[#101820] hover:text-[#B08B43] hover:bg-black/5 focus:ring-1 focus:ring-[#B08B43]/50'
              }`}
              aria-label={`Wishlist (${wishlistCount} items)`}
            >
              <Heart
                className={`w-4 h-4 sm:w-[18px] sm:h-[18px] group-hover:scale-110 transition-transform ${
                  wishlistBouncing
                    ? 'animate-heart-pop text-[#C9A45C]'
                    : isDark
                      ? 'group-hover:text-[#C9A45C]'
                      : 'group-hover:text-[#B08B43]'
                }`}
              />
              {wishlistCount > 0 && (
                <span
                  className={`absolute top-1 right-1 w-3.5 h-3.5 font-bold text-[9px] flex items-center justify-center rounded-full leading-none shadow-xs ${
                    wishlistBouncing ? 'animate-badge-bump' : ''
                  } ${
                    isDark
                      ? 'bg-[#C9A45C] text-[#101820]'
                      : 'bg-[#B08B43] text-white'
                  }`}
                >
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon with Bounce */}
            <Link
              to="/cart"
              className={`relative p-2 transition-all duration-300 rounded-full focus:outline-none hover:scale-105 active:scale-95 group ${
                isDark
                  ? 'text-[#F7F3EA]/85 hover:text-[#C9A45C] hover:bg-[#C9A45C]/15 focus:ring-1 focus:ring-[#C9A45C]/50'
                  : 'text-[#101820] hover:text-[#B08B43] hover:bg-black/5 focus:ring-1 focus:ring-[#B08B43]/50'
              }`}
              aria-label={`Shopping Cart (${cartCount} items)`}
            >
              <ShoppingBag
                className={`w-4 h-4 sm:w-[18px] sm:h-[18px] group-hover:scale-110 transition-transform ${
                  cartBouncing
                    ? 'animate-cart-bounce text-[#C9A45C]'
                    : isDark
                      ? 'group-hover:text-[#C9A45C]'
                      : 'group-hover:text-[#B08B43]'
                }`}
              />
              {cartCount > 0 && (
                <span
                  className={`absolute top-1 right-1 w-3.5 h-3.5 font-bold text-[9px] flex items-center justify-center rounded-full leading-none shadow-xs ${
                    cartBouncing ? 'animate-badge-bump' : ''
                  } ${
                    isDark
                      ? 'bg-[#C9A45C] text-[#101820]'
                      : 'bg-[#B08B43] text-white'
                  }`}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Admin Badge link (if admin) */}
            {isAdmin && (
              <Link
                to="/admin"
                className={`hidden lg:inline-flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold transition-colors ${
                  isDark
                    ? 'text-[#C9A45C] bg-[#C9A45C]/15 border border-[#C9A45C]/40 hover:bg-[#C9A45C]/25'
                    : 'text-[#101820] bg-[#EDE9DF] border border-[#B08B43]/30 hover:bg-[#E4DFD5]'
                }`}
              >
                <Shield className="w-3 h-3" />
                <span>Admin</span>
              </Link>
            )}

            {/* Account Icon */}
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className={`hidden sm:inline-flex p-2 transition-all duration-300 rounded-full focus:outline-none hover:scale-105 active:scale-95 ${
                isDark
                  ? 'text-[#F7F3EA]/85 hover:text-[#C9A45C] hover:bg-[#C9A45C]/15 focus:ring-1 focus:ring-[#C9A45C]/50'
                  : 'text-[#101820] hover:text-[#B08B43] hover:bg-black/5 focus:ring-1 focus:ring-[#B08B43]/50'
              }`}
              aria-label={
                isAuthenticated
                  ? `Account (${user?.firstName || 'Customer'})`
                  : 'Sign In'
              }
            >
              <User className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </Link>

            {/* Dark Mode / Light Mode Sun/Moon Toggle Button */}
            <ThemeToggle />

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className={`md:hidden p-2 transition-all duration-300 rounded-full focus:outline-none ${
                isDark
                  ? 'text-[#F7F3EA] hover:text-[#C9A45C] hover:bg-white/10 focus:ring-1 focus:ring-[#C9A45C]/50'
                  : 'text-[#101820] hover:text-[#B08B43] hover:bg-black/5 focus:ring-1 focus:ring-[#B08B43]/50'
              }`}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};
