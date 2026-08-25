import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { Search, X, ArrowRight, Sparkles, Clock } from 'lucide-react';

const POPULAR_SEARCHES = [
  'Electronics',
  'Furniture',
  'Medicines',
  'Cosmetics',
  'Linen Shirt',
  'OLED Smart TV',
  'Dining Table',
  'Multivitamin',
  'Hydrating Foundation',
];

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const local = localStorage.getItem('lax360_recent_searches');
      return local ? JSON.parse(local) : ['Smartphone', 'Dining Table', 'Linen Shirt', 'Multivitamin'];
    } catch {
      return ['Smartphone', 'Dining Table', 'Linen Shirt', 'Multivitamin'];
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      {/* Background click dismiss */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-[#101820] text-[#F7F3EA] border border-white/15 p-6 sm:p-8 shadow-2xl space-y-6 z-10">
        {/* Search Input Bar */}
        <form onSubmit={handleSubmit} className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#A9B0B5]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search products, brands, categories (e.g. OLED TV, Linen Shirt, Sofa, Vitamins)..."
            className="w-full bg-white/5 border border-white/15 focus:border-[#C9A45C] text-white pl-12 pr-12 py-3.5 text-sm sm:text-base focus:outline-none placeholder:text-[#A9B0B5]/50 transition-colors"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setResults([]);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A9B0B5] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Live Matching Results */}
        {results.length > 0 ? (
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-widest text-[#C9A45C] font-semibold block">
              Direct Matches ({results.length})
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto">
              {results.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.slug || p.id}`}
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 hover:border-[#C9A45C]/50 hover:bg-white/10 transition-colors group"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-14 h-16 object-cover flex-shrink-0"
                  />
                  <div className="min-w-0 flex-grow">
                    <span className="text-[9px] uppercase tracking-widest text-[#C9A45C] block">
                      {p.category} • {p.brand || 'LAX360'}
                    </span>
                    <h5 className="text-xs font-serif text-white truncate group-hover:text-[#C9A45C] transition-colors">
                      {p.name}
                    </h5>
                    <span className="text-xs text-[#C9A45C] font-semibold">
                      ₹{p.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => handleSelectSearch(query)}
                className="text-xs uppercase tracking-widest text-[#C9A45C] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>View all search results for "{query}"</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : query.trim() ? (
          <div className="py-8 text-center text-xs text-[#A9B0B5]">
            No direct matches found for "{query}". Press Enter to view full catalog search.
          </div>
        ) : (
          /* Suggestions & Recent Searches */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {/* Recent Searches */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#A9B0B5] font-semibold">
                <Clock className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Recent Inquiries</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handleSelectSearch(term)}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C9A45C] text-xs text-[#F7F3EA]/90 transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Marketplace Categories */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#A9B0B5] font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Popular Categories</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handleSelectSearch(term)}
                    className="px-3 py-1.5 bg-white/5 hover:bg-[#C9A45C] hover:text-[#101820] border border-white/10 text-xs text-white transition-colors cursor-pointer"
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
