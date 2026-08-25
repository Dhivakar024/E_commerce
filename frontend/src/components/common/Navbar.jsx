import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  Shield,
  ChevronDown,
  ArrowRight,
  Shirt,
  Armchair,
  Smartphone,
  Pill,
  Sparkles,
} from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { SearchModal } from './SearchModal';
import { useShop } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { CATEGORIES } from '../../data/categories';

const CATEGORY_ICONS = {
  fashion: Shirt,
  furniture: Armchair,
  electronics: Smartphone,
  medicines: Pill,
  cosmetics: Sparkles,
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [cartBouncing, setCartBouncing] = useState(false);

  const headerRef = useRef(null);
  const megaMenuRef = useRef(null);
  const location = useLocation();
  const scrollProgress = useScrollProgress();

  const { cartCount, wishlistCount } = useShop();
  const { user, isAuthenticated, isAdmin } = useAuth();

  // Watch scroll for sticky compact transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
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

  // Close menus whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
  }, [location.pathname]);

  // Click outside & Escape key listeners for Mega Menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        megaMenuOpen &&
        headerRef.current &&
        !headerRef.current.contains(e.target)
      ) {
        setMegaMenuOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && megaMenuOpen) {
        setMegaMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [megaMenuOpen]);

  const toggleMegaMenu = () => {
    setMegaMenuOpen((prev) => !prev);
  };

  const closeMegaMenu = () => {
    setMegaMenuOpen(false);
  };

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
            ? 'glass-nav py-3 shadow-2xl shadow-black/80'
            : 'glass-nav-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* LEFT: Brand Logo */}
          <Link
            to="/"
            onClick={closeMegaMenu}
            className="group flex items-center gap-2 text-decoration-none focus:outline-none"
            aria-label="LAX360 PVT LTD Home"
          >
            <div className="flex flex-col">
              <span className="font-cinzel text-xl sm:text-2xl tracking-[0.28em] font-semibold text-white transition-colors duration-300 group-hover:text-[#C9A45C]">
                LAX360
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-ultra text-[#C9A45C] -mt-1 font-semibold">
                PVT LTD
              </span>
            </div>
          </Link>

          {/* CENTER: Navigation Links (Desktop) */}
          <nav
            className="hidden md:flex items-center space-x-7 lg:space-x-9"
            aria-label="Main Navigation"
          >
            {/* HOME */}
            <NavLink
              to="/"
              onClick={closeMegaMenu}
              className={({ isActive }) =>
                `relative py-1 text-xs uppercase tracking-widest transition-colors duration-300 ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-[#F7F3EA]/80 hover:text-white'
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

            {/* SHOP */}
            <NavLink
              to="/shop"
              onClick={closeMegaMenu}
              className={({ isActive }) =>
                `relative py-1 text-xs uppercase tracking-widest transition-colors duration-300 ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-[#F7F3EA]/80 hover:text-white'
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

            {/* CATEGORIES BUTTON (Toggles Mega Menu directly beneath navbar) */}
            <button
              type="button"
              onClick={toggleMegaMenu}
              className={`relative py-1 text-xs uppercase tracking-widest transition-colors duration-300 flex items-center gap-1.5 focus:outline-none cursor-pointer ${
                megaMenuOpen || location.pathname.startsWith('/category')
                  ? 'text-[#C9A45C] font-semibold'
                  : 'text-[#F7F3EA]/80 hover:text-white'
              }`}
              aria-expanded={megaMenuOpen}
              aria-haspopup="true"
              aria-controls="desktop-categories-mega-menu"
            >
              <span>Categories</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  megaMenuOpen ? 'rotate-180 text-[#C9A45C]' : 'opacity-70'
                }`}
              />
              {(megaMenuOpen || location.pathname.startsWith('/category')) && (
                <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#C9A45C]" />
              )}
            </button>

            {/* COLLECTIONS */}
            <NavLink
              to="/collections"
              onClick={closeMegaMenu}
              className={({ isActive }) =>
                `relative py-1 text-xs uppercase tracking-widest transition-colors duration-300 ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-[#F7F3EA]/80 hover:text-white'
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

            {/* ABOUT */}
            <NavLink
              to="/about"
              onClick={closeMegaMenu}
              className={({ isActive }) =>
                `relative py-1 text-xs uppercase tracking-widest transition-colors duration-300 ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-[#F7F3EA]/80 hover:text-white'
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
          </nav>

          {/* RIGHT: Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Icon */}
            <button
              type="button"
              onClick={() => {
                closeMegaMenu();
                setSearchModalOpen(true);
              }}
              className="p-2 text-[#F7F3EA]/80 hover:text-white transition-all rounded-full hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-[#C9A45C]/50 cursor-pointer"
              aria-label="Search catalog"
            >
              <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </button>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              onClick={closeMegaMenu}
              className="relative hidden sm:inline-flex p-2 text-[#F7F3EA]/80 hover:text-white transition-all rounded-full hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-[#C9A45C]/50 group"
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
              onClick={closeMegaMenu}
              className={`relative p-2 text-[#F7F3EA]/80 hover:text-white transition-all rounded-full hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-[#C9A45C]/50 group ${
                cartBouncing ? 'animate-cart-bounce text-[#C9A45C]' : ''
              }`}
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
                onClick={closeMegaMenu}
                className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold text-[#C9A45C] bg-[#C9A45C]/10 border border-[#C9A45C]/30 hover:bg-[#C9A45C]/20 transition-colors"
              >
                <Shield className="w-3 h-3" />
                <span>Admin</span>
              </Link>
            )}

            {/* Account Icon */}
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              onClick={closeMegaMenu}
              className="hidden sm:inline-flex p-2 text-[#F7F3EA]/80 hover:text-white transition-all rounded-full hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-[#C9A45C]/50"
              aria-label={
                isAuthenticated
                  ? `Account (${user?.firstName || 'Customer'})`
                  : 'Sign In'
              }
            >
              <User className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => {
                closeMegaMenu();
                setMobileMenuOpen(true);
              }}
              className="md:hidden p-2 text-[#F7F3EA] hover:text-white transition-colors rounded-full hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-[#C9A45C]/50"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. FULL-WIDTH CATEGORIES MEGA MENU (OPENS DIRECTLY UNDER NAVBAR) */}
        {megaMenuOpen && (
          <div
            id="desktop-categories-mega-menu"
            ref={megaMenuRef}
            className="absolute top-full left-0 right-0 w-full bg-[#101820]/95 backdrop-blur-2xl border-t border-b border-white/15 shadow-2xl animate-mega-menu z-50 text-[#F7F3EA] overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8">
              {/* 5 Equal Category Columns Responsive CSS Grid */}
              <div className="grid grid-cols-5 gap-6 lg:gap-8">
                {CATEGORIES.map((cat, idx) => {
                  const IconComponent = CATEGORY_ICONS[cat.slug] || Sparkles;

                  return (
                    <div key={cat.id} className="space-y-3.5 group/col">
                      {/* Column Header */}
                      <Link
                        to={`/category/${cat.slug}`}
                        onClick={closeMegaMenu}
                        className="flex items-center gap-2.5 pb-2.5 border-b border-white/10 group-hover/col:border-[#C9A45C] transition-colors"
                      >
                        <div className="w-8 h-8 rounded-none bg-[#1B2630] border border-white/10 flex items-center justify-center text-[#C9A45C] group-hover/col:bg-[#C9A45C] group-hover/col:text-[#101820] group-hover/col:scale-105 transition-all">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-serif text-sm font-semibold tracking-wide text-white group-hover/col:text-[#C9A45C] transition-colors block">
                            {cat.name}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider text-[#A9B0B5] font-light">
                            0{idx + 1} Department
                          </span>
                        </div>
                      </Link>

                      {/* Subcategories List */}
                      <ul className="space-y-2 text-xs text-[#A9B0B5]">
                        {cat.subcategories.map((sub) => (
                          <li key={sub}>
                            <Link
                              to={`/shop?category=${cat.slug}&subcategory=${encodeURIComponent(sub)}`}
                              onClick={closeMegaMenu}
                              className="hover:text-[#C9A45C] hover:translate-x-1 transition-all duration-200 block py-0.5"
                            >
                              {sub}
                            </Link>
                          </li>
                        ))}
                      </ul>

                      {/* Explore Link */}
                      <div className="pt-2">
                        <Link
                          to={`/category/${cat.slug}`}
                          onClick={closeMegaMenu}
                          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[#C9A45C] hover:text-white font-semibold transition-colors group/exp"
                        >
                          <span>Explore {cat.name}</span>
                          <ArrowRight className="w-3 h-3 group-hover/exp:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mega Menu Footer Banner */}
              <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A9B0B5]">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#C9A45C] inline-block animate-pulse" />
                  <span>
                    50+ Multi-Category Premium Selections • 100% Genuine Quality • Fast Nationwide Delivery
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <Link
                    to="/shop"
                    onClick={closeMegaMenu}
                    className="text-xs uppercase tracking-widest text-[#C9A45C] hover:text-white font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <span>Browse All Products</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
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
