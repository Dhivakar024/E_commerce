import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Shirt, Armchair, Smartphone, Pill, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

const CATEGORY_ICONS = {
  fashion: Shirt,
  furniture: Armchair,
  electronics: Smartphone,
  medicines: Pill,
  cosmetics: Sparkles,
};

export const ShopByCategory = () => {
  return (
    <section id="shop-by-category" className="py-20 sm:py-28 bg-[#101820] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-3 font-semibold">
            EXPLORE MARKETPLACE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#F7F3EA] mb-3">
            Shop by Category
          </h2>
          <p className="text-xs sm:text-sm text-[#A9B0B5] font-light leading-relaxed">
            Curated collections spanning premium fashion, architectural furniture, cutting-edge electronics, certified health essentials, and luxury cosmetics.
          </p>
        </div>

        {/* 5 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-6">
          {CATEGORIES.map((cat, index) => {
            const IconComponent = CATEGORY_ICONS[cat.slug] || Sparkles;

            return (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="group relative flex flex-col overflow-hidden bg-[#1B2630] border border-white/10 hover:border-[#C9A45C] transition-all duration-500 rounded-none shadow-xl hover:-translate-y-1.5"
              >
                {/* Image Container with hover zoom */}
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                  />

                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101820] via-[#101820]/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />

                  {/* Category Index & Icon */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-widest text-[#C9A45C] font-semibold">
                    <IconComponent className="w-3 h-3" />
                    <span>0{index + 1}</span>
                  </div>

                  {/* Item count tag */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/50 backdrop-blur-md text-[9px] uppercase tracking-wider text-[#A9B0B5]">
                    {cat.itemCount}
                  </div>
                </div>

                {/* Card Meta Content */}
                <div className="p-5 flex flex-col justify-between flex-grow bg-[#1B2630] border-t border-white/5 space-y-3">
                  <div>
                    <h3 className="font-serif text-xl text-white font-medium mb-1.5 group-hover:text-[#C9A45C] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#A9B0B5] leading-relaxed line-clamp-2 font-light">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs tracking-widest uppercase text-[#C9A45C] font-semibold">
                    <span>Explore</span>
                    <ArrowUpRight className="w-4 h-4 text-[#C9A45C] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
