import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Shirt, Armchair, Smartphone, Pill, Sparkles } from 'lucide-react';

const MARKETPLACE_CATEGORIES = [
  {
    id: 'fashion',
    slug: 'fashion',
    name: 'Fashion',
    description: 'Discover everyday styles for every occasion.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
    icon: Shirt,
    itemCount: '10+ Items',
  },
  {
    id: 'furniture',
    slug: 'furniture',
    name: 'Furniture',
    description: 'Transform your home with modern furniture.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop',
    icon: Armchair,
    itemCount: '10+ Items',
  },
  {
    id: 'electronics',
    slug: 'electronics',
    name: 'Electronics',
    description: 'Explore smart devices and everyday technology.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    icon: Smartphone,
    itemCount: '10+ Items',
  },
  {
    id: 'medicines',
    slug: 'medicines',
    name: 'Medicines',
    description: 'Everyday healthcare and personal wellness essentials.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop',
    icon: Pill,
    itemCount: '10+ Items',
  },
  {
    id: 'cosmetics',
    slug: 'cosmetics',
    name: 'Cosmetics',
    description: 'Beauty, skincare and personal care essentials.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
    icon: Sparkles,
    itemCount: '10+ Items',
  },
];

export const ShopByCategory = () => {
  return (
    <section id="shop-by-category" className="py-20 sm:py-28 bg-[#101820] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-3 font-semibold">
            SHOP BY CATEGORY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#F7F3EA] mb-3">
            Explore All Categories
          </h2>
          <p className="text-xs sm:text-sm text-[#A9B0B5] font-light leading-relaxed">
            Shop across fashion, furniture, electronics, medicines and cosmetics from LAX360 PVT LTD.
          </p>
        </div>

        {/* 5 Equal Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-6">
          {MARKETPLACE_CATEGORIES.map((cat, index) => {
            const IconComponent = cat.icon;

            return (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="group relative flex flex-col overflow-hidden bg-[#1B2630] border border-white/10 hover:border-[#C9A45C] transition-all duration-500 rounded-none shadow-xl hover:-translate-y-1.5"
              >
                {/* Visual Image Area */}
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101820] via-[#101820]/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />

                  {/* Tag with Index & Icon */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-widest text-[#C9A45C] font-semibold">
                    <IconComponent className="w-3 h-3" />
                    <span>0{index + 1}</span>
                  </div>

                  <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/50 backdrop-blur-md text-[9px] uppercase tracking-wider text-[#A9B0B5]">
                    {cat.itemCount}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col justify-between flex-grow bg-[#1B2630] border-t border-white/5 space-y-3">
                  <div>
                    <h3 className="font-serif text-xl text-white font-medium mb-1.5 group-hover:text-[#C9A45C] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#A9B0B5] leading-relaxed font-light">
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
