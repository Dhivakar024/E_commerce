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
  const megaMenuRef = useRef(null);
  const timeoutRef = useRef(null);
  const location = useLocation();
  const { cartCount, wishlistCount } = useShop();
  const { user, isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
  }, [location.pathname]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 200);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'glass-nav py-3.5 shadow-2xl shadow-black/60'
            : 'glass-nav-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* LEFT: Brand Logo */}
          <Link
            to="/"
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
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-9" aria-label="Main Navigation">
            {/* HOME */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative py-1 text-xs uppercase tracking-widest transition-colors duration-300 ${
                  isActive ? 'text-white font-medium' : 'text-[#F7F3EA]/80 hover:text-white'
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
              className={({ isActive }) =>
                `relative py-1 text-xs uppercase tracking-widest transition-colors duration-300 ${
                  isActive ? 'text-white font-medium' : 'text-[#F7F3EA]/80 hover:text-white'
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

            {/* CATEGORIES with Desktop Mega Menu Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              ref={megaMenuRef}
            >
              <button
                type="button"
                onClick={() => setMegaMenuOpen((prev) => !prev)}
                className={`relative py-1 text-xs uppercase tracking-widest transition-colors duration-300 flex items-center gap-1.5 focus:outline-none cursor-pointer ${
                  megaMenuOpen || location.pathname.startsWith('/category')
                    ? 'text-[#C9A45C] font-medium'
                    : 'text-[#F7F3EA]/80 hover:text-white'
                }`}
                aria-expanded={megaMenuOpen}
                aria-haspopup="true"
              >
                <span>Categories</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    megaMenuOpen ? 'rotate-180 text-[#C9A45C]' : 'opacity-70'
                  }`}
                />
                {location.pathname.startsWith('/category') && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#C9A45C]" />
                )}
              </button>

              {/* Desktop Mega Menu Dropdown Container */}
              {megaMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[850px] lg:w-[960px] bg-[#101820]/95 backdrop-blur-2xl border border-white/15 shadow-2xl p-7 animate-fade-in z-50 text-[#F7F3EA]">
                  <div className="grid grid-cols-5 gap-6">
                    {CATEGORIES.map((cat) => {
                      const IconComponent = CATEGORY_ICONS[cat.slug] || Sparkles;
                      return (
                        <div key={cat.id} className="space-y-3 group/cat">
                          <Link
                            to={`/category/${cat.slug}`}
                            className="flex items-center gap-2 pb-2 border-b border-white/10 group-hover/cat:border-[#C9A45C] transition-colors"
                          >
                            <div className="w-7 h-7 rounded-full bg-[#1B2630] border border-white/10 flex items-center justify-center text-[#C9A45C] group-hover/cat:scale-110 transition-transform">
                              <IconComponent className="w-3.5 h-3.5" />
                            </div>
                            <span className="font-serif text-sm font-medium tracking-wide text-white group-hover/cat:text-[#C9A45C] transition-colors">
                              {cat.name}
                            </span>
                          </Link>

                          {/* Subcategories list */}
                          <ul className="space-y-1.5 text-xs text-[#A9B0B5]">
                            {cat.subcategories.map((sub) => (
                              <li key={sub}>
                                <Link
                                  to={`/shop?category=${cat.slug}&subcategory=${encodeURIComponent(sub)}`}
                                  className="hover:text-[#C9A45C] transition-colors block py-0.5"
                                >
                                  {sub}
                                </Link>
                              </li>
                            ))}
                          </ul>

                          <Link
                            to={`/category/${cat.slug}`}
                            className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-[#C9A45C] hover:text-white pt-1 font-semibold transition-colors"
                          >
                            <span>Explore</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </Link>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mega Menu Footer Banner */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#A9B0B5]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#C9A45C] inline-block animate-pulse" />
                      <span>50+ Multi-Category Premium Selections • Nationwide Fast Delivery</span>
                    </div>
                    <Link
                      to="/shop"
                      className="text-xs uppercase tracking-widest text-[#C9A45C] hover:text-white font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <span>View All Products</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* COLLECTIONS */}
            <NavLink
              to="/collections"
              className={({ isActive }) =>
                `relative py-1 text-xs uppercase tracking-widest transition-colors duration-300 ${
                  isActive ? 'text-white font-medium' : 'text-[#F7F3EA]/80 hover:text-white'
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
              className={({ isActive }) =>
                `relative py-1 text-xs uppercase tracking-widest transition-colors duration-300 ${
                  isActive ? 'text-white font-medium' : 'text-[#F7F3EA]/80 hover:text-white'
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
              onClick={() => setSearchModalOpen(true)}
              className="hidden md:inline-flex p-2 text-[#F7F3EA]/80 hover:text-white transition-colors rounded-full hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-[#C9A45C]/50"
              aria-label="Search catalog"
            >
              <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </button>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="relative hidden sm:inline-flex p-2 text-[#F7F3EA]/80 hover:text-white transition-colors rounded-full hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-[#C9A45C]/50"
              aria-label={`Wishlist (${wishlistCount} items)`}
            >
              <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#C9A45C] text-[#101820] font-bold text-[9px] flex items-center justify-center rounded-full leading-none animate-fade-in">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon with live badge */}
            <Link
              to="/cart"
              className="relative p-2 text-[#F7F3EA]/80 hover:text-white transition-colors rounded-full hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-[#C9A45C]/50"
              aria-label={`Shopping Cart (${cartCount} items)`}
            >
              <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
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
              className="hidden sm:inline-flex p-2 text-[#F7F3EA]/80 hover:text-white transition-colors rounded-full hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-[#C9A45C]/50"
              aria-label={isAuthenticated ? `Account (${user?.firstName || 'Customer'})` : 'Sign In'}
            >
              <User className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-[#F7F3EA] hover:text-white transition-colors rounded-full hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-[#C9A45C]/50"
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
