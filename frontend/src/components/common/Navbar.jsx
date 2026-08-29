import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  Shield,
} from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { SearchModal } from './SearchModal';
import { ThemeToggle } from './ThemeToggle';
import { useShop } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [cartBouncing, setCartBouncing] = useState(false);

  const headerRef = useRef(null);
  const location = useLocation();
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

  // Animate cart icon on count increase
  useEffect(() => {
    if (cartCount > 0) {
      setCartBouncing(true);
      const timer = setTimeout(() => setCartBouncing(false), 600);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'glass-nav py-3 shadow-xl'
            : 'glass-nav-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* LEFT: Brand Logo */}
          <Link
            to="/"
            className="group flex items-center gap-2 text-decoration-none focus:outline-none"
            aria-label="LAX360 PVT LTD Home"
          >
            <div className="flex flex-col">
              <span className={`font-cinzel text-xl sm:text-2xl tracking-[0.28em] font-semibold transition-colors duration-300 group-hover:text-[#C9A45C] ${
                isDark ? 'text-white' : 'text-[#101820]'
              }`}>
                LAX360
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-ultra text-[#C9A45C] -mt-1 font-semibold">
                PVT LTD
              </span>
            </div>
          </Link>

          {/* CENTER: Navigation Links (Desktop) */}
          <nav
            className="hidden md:flex items-center space-x-7 lg:space-x-10"
            aria-label="Main Navigation"
          >
            {/* 1. HOME */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative py-1 text-xs uppercase tracking-widest transition-colors duration-300 font-medium ${
                  isActive
                    ? isDark ? 'text-white font-semibold' : 'text-[#101820] font-semibold'
                    : isDark ? 'text-[#F7F3EA]/80 hover:text-white' : 'text-[#101820]/75 hover:text-[#101820]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>Home</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#C9A45C] transform origin-left transition-transform duration-300" />
                  )}
                </>
              )}
            </NavLink>

            {/* 2. SHOP */}
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `relative py-1 text-xs uppercase tracking-widest transition-colors duration-300 font-medium ${
                  isActive
                    ? isDark ? 'text-white font-semibold' : 'text-[#101820] font-semibold'
                    : isDark ? 'text-[#F7F3EA]/80 hover:text-white' : 'text-[#101820]/75 hover:text-[#101820]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>Shop</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#C9A45C] transform origin-left transition-transform duration-300" />
                  )}
                </>
              )}
            </NavLink>

            {/* 3. COLLECTIONS */}
            <NavLink
              to="/collections"
              className={({ isActive }) =>
                `relative py-1 text-xs uppercase tracking-widest transition-colors duration-300 font-medium ${
                  isActive
                    ? isDark ? 'text-white font-semibold' : 'text-[#101820] font-semibold'
                    : isDark ? 'text-[#F7F3EA]/80 hover:text-white' : 'text-[#101820]/75 hover:text-[#101820]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>Collections</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#C9A45C] transform origin-left transition-transform duration-300" />
                  )}
                </>
              )}
            </NavLink>

            {/* 4. ABOUT */}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `relative py-1 text-xs uppercase tracking-widest transition-colors duration-300 font-medium ${
                  isActive
                    ? isDark ? 'text-white font-semibold' : 'text-[#101820] font-semibold'
                    : isDark ? 'text-[#F7F3EA]/80 hover:text-white' : 'text-[#101820]/75 hover:text-[#101820]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>About</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#C9A45C] transform origin-left transition-transform duration-300" />
                  )}
                </>
              )}
            </NavLink>

            {/* 5. CONTACT */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `relative py-1 text-xs uppercase tracking-widest transition-colors duration-300 font-medium ${
                  isActive
                    ? isDark ? 'text-white font-semibold' : 'text-[#101820] font-semibold'
                    : isDark ? 'text-[#F7F3EA]/80 hover:text-white' : 'text-[#101820]/75 hover:text-[#101820]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>Contact</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#C9A45C] transform origin-left transition-transform duration-300" />
                  )}
                </>
              )}
            </NavLink>
          </nav>

          {/* RIGHT: Action Icons + Dark/Light Theme Toggle */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            {/* Search Icon */}
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className={`p-2 transition-all rounded-full focus:outline-none focus:ring-1 focus:ring-[#C9A45C]/50 cursor-pointer ${
                isDark
                  ? 'text-[#F7F3EA]/80 hover:text-white hover:bg-white/10'
                  : 'text-[#101820]/80 hover:text-[#101820] hover:bg-black/5'
              }`}
              aria-label="Search catalog"
            >
              <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </button>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className={`relative hidden sm:inline-flex p-2 transition-all rounded-full focus:outline-none focus:ring-1 focus:ring-[#C9A45C]/50 group ${
                isDark
                  ? 'text-[#F7F3EA]/80 hover:text-white hover:bg-white/10'
                  : 'text-[#101820]/80 hover:text-[#101820] hover:bg-black/5'
              }`}
              aria-label={`Wishlist (${wishlistCount} items)`}
            >
              <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px] group-hover:scale-110 group-hover:text-[#C9A45C] transition-transform" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#C9A45C] text-[#101820] font-bold text-[9px] flex items-center justify-center rounded-full leading-none animate-fade-in">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon with Bounce */}
            <Link
              to="/cart"
              className={`relative p-2 transition-all rounded-full focus:outline-none focus:ring-1 focus:ring-[#C9A45C]/50 group ${
                isDark
                  ? 'text-[#F7F3EA]/80 hover:text-white hover:bg-white/10'
                  : 'text-[#101820]/80 hover:text-[#101820] hover:bg-black/5'
              } ${cartBouncing ? 'animate-cart-bounce text-[#C9A45C]' : ''}`}
              aria-label={`Shopping Cart (${cartCount} items)`}
            >
              <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px] group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#C9A45C] text-[#101820] font-bold text-[9px] flex items-center justify-center rounded-full leading-none animate-fade-in">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Admin Badge link (if admin) */}
            {isAdmin && (
              <Link
                to="/admin"
                className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold text-[#C9A45C] bg-[#C9A45C]/10 border border-[#C9A45C]/30 hover:bg-[#C9A45C]/20 transition-colors"
              >
                <Shield className="w-3 h-3" />
                <span>Admin</span>
              </Link>
            )}

            {/* Account Icon */}
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className={`hidden sm:inline-flex p-2 transition-all rounded-full focus:outline-none focus:ring-1 focus:ring-[#C9A45C]/50 ${
                isDark
                  ? 'text-[#F7F3EA]/80 hover:text-white hover:bg-white/10'
                  : 'text-[#101820]/80 hover:text-[#101820] hover:bg-black/5'
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
              className={`md:hidden p-2 transition-colors rounded-full focus:outline-none focus:ring-1 focus:ring-[#C9A45C]/50 ${
                isDark
                  ? 'text-[#F7F3EA] hover:text-white hover:bg-white/10'
                  : 'text-[#101820] hover:text-[#101820] hover:bg-black/5'
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

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};
