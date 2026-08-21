import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ALL_PRODUCTS } from '../../data/products';
import { Search, X, ArrowRight, Sparkles, Clock } from 'lucide-react';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const local = localStorage.getItem('elan_recent_searches');
      return local ? JSON.parse(local) : ['Cashmere', 'Silk Gown', 'Linen Shirt', 'Overcoat'];
    } catch {
      return ['Cashmere', 'Silk Gown', 'Linen Shirt', 'Overcoat'];
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
    const matches = ALL_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(clean) ||
        p.category.toLowerCase().includes(clean) ||
        p.description.toLowerCase().includes(clean) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(clean)))
    );
    setResults(matches.slice(0, 6));
  };

  const handleSelectSearch = (term) => {
    const updated = [term, ...recentSearches.filter((s) => s.toLowerCase() !== term.toLowerCase())].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('elan_recent_searches', JSON.stringify(updated));
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

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-luxury-black border border-white/15 p-6 sm:p-8 shadow-2xl space-y-6 z-10">
        {/* Search Input Bar */}
        <form onSubmit={handleSubmit} className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-luxury-muted" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search silhouettes, noble fabrics, collections..."
            className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold/60 text-white pl-12 pr-12 py-3.5 text-sm sm:text-base focus:outline-none placeholder:text-luxury-muted/40 transition-colors"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setResults([]);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-luxury-muted hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-luxury-muted hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Results or Suggestions */}
        {results.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
              <span className="uppercase tracking-widest text-luxury-muted text-[10px] font-medium">
                Atelier Catalog ({results.length} results)
              </span>
              <button
                type="button"
                onClick={handleSubmit}
                className="text-luxury-champagne hover:text-white flex items-center gap-1 text-[11px] uppercase tracking-wider"
              >
                <span>View All Results</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-1">
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.slug || product.id}`}
                  onClick={onClose}
                  className="flex items-center gap-3.5 p-2.5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-16 object-cover bg-neutral-900 border border-white/10 flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] uppercase tracking-widest text-luxury-muted block">
                      {product.category}
                    </span>
                    <h4 className="text-xs font-medium text-white group-hover:text-luxury-champagne transition-colors truncate">
                      {product.name}
                    </h4>
                    <span className="font-serif text-xs text-luxury-champagne block mt-0.5">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : query.trim() ? (
          <div className="py-12 text-center space-y-3">
            <p className="text-xs text-luxury-muted">
              No matching atelier pieces found for <span className="text-white font-medium">"{query}"</span>.
            </p>
            <p className="text-[11px] text-luxury-subtle">
              Try searching by material (e.g. Silk, Cashmere, Linen) or category (e.g. Dresses, Outerwear).
            </p>
          </div>
        ) : (
          /* Recent & Popular Tags */
          <div className="space-y-6 text-xs">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center gap-1.5 text-luxury-muted text-[10px] uppercase tracking-widest font-medium">
                  <Clock className="w-3 h-3" />
                  <span>Recent Curations</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectSearch(term)}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-luxury-cream text-xs transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Curatorial Keywords */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5 text-luxury-muted text-[10px] uppercase tracking-widest font-medium">
                <Sparkles className="w-3 h-3 text-luxury-gold" />
                <span>Signature Editorial Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Mulberry Silk', 'Mongolian Cashmere', 'European Flax Linen', 'Tailored Trench', 'Leather Tote'].map(
                  (tag, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectSearch(tag)}
                      className="px-3 py-1.5 bg-luxury-gold/10 hover:bg-luxury-gold/20 border border-luxury-gold/30 text-luxury-champagne text-xs transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer Hint */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-luxury-muted">
          <span>Press <kbd className="px-1.5 py-0.5 bg-white/10 border border-white/15 text-white">ESC</kbd> to exit</span>
          <span>Complimentary insured shipping on all orders</span>
        </div>
      </div>
    </div>
  );
};
