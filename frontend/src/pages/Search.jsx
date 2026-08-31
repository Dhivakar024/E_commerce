import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { useTheme } from '../context/ThemeContext';
import { searchProducts } from '../utils/search';
import { Search, ArrowRight } from 'lucide-react';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const { isDark } = useTheme();
  const query = searchParams.get('q') || searchParams.get('search') || '';

  const searchResults = useMemo(() => {
    return searchProducts(PRODUCTS, query);
  }, [query]);

  return (
    <main
      className={`w-full min-h-screen pt-22 sm:pt-24 pb-12 transition-colors duration-250 ${
        isDark ? 'bg-[#101820] text-[#F7F3EA]' : 'bg-[#F8F6F0] text-[#101820]'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="pb-4 border-b border-black/10 dark:border-white/10 mb-6 sm:mb-7">
          <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
            SEARCH RESULTS
          </span>
          <h1
            className={`font-serif text-3xl sm:text-4xl font-normal ${
              isDark ? 'text-white' : 'text-[#101820]'
            }`}
          >
            {query ? (
              <>
                Results for{' '}
                <span className="italic text-[#C9A45C] font-normal">
                  "{query}"
                </span>
              </>
            ) : (
              'All Marketplace Products'
            )}
          </h1>
          <p
            className={`text-xs font-light mt-1.5 ${
              isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
            }`}
          >
            {searchResults.length}{' '}
            {searchResults.length === 1 ? 'item found' : 'items found'}
          </p>
        </div>

        {/* Results Grid */}
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-6 max-w-md mx-auto animate-fade-in">
            <div
              className={`w-16 h-16 rounded-full border flex items-center justify-center mx-auto ${
                isDark
                  ? 'bg-white/5 border-white/10 text-[#A9B0B5]'
                  : 'bg-black/5 border-black/10 text-[#717D86]'
              }`}
            >
              <Search className="w-7 h-7 stroke-1" />
            </div>

            <div className="space-y-2">
              <h2
                className={`font-serif text-2xl font-normal ${
                  isDark ? 'text-white' : 'text-[#101820]'
                }`}
              >
                No products found for "{query}"
              </h2>
              <p
                className={`text-xs font-light leading-relaxed ${
                  isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
                }`}
              >
                Try searching for a product name, category, brand or keyword (e.g. shirt, sofa, laptop, lipstick, paracetamol).
              </p>
            </div>

            <Link
              to="/shop"
              className="btn-shine inline-flex items-center gap-2 px-8 py-3.5 bg-[#C9A45C] hover:bg-[#D8B872] text-[#101820] text-xs uppercase tracking-widest font-semibold transition-all shadow-lg"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};
