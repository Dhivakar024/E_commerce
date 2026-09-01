import React, { useState, useEffect, useRef, useMemo } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  Shield,
  X,
  ArrowRight,
} from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { ThemeToggle } from './ThemeToggle';
import { useShop } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { PRODUCTS } from '../../data/products';
import { CATEGORIES } from '../../data/categories';
import { searchProducts, searchCategories } from '../../utils/search';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
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

  // Close mobile menu and suggestions on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowSuggestions(false);
  }, [location.pathname]);

  // Auto-focus and select search input when opened
  useEffect(() => {
    if (searchOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
        if (searchQuery) {
          searchInputRef.current?.select();
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [searchOpen]);

  // Live matching products & categories for autocomplete dropdown
  const { matchingProducts, matchingCategories } = useMemo(() => {
    if (!searchQuery.trim()) {
      return { matchingProducts: [], matchingCategories: [] };
    }
    const prods = searchProducts(PRODUCTS, searchQuery).slice(0, 5);
    const cats = searchCategories(searchQuery, CATEGORIES);
    return { matchingProducts: prods, matchingCategories: cats };
  }, [searchQuery]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setSearchOpen(false);
        setShowSuggestions(false);
      }
    };

    if (searchOpen || showSuggestions) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen, showSuggestions]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && (searchOpen || showSuggestions)) {
        setSearchOpen(false);
        setShowSuggestions(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, showSuggestions]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
      setSearchOpen(false);
    }
  };

  const handleSelectProduct = (product) => {
    navigate(`/product/${product.slug}`);
    setShowSuggestions(false);
    setSearchOpen(false);
  };

  const handleSelectCategory = (category) => {
    navigate(`/category/${category.slug}`);
    setShowSuggestions(false);
    setSearchOpen(false);
  };

  const handleSearchIconClick = () => {
    if (!searchOpen) {
      setSearchOpen(true);
      setShowSuggestions(Boolean(searchQuery.trim()));
    } else if (searchQuery.trim()) {
      handleSearchSubmit();
    } else {
      setSearchOpen(false);
      setShowSuggestions(false);
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
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#101820] via-[#C9A45C] to-[#101820] z-50 origin-left transition-all duration-100 ease-out pointer-events-none"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
        aria-hidden="true"
      />

      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'glass-nav py-2.5 sm:py-3 shadow-md'
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
              <span className="font-cinzel text-xl sm:text-2xl tracking-[0.28em] font-bold text-[#101820] group-hover:text-black transition-colors duration-300">
                LAX360
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-ultra -mt-1 font-bold text-[#101820]/80 group-hover:text-black transition-colors duration-300">
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
                      ? 'text-[#101820] font-bold'
                      : 'text-[#101820]/80 hover:text-black hover:bg-black/10'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && (
                      <span
                        className="absolute -bottom-1 left-1 right-1 h-[2px] transform origin-left transition-transform duration-300 bg-[#101820]"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT: Action Icons + Inline Expandable Search + Dark/Light Theme Toggle */}
          <div className="flex items-center space-x-1 sm:space-x-2 text-[#101820]">
            {/* Inline Expandable Search Input & Autocomplete Dropdown */}
            <div ref={searchContainerRef} className="relative flex items-center">
              <form
                onSubmit={handleSearchSubmit}
                className={`flex items-center overflow-hidden transition-all duration-300 ease-in-out border rounded-full ${
                  searchOpen
                    ? 'w-48 sm:w-64 md:w-72 bg-white/90 border-[#101820]/25 shadow-md shadow-black/15'
                    : 'w-9 h-9 sm:w-10 sm:h-10 bg-transparent border-transparent'
                }`}
              >
                <button
                  type={searchOpen && searchQuery.trim() ? 'submit' : 'button'}
                  onClick={handleSearchIconClick}
                  className="p-2 transition-all duration-300 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer text-[#101820] hover:text-black hover:bg-black/10 focus:ring-1 focus:ring-[#101820]/30"
                  aria-label="Search catalog"
                  title={searchOpen ? 'Search' : 'Open search'}
                >
                  <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </button>

                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => {
                    if (searchQuery.trim()) setShowSuggestions(true);
                  }}
                  placeholder="Search products..."
                  className={`bg-transparent text-xs py-1.5 pr-2 focus:outline-none flex-grow transition-opacity duration-200 text-[#101820] placeholder:text-[#101820]/60 ${
                    searchOpen ? 'opacity-100' : 'opacity-0 w-0 pointer-events-none'
                  }`}
                  tabIndex={searchOpen ? 0 : -1}
                />

                {searchOpen && (
                  <button
                    type="button"
                    onClick={() => {
                      if (searchQuery) {
                        setSearchQuery('');
                        setShowSuggestions(false);
                        searchInputRef.current?.focus();
                      } else {
                        setSearchOpen(false);
                        setShowSuggestions(false);
                      }
                    }}
                    className="p-1.5 mr-1 rounded-full transition-colors flex-shrink-0 cursor-pointer text-[#101820]/70 hover:text-[#101820]"
                    aria-label="Close or clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>

              {/* Live Search Suggestions Dropdown */}
              {searchOpen && showSuggestions && searchQuery.trim().length >= 1 && (
                <div className="absolute top-full left-0 right-0 mt-2 w-full max-h-[320px] overflow-y-auto border border-[#101820]/20 shadow-2xl z-50 transition-all duration-200 animate-fade-in bg-white text-[#101820] shadow-black/20 rounded-xl overflow-hidden">
                  {/* Products Matches */}
                  {matchingProducts.length > 0 && (
                    <div>
                      <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-widest border-b border-black/10 flex items-center justify-between bg-black/5 text-[#101820]">
                        <span>PRODUCTS</span>
                        <span className="text-[9px] text-[#717D86] font-medium">
                          {matchingProducts.length} results
                        </span>
                      </div>
                      <div className="divide-y divide-black/5">
                        {matchingProducts.map((prod) => (
                          <div
                            key={prod.id}
                            onClick={() => handleSelectProduct(prod)}
                            className="p-2 sm:p-2.5 flex items-center gap-2.5 cursor-pointer group transition-colors hover:bg-black/5"
                          >
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-9 h-9 object-cover border border-black/10 rounded-sm flex-shrink-0"
                            />
                            <div className="flex-grow min-w-0">
                              <p className="text-xs font-semibold truncate group-hover:text-[#B08B43] transition-colors text-[#101820]">
                                {prod.name}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                                <span className="font-semibold text-[#101820]">
                                  ₹{prod.price.toLocaleString('en-IN')}
                                </span>
                                <span className="text-[#717D86] text-[9px] uppercase tracking-wider font-medium truncate">
                                  {prod.category}
                                </span>
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-[#717D86] opacity-0 group-hover:opacity-100 group-hover:text-[#101820] transition-all -translate-x-1 group-hover:translate-x-0 flex-shrink-0" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Categories Matches */}
                  {matchingCategories.length > 0 && (
                    <div>
                      <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-widest border-b border-t border-black/10 bg-black/5 text-[#101820]">
                        <span>CATEGORIES</span>
                      </div>
                      <div className="divide-y divide-black/5">
                        {matchingCategories.map((cat) => (
                          <div
                            key={cat.id}
                            onClick={() => handleSelectCategory(cat)}
                            className="px-3 py-2 flex items-center justify-between cursor-pointer group transition-colors text-xs hover:bg-black/5"
                          >
                            <span className="font-semibold text-[#101820] group-hover:text-[#B08B43] transition-colors truncate">
                              {cat.name}
                            </span>
                            <span className="text-[9px] uppercase tracking-widest text-[#101820] flex items-center gap-1 font-semibold flex-shrink-0">
                              <span>Dept</span>
                              <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* No live suggestions */}
                  {matchingProducts.length === 0 && matchingCategories.length === 0 && (
                    <div className="p-4 text-center text-xs text-[#717D86]">
                      <p>No matches for "{searchQuery}"</p>
                      <p className="text-[10px] text-[#101820] font-semibold mt-1">
                        Press Enter to search catalog
                      </p>
                    </div>
                  )}

                  {/* Submit All Results Button */}
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="w-full text-center py-2 px-3 text-[11px] font-semibold hover:underline border-t border-black/10 flex items-center justify-center gap-1.5 cursor-pointer transition-colors bg-black/5 text-[#101820] hover:bg-black/10"
                  >
                    <span>View all matching results</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="relative hidden sm:inline-flex p-2 transition-all duration-300 rounded-full focus:outline-none hover:scale-105 active:scale-95 group text-[#101820] hover:text-black hover:bg-black/10 focus:ring-1 focus:ring-[#101820]/30"
              aria-label={`Wishlist (${wishlistCount} items)`}
            >
              <Heart
                className={`w-4 h-4 sm:w-[18px] sm:h-[18px] group-hover:scale-110 transition-transform ${
                  wishlistBouncing
                    ? 'animate-heart-pop text-[#101820]'
                    : 'group-hover:text-black'
                }`}
              />
              {wishlistCount > 0 && (
                <span
                  className={`absolute top-1 right-1 w-3.5 h-3.5 font-bold text-[9px] flex items-center justify-center rounded-full leading-none shadow-xs bg-[#101820] text-white ${
                    wishlistBouncing ? 'animate-badge-bump' : ''
                  }`}
                >
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon with Bounce */}
            <Link
              to="/cart"
              className="relative p-2 transition-all duration-300 rounded-full focus:outline-none hover:scale-105 active:scale-95 group text-[#101820] hover:text-black hover:bg-black/10 focus:ring-1 focus:ring-[#101820]/30"
              aria-label={`Shopping Cart (${cartCount} items)`}
            >
              <ShoppingBag
                className={`w-4 h-4 sm:w-[18px] sm:h-[18px] group-hover:scale-110 transition-transform ${
                  cartBouncing
                    ? 'animate-cart-bounce text-[#101820]'
                    : 'group-hover:text-black'
                }`}
              />
              {cartCount > 0 && (
                <span
                  className={`absolute top-1 right-1 w-3.5 h-3.5 font-bold text-[9px] flex items-center justify-center rounded-full leading-none shadow-xs bg-[#101820] text-white ${
                    cartBouncing ? 'animate-badge-bump' : ''
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
                className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold transition-colors text-[#101820] bg-black/10 border border-black/15 hover:bg-black/20"
              >
                <Shield className="w-3 h-3" />
                <span>Admin</span>
              </Link>
            )}

            {/* Account Icon */}
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className="hidden sm:inline-flex p-2 transition-all duration-300 rounded-full focus:outline-none hover:scale-105 active:scale-95 text-[#101820] hover:text-black hover:bg-black/10 focus:ring-1 focus:ring-[#101820]/30"
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
              className="md:hidden p-2 transition-all duration-300 rounded-full focus:outline-none text-[#101820] hover:text-black hover:bg-black/10 focus:ring-1 focus:ring-[#101820]/30 cursor-pointer"
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
