import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';

export const TrendingArrivals = () => {
  const showcaseProducts = PRODUCTS.slice(0, 4);

  return (
    <section className="py-20 bg-[#101820] text-[#F7F3EA] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-end justify-between pb-6 border-b border-white/10 mb-10">
          <div>
            <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
              MARKETPLACE SELECTIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              Trending & New Arrivals
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs uppercase tracking-widest text-[#C9A45C] hover:text-white font-semibold transition-colors flex items-center gap-1"
          >
            <span>Explore All Marketplace Products</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {showcaseProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
};
