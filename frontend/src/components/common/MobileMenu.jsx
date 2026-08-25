import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  X,
  ShoppingBag,
  Heart,
  User,
  Search,
  ArrowRight,
  ChevronDown,
  Shirt,
  Armchair,
  Smartphone,
  Pill,
  Sparkles,
} from 'lucide-react';
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

export const MobileMenu = ({ isOpen, onClose }) => {
  const { cartCount, wishlistCount } = useShop();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const [activeCategorySlug, setActiveCategorySlug] = useState(null);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
    }
  };

  const toggleCategorySub = (slug) => {
    setActiveCategorySlug((prev) => (prev === slug ? null : slug));
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
        className={`fixed top-0 right-0 w-[85%] max-w-sm h-full bg-[#101820] border-l border-white/10 z-50 p-6 flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-out md:hidden shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-lg tracking-[0.25em] font-semibold text-white">
                LAX360
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#C9A45C] px-1.5 py-0.5 border border-[#C9A45C]/30 rounded font-semibold">
                PVT LTD
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#F7F3EA]/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
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
                className="w-full bg-white/5 border border-white/15 py-2.5 pl-9 pr-4 text-xs text-white placeholder:text-[#A9B0B5]/60 focus:outline-none focus:border-[#C9A45C] transition-colors"
              />
            </div>
          </form>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1">
            {/* HOME */}
            <NavLink
              to="/"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between py-3 px-3 text-xs tracking-widest uppercase font-medium transition-all ${
                  isActive ? 'text-[#C9A45C] bg-white/5 pl-4' : 'text-[#F7F3EA]/80 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <span>Home</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-40" />
            </NavLink>

            {/* SHOP */}
            <NavLink
              to="/shop"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between py-3 px-3 text-xs tracking-widest uppercase font-medium transition-all ${
                  isActive ? 'text-[#C9A45C] bg-white/5 pl-4' : 'text-[#F7F3EA]/80 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <span>Shop</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-40" />
            </NavLink>

            {/* CATEGORIES ACCORDION */}
            <div className="border-y border-white/10 my-1 py-1">
              <button
                type="button"
                onClick={() => setCategoriesExpanded((prev) => !prev)}
                className="w-full flex items-center justify-between py-3 px-3 text-xs tracking-widest uppercase font-semibold text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[#C9A45C]">Categories</span>
                  <span className="text-[10px] text-[#A9B0B5] lowercase">(5 categories)</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    categoriesExpanded ? 'rotate-180 text-[#C9A45C]' : 'opacity-60'
                  }`}
                />
              </button>

              {categoriesExpanded && (
                <div className="pl-3 pr-2 py-2 space-y-2 animate-fade-in bg-black/20 rounded-md">
                  {CATEGORIES.map((cat) => {
                    const IconComponent = CATEGORY_ICONS[cat.slug] || Sparkles;
                    const isSubOpen = activeCategorySlug === cat.slug;

                    return (
                      <div key={cat.id} className="border-b border-white/5 last:border-b-0 pb-1.5">
                        <div className="flex items-center justify-between py-1.5">
                          <Link
                            to={`/category/${cat.slug}`}
                            onClick={onClose}
                            className="flex items-center gap-2 text-xs text-white hover:text-[#C9A45C] transition-colors"
                          >
                            <IconComponent className="w-3.5 h-3.5 text-[#C9A45C]" />
                            <span className="font-serif text-sm">{cat.name}</span>
                          </Link>

                          <button
                            type="button"
                            onClick={() => toggleCategorySub(cat.slug)}
                            className="p-1.5 text-[#A9B0B5] hover:text-white"
                            aria-label={`Toggle ${cat.name} subcategories`}
                          >
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                isSubOpen ? 'rotate-180 text-[#C9A45C]' : ''
                              }`}
                            />
                          </button>
                        </div>

                        {/* Subcategory links */}
                        {isSubOpen && (
                          <div className="pl-6 py-1 space-y-1.5 text-xs text-[#A9B0B5]">
                            {cat.subcategories.map((sub) => (
                              <Link
                                key={sub}
                                to={`/shop?category=${cat.slug}&subcategory=${encodeURIComponent(sub)}`}
                                onClick={onClose}
                                className="block py-0.5 hover:text-[#C9A45C] transition-colors"
                              >
                                • {sub}
                              </Link>
                            ))}
                            <Link
                              to={`/category/${cat.slug}`}
                              onClick={onClose}
                              className="block py-1 text-[11px] text-[#C9A45C] font-medium"
                            >
                              Explore All {cat.name} →
                            </Link>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* COLLECTIONS */}
            <NavLink
              to="/collections"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between py-3 px-3 text-xs tracking-widest uppercase font-medium transition-all ${
                  isActive ? 'text-[#C9A45C] bg-white/5 pl-4' : 'text-[#F7F3EA]/80 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <span>Collections</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-40" />
            </NavLink>

            {/* ABOUT */}
            <NavLink
              to="/about"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between py-3 px-3 text-xs tracking-widest uppercase font-medium transition-all ${
                  isActive ? 'text-[#C9A45C] bg-white/5 pl-4' : 'text-[#F7F3EA]/80 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <span>About</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-40" />
            </NavLink>

            {/* CONTACT */}
            <NavLink
              to="/contact"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between py-3 px-3 text-xs tracking-widest uppercase font-medium transition-all ${
                  isActive ? 'text-[#C9A45C] bg-white/5 pl-4' : 'text-[#F7F3EA]/80 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <span>Contact</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-40" />
            </NavLink>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-5 border-t border-white/10 space-y-4">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <NavLink
              to={isAuthenticated ? '/account' : '/login'}
              onClick={onClose}
              className="flex flex-col items-center gap-1.5 p-2 rounded bg-white/5 hover:bg-white/10 text-white transition-colors"
            >
              <User className="w-4 h-4 text-[#C9A45C]" />
              <span className="text-[10px] tracking-wider uppercase font-medium">Account</span>
            </NavLink>

            <NavLink
              to="/wishlist"
              onClick={onClose}
              className="flex flex-col items-center gap-1.5 p-2 rounded bg-white/5 hover:bg-white/10 text-white transition-colors"
            >
              <Heart className="w-4 h-4 text-[#C9A45C]" />
              <span className="text-[10px] tracking-wider uppercase font-medium">
                Saved {wishlistCount > 0 ? `(${wishlistCount})` : ''}
              </span>
            </NavLink>

            <NavLink
              to="/cart"
              onClick={onClose}
              className="flex flex-col items-center gap-1.5 p-2 rounded bg-white/5 hover:bg-white/10 text-white transition-colors"
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
