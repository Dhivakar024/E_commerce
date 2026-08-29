import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { useTheme } from '../../context/ThemeContext';
import { Search, X, ArrowRight, Sparkles, Clock } from 'lucide-react';

const POPULAR_SEARCHES = [
  'laptop',
  'sofa',
  'lipstick',
  'shirt',
  'vitamin',
  'Electronics',
  'Furniture',
  'Medicines',
  'Cosmetics',
];

export const SearchModal = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const local = localStorage.getItem('lax360_recent_searches');
      return local ? JSON.parse(local) : ['laptop', 'sofa', 'lipstick', 'shirt', 'vitamin'];
    } catch {
      return ['laptop', 'sofa', 'lipstick', 'shirt', 'vitamin'];
    }
  });

  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleQueryChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    if (!val.trim()) {
      setResults([]);
      return;
    }

    const clean = val.toLowerCase().trim();
    const matches = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(clean) ||
        (p.brand && p.brand.toLowerCase().includes(clean)) ||
        p.category.toLowerCase().includes(clean) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(clean)) ||
        (p.description && p.description.toLowerCase().includes(clean)) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(clean)))
    );
    setResults(matches.slice(0, 6));
  };

  const handleSelectSearch = (term) => {
    const updated = [term, ...recentSearches.filter((s) => s.toLowerCase() !== term.toLowerCase())].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('lax360_recent_searches', JSON.stringify(updated));
    onClose();
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      handleSelectSearch(query.trim());
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      {/* Background click dismiss */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Main Container */}
      <div className={`relative w-full max-w-3xl border shadow-2xl p-6 sm:p-8 z-10 animate-fade-in-down rounded-none ${
        isDark
          ? 'bg-[#101820] border-white/15 text-white'
          : 'bg-[#F8F6F0] border-black/15 text-[#101820]'
      }`}>
        {/* Search Input Header */}
        <form onSubmit={handleSubmit} className="relative mb-6">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A45C]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search fashion, furniture, electronics, medicines, cosmetics..."
            className={`w-full py-4 pl-12 pr-12 text-sm sm:text-base border transition-all focus:outline-none focus:border-[#C9A45C] ${
              isDark
                ? 'bg-white/5 border-white/15 text-white placeholder:text-[#A9B0B5]/50'
                : 'bg-white border-black/15 text-[#101820] placeholder:text-[#717D86]/50'
            }`}
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setResults([]);
                inputRef.current?.focus();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A9B0B5] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${
                isDark ? 'text-[#A9B0B5] hover:text-white' : 'text-[#717D86] hover:text-[#101820]'
              }`}
            >
              <span className="text-[10px] tracking-wider uppercase border border-current px-1.5 py-0.5">
                ESC
              </span>
            </button>
          )}
        </form>

        {/* Live Search Results */}
        {query ? (
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-black/10 dark:border-white/10 text-xs">
              <span className={isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}>
                Found <strong className={isDark ? 'text-white' : 'text-[#101820]'}>{results.length}</strong> matching products
              </span>
              {results.length > 0 && (
                <button
                  type="button"
                  onClick={() => handleSelectSearch(query)}
                  className="text-[#C9A45C] hover:underline flex items-center gap-1 font-semibold uppercase tracking-wider text-[11px]"
                >
                  <span>View All Results</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-1">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug || product.id}`}
                    onClick={onClose}
                    className={`flex items-center gap-3.5 p-3 border transition-colors group ${
                      isDark
                        ? 'bg-white/5 border-white/10 hover:border-[#C9A45C] hover:bg-white/10'
                        : 'bg-white border-black/10 hover:border-[#B08B43] hover:bg-black/5'
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-14 object-cover flex-shrink-0 bg-neutral-900"
                    />
                    <div className="overflow-hidden flex-grow">
                      <span className="text-[9px] uppercase tracking-widest text-[#C9A45C] font-semibold block truncate">
                        {product.category}
                      </span>
                      <h4 className={`text-xs font-serif truncate transition-colors ${
                        isDark ? 'text-white group-hover:text-[#C9A45C]' : 'text-[#101820] group-hover:text-[#B08B43]'
                      }`}>
                        {product.name}
                      </h4>
                      <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-[#101820]'}`}>
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className={`py-12 text-center text-xs ${isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}`}>
                No products match "{query}". Try another search term.
              </div>
            )}
          </div>
        ) : (
          /* Popular & Recent Suggestions */
          <div className="space-y-6">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <div className={`flex items-center gap-2 text-[11px] uppercase tracking-wider mb-3 font-semibold ${
                  isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
                }`}>
                  <Clock className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>Recent Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => handleSelectSearch(term)}
                      className={`px-3 py-1.5 border text-xs transition-colors cursor-pointer ${
                        isDark
                          ? 'bg-white/5 border-white/10 hover:border-[#C9A45C] text-[#F7F3EA]/80 hover:text-white'
                          : 'bg-white border-black/10 hover:border-[#B08B43] text-[#101820]/80 hover:text-[#101820]'
                      }`}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            <div>
              <div className={`flex items-center gap-2 text-[11px] uppercase tracking-wider mb-3 font-semibold ${
                isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
              }`}>
                <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Trending Marketplace Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handleSelectSearch(term)}
                    className={`px-3 py-1.5 border text-xs transition-colors cursor-pointer ${
                      isDark
                        ? 'bg-white/5 border-white/10 hover:border-[#C9A45C] text-[#F7F3EA]/80 hover:text-white'
                        : 'bg-white border-black/10 hover:border-[#B08B43] text-[#101820]/80 hover:text-[#101820]'
                    }`}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
