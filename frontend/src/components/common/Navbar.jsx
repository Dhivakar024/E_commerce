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
  const [wishlistBouncing, setWishlistBouncing] = useState(false);

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

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
            className="group flex items-center gap-2 text-decoration-none focus:outline-none transition-transform duration-300 hover:scale-102"
            aria-label="LAX360 PVT LTD Home"
          >
            <div className="flex flex-col">
              <span
                className={`font-cinzel text-xl sm:text-2xl tracking-[0.28em] font-semibold transition-colors duration-400 ${
                  isDark
                    ? 'text-white group-hover:text-[#C9A45C]'
                    : 'text-[#101820] group-hover:text-black'
                }`}
              >
                LAX360
              </span>
              <span
                className={`text-[8px] sm:text-[9px] uppercase tracking-ultra -mt-1 font-bold transition-colors duration-400 ${
                  isDark
                    ? 'text-[#C9A45C]'
                    : 'text-[#101820] bg-black/10 px-1 py-0.2 rounded w-max'
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
                        : 'text-[#101820] font-bold bg-black/10'
                      : isDark
                        ? 'text-[#F7F3EA]/85 hover:text-[#C9A45C] hover:bg-white/5'
                        : 'text-[#101820]/90 font-semibold hover:text-black hover:bg-black/10'
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
                            : 'bg-[#101820]'
                        }`}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT: Action Icons + Dark/Light Theme Toggle */}
          <div className="flex items-center space-x-1 sm:space-x-2.5">
            {/* Search Icon */}
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className={`p-2 transition-all duration-300 rounded-full focus:outline-none hover:scale-105 active:scale-95 cursor-pointer ${
                isDark
                  ? 'text-[#F7F3EA]/85 hover:text-[#C9A45C] hover:bg-[#C9A45C]/15 focus:ring-1 focus:ring-[#C9A45C]/50'
                  : 'text-[#101820] hover:text-black hover:bg-black/15 focus:ring-1 focus:ring-[#101820]/50'
              }`}
              aria-label="Search catalog"
            >
              <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </button>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className={`relative hidden sm:inline-flex p-2 transition-all duration-300 rounded-full focus:outline-none hover:scale-105 active:scale-95 group ${
                isDark
                  ? 'text-[#F7F3EA]/85 hover:text-[#C9A45C] hover:bg-[#C9A45C]/15 focus:ring-1 focus:ring-[#C9A45C]/50'
                  : 'text-[#101820] hover:text-black hover:bg-black/15 focus:ring-1 focus:ring-[#101820]/50'
              }`}
              aria-label={`Wishlist (${wishlistCount} items)`}
            >
              <Heart
                className={`w-4 h-4 sm:w-[18px] sm:h-[18px] group-hover:scale-110 transition-transform ${
                  wishlistBouncing
                    ? 'animate-heart-pop text-[#C9A45C]'
                    : isDark
                      ? 'group-hover:text-[#C9A45C]'
                      : 'group-hover:text-black'
                }`}
              />
              {wishlistCount > 0 && (
                <span
                  className={`absolute top-1 right-1 w-3.5 h-3.5 font-bold text-[9px] flex items-center justify-center rounded-full leading-none shadow-xs ${
                    wishlistBouncing ? 'animate-badge-bump' : ''
                  } ${
                    isDark
                      ? 'bg-[#C9A45C] text-[#101820]'
                      : 'bg-[#101820] text-white'
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
                  : 'text-[#101820] hover:text-black hover:bg-black/15 focus:ring-1 focus:ring-[#101820]/50'
              }`}
              aria-label={`Shopping Cart (${cartCount} items)`}
            >
              <ShoppingBag
                className={`w-4 h-4 sm:w-[18px] sm:h-[18px] group-hover:scale-110 transition-transform ${
                  cartBouncing
                    ? 'animate-cart-bounce text-[#C9A45C]'
                    : isDark
                      ? 'group-hover:text-[#C9A45C]'
                      : 'group-hover:text-black'
                }`}
              />
              {cartCount > 0 && (
                <span
                  className={`absolute top-1 right-1 w-3.5 h-3.5 font-bold text-[9px] flex items-center justify-center rounded-full leading-none shadow-xs ${
                    cartBouncing ? 'animate-badge-bump' : ''
                  } ${
                    isDark
                      ? 'bg-[#C9A45C] text-[#101820]'
                      : 'bg-[#101820] text-white'
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
                    : 'text-white bg-[#101820] border border-[#101820] hover:bg-black'
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
                  : 'text-[#101820] hover:text-black hover:bg-black/15 focus:ring-1 focus:ring-[#101820]/50'
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
                  : 'text-[#101820] hover:text-black hover:bg-black/15 focus:ring-1 focus:ring-[#101820]/50'
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
