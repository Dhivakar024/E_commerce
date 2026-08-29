import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { useTheme } from '../../context/ThemeContext';

export const TrendingArrivals = () => {
  const { isDark } = useTheme();
  const showcaseProducts = PRODUCTS.slice(0, 4);

  return (
    <section className={`py-16 sm:py-20 relative z-10 transition-colors duration-250 ${
      isDark ? 'bg-[#101820] text-[#F7F3EA]' : 'bg-[#F8F6F0] text-[#101820]'
    }`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between pb-6 border-b border-black/10 dark:border-white/10 mb-8">
          <div>
            <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
              MARKETPLACE SELECTIONS
            </span>
            <h2 className={`font-serif text-3xl sm:text-4xl font-normal ${
              isDark ? 'text-white' : 'text-[#101820]'
            }`}>
              Trending & New Arrivals
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs uppercase tracking-widest text-[#C9A45C] hover:text-[#B08B43] font-semibold transition-colors flex items-center gap-1"
          >
            <span>Explore All Marketplace Products</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {showcaseProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
};
