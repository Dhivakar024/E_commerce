import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';

export const NewArrivals = () => {
  // Select new arrivals across multiple categories
  const newMultiProducts = [
    PRODUCTS.find((p) => p.slug === 'visionary-pulse-smartphone-pro-5g') || PRODUCTS[21],
    PRODUCTS.find((p) => p.slug === 'nordic-solid-oak-minimalist-coffee-table') || PRODUCTS[11],
    PRODUCTS.find((p) => p.slug === 'volumizing-peptide-lash-brow-fortifying-serum') || PRODUCTS[49],
    PRODUCTS.find((p) => p.slug === 'complete-emergency-family-first-aid-trauma-kit') || PRODUCTS[31],
    PRODUCTS.find((p) => p.slug === 'italian-silk-satin-slip-dress') || PRODUCTS[2],
  ].filter(Boolean);

  return (
    <section className="py-20 sm:py-28 bg-[#101820] relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header with View All */}
        <div className="flex items-end justify-between mb-12 sm:mb-14 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
              NEW RELEASES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white">
              New Arrivals
            </h2>
            <p className="text-xs sm:text-sm text-[#A9B0B5] font-light mt-1">
              Latest additions across electronics, furniture, beauty, wellness, and fashion.
            </p>
          </div>

          <Link
            to="/shop"
            className="group inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#C9A45C] hover:text-white font-semibold transition-colors"
          >
            <span>View All New Additions</span>
            <ArrowUpRight className="w-4 h-4 text-[#C9A45C] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Multi-Category Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-8">
          {newMultiProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
