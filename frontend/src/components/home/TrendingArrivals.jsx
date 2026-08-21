import React from 'react';
import { Link } from 'react-router-dom';
import { TRENDING_PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';

export const TrendingArrivals = () => {
  return (
    <section className="py-20 sm:py-28 bg-luxury-charcoal/40 border-y border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-ultra text-luxury-gold block mb-3 font-medium">
            SPRING / SUMMER PREVIEW
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-4">
            Curated Arrivals
          </h2>
          <p className="text-xs sm:text-sm text-luxury-muted font-light leading-relaxed">
            Meticulously tailored garments crafted from rare natural fibers, designed to transcend seasons with effortless poise.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {TRENDING_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="btn-shine inline-flex items-center gap-3 px-8 py-3.5 bg-transparent border border-white/30 hover:border-white text-white hover:text-white text-xs tracking-widest uppercase transition-all duration-300"
          >
            <span>Explore All 16+ Atelier Styles</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
