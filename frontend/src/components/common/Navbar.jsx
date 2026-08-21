import React, { useState, useEffect } from 'react';
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
import { useShop } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Collections', path: '/collections' },
  { label: 'About', path: '/about' },
];

const MOBILE_NAV_LINKS = [
  ...NAV_LINKS,
  { label: 'Contact', path: '/contact' },
  { label: 'Account', path: '/account' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
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

  // Close mobile menu whenever location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

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
              <span className="font-cinzel text-xl sm:text-2xl tracking-[0.28em] font-semibold text-white transition-colors duration-300 group-hover:text-luxury-champagne">
                LAX360
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-ultra text-luxury-gold -mt-1 font-light">
                PVT LTD
              </span>
            </div>
          </Link>

          {/* CENTER: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative py-1 text-xs uppercase tracking-widest font-normal transition-colors duration-300 ${
                    isActive
                      ? 'text-white font-medium'
                      : 'text-luxury-cream/80 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-luxury-gold transform origin-left transition-transform duration-300" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT: Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Icon */}
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="hidden md:inline-flex p-2 text-luxury-cream/80 hover:text-white transition-colors rounded-full hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-luxury-gold/50"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </button>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="relative hidden sm:inline-flex p-2 text-luxury-cream/80 hover:text-white transition-colors rounded-full hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-luxury-gold/50"
              aria-label={`Wishlist (${wishlistCount} items)`}
            >
              <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-luxury-gold text-luxury-black font-bold text-[9px] flex items-center justify-center rounded-full leading-none animate-fade-in">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon with live badge */}
            <Link
              to="/cart"
              className="relative p-2 text-luxury-cream/80 hover:text-white transition-colors rounded-full hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-luxury-gold/50"
              aria-label={`Shopping Cart (${cartCount} items)`}
            >
              <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-luxury-gold text-luxury-black font-bold text-[9px] flex items-center justify-center rounded-full leading-none animate-fade-in">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Admin Badge link (if admin) */}
            {isAdmin && (
              <Link
                to="/admin"
                className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium text-luxury-gold bg-luxury-gold/10 border border-luxury-gold/30 hover:bg-luxury-gold/20 transition-colors"
              >
                <Shield className="w-3 h-3" />
                <span>Admin</span>
              </Link>
            )}

            {/* Account Icon */}
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className="hidden sm:inline-flex p-2 text-luxury-cream/80 hover:text-white transition-colors rounded-full hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-luxury-gold/50"
              aria-label={isAuthenticated ? `Account (${user?.firstName})` : 'Sign In'}
            >
              <User className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-luxury-cream hover:text-white transition-colors rounded-full hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-luxury-gold/50"
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
        navLinks={MOBILE_NAV_LINKS}
      />
    </>
  );
};
