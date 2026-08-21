import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { TRENDING_PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';

export const TrendingNow = () => {
  return (
    <section className="py-20 sm:py-28 bg-luxury-black relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-16 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs uppercase tracking-ultra text-luxury-gold block mb-3 font-medium">
              MOST COVETED
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-2">
              Trending Now
            </h2>
            <p className="text-xs sm:text-sm text-luxury-muted font-light">
              Discover the pieces everyone is talking about.
            </p>
          </div>

          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-luxury-cream/80 hover:text-white mt-4 md:mt-0 transition-colors"
          >
            <span>View All Highlights</span>
            <ArrowUpRight className="w-4 h-4 text-luxury-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 4 Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-8">
          {TRENDING_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
