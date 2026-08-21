import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ALL_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { Search, ArrowRight } from 'lucide-react';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const searchResults = useMemo(() => {
    if (!query.trim()) return ALL_PRODUCTS;
    const clean = query.toLowerCase().trim();
    return ALL_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(clean) ||
        p.category.toLowerCase().includes(clean) ||
        p.description.toLowerCase().includes(clean) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(clean)))
    );
  }, [query]);

  return (
    <main className="w-full bg-luxury-black text-luxury-cream min-h-screen pt-28 sm:pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="pb-8 border-b border-white/10 mb-10">
          <span className="text-xs uppercase tracking-ultra text-luxury-gold block mb-2 font-medium">
            SEARCH RESULTS
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal">
            {query ? (
              <>
                Results for <span className="italic text-luxury-champagne font-normal">"{query}"</span>
              </>
            ) : (
              'All Atelier Creations'
            )}
          </h1>
          <p className="text-xs text-luxury-muted font-light mt-1">
            {searchResults.length} {searchResults.length === 1 ? 'piece found' : 'pieces found'}
          </p>
        </div>

        {/* Results Grid */}
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-6 max-w-md mx-auto animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-luxury-muted">
              <Search className="w-7 h-7 stroke-1" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl text-white font-normal">
                No Matching Pieces Found
              </h2>
              <p className="text-xs text-luxury-muted font-light leading-relaxed">
                We couldn't find any results matching "{query}". Check for spelling errors or try searching for broader keywords like Linen, Coat, or Silk.
              </p>
            </div>

            <Link
              to="/shop"
              className="btn-shine inline-flex items-center gap-2 px-8 py-3.5 bg-white text-luxury-black hover:bg-luxury-champagne text-xs uppercase tracking-widest font-medium transition-all shadow-xl"
            >
              <span>Browse Full Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};
