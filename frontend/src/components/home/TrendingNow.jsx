import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';

export const TrendingNow = () => {
  // Select balanced multi-category trending items
  const trendingProducts = [
    PRODUCTS.find((p) => p.slug === 'aura-wireless-noise-cancelling-headphones') || PRODUCTS[20],
    PRODUCTS.find((p) => p.slug === 'sculptural-boucle-armchair-in-ivory') || PRODUCTS[12],
    PRODUCTS.find((p) => p.slug === 'classic-pure-linen-shirt') || PRODUCTS[0],
    PRODUCTS.find((p) => p.slug === 'hyaluronic-botanical-deep-hydration-serum') || PRODUCTS[40],
    PRODUCTS.find((p) => p.slug === 'advanced-daily-multivitamin-immunity-complex') || PRODUCTS[30],
    PRODUCTS.find((p) => p.slug === 'lumina-pro-65-inch-oled-4k-smart-tv') || PRODUCTS[22],
    PRODUCTS.find((p) => p.slug === 'solid-teak-dining-table-expandable') || PRODUCTS[10],
    PRODUCTS.find((p) => p.slug === 'signature-tailored-wool-blazer') || PRODUCTS[1],
  ].filter(Boolean);

  return (
    <section className="py-20 sm:py-28 bg-[#101820] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-16 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-3 font-semibold">
              MARKETPLACE HIGHLIGHTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-2">
              Trending Now
            </h2>
            <p className="text-xs sm:text-sm text-[#A9B0B5] font-light">
              Top-rated selections across electronics, home furniture, fashion, health and cosmetics.
            </p>
          </div>

          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C9A45C] hover:text-white mt-4 md:mt-0 font-semibold transition-colors"
          >
            <span>View All Trending Items</span>
            <ArrowUpRight className="w-4 h-4 text-[#C9A45C] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 4/8 Mixed Multi-Category Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-8">
          {trendingProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
