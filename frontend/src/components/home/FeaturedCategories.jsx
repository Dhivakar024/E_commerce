import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

export const FeaturedCategories = () => {
  return (
    <section className="py-20 bg-[#101820] text-[#F7F3EA] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-end justify-between pb-6 border-b border-white/10 mb-10">
          <div>
            <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
              DISCOVER OUR DEPARTMENTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              Marketplace Categories
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs uppercase tracking-widest text-[#C9A45C] hover:text-white font-semibold transition-colors flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group relative overflow-hidden bg-[#1B2630] border border-white/10 hover:border-[#C9A45C] transition-all duration-300"
            >
              <div className="aspect-[4/5] overflow-hidden bg-neutral-900 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101820] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-serif text-lg text-white font-medium mb-1">
                    {cat.name}
                  </h3>
                  <span className="text-xs text-[#C9A45C] font-semibold flex items-center gap-1">
                    Explore Department <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
