import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { NEW_ARRIVALS_PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';

export const NewArrivals = () => {
  return (
    <section className="py-20 sm:py-28 bg-luxury-black relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header with View All */}
        <div className="flex items-end justify-between mb-12 sm:mb-14 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs uppercase tracking-ultra text-luxury-gold block mb-2 font-medium">
              JUST RELEASED
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white">
              New Arrivals
            </h2>
          </div>

          <Link
            to="/shop/new-arrivals"
            className="group inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-luxury-cream/80 hover:text-white transition-colors"
          >
            <span>View All</span>
            <ArrowUpRight className="w-4 h-4 text-luxury-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Product Carousel / Responsive Layout */}
        <div className="flex lg:grid lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 overflow-x-auto pb-4 lg:pb-0 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {NEW_ARRIVALS_PRODUCTS.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="w-[78vw] sm:w-[42vw] md:w-[32vw] lg:w-auto flex-shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
