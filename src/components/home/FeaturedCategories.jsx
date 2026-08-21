import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const COLLECTIONS = [
  {
    id: 'haute-couture',
    title: 'The Evening Atelier',
    subtitle: 'Sculptural silhouettes in double-faced satin and silk organza.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=900&auto=format&fit=crop',
    itemCount: '18 Designs',
    link: '/collections',
  },
  {
    id: 'tailoring',
    title: 'Modern Tailoring',
    subtitle: 'Sharp shoulders and fluid drape crafted from Italian wool.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=900&auto=format&fit=crop',
    itemCount: '24 Designs',
    link: '/collections',
  },
  {
    id: 'knitwear',
    title: 'Cashmere & Silk',
    subtitle: 'Ultra-fine textures designed for effortless luxury and warmth.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=900&auto=format&fit=crop',
    itemCount: '15 Designs',
    link: '/collections',
  },
];

export const FeaturedCategories = () => {
  return (
    <section id="featured-collections" className="py-24 sm:py-32 bg-luxury-black relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <span className="text-xs uppercase tracking-ultra text-luxury-gold block mb-3 font-medium">
              CURATED ARCHIVE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white">
              Featured Collections
            </h2>
          </div>
          <Link
            to="/collections"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-luxury-cream/80 hover:text-white mt-4 md:mt-0 transition-colors"
          >
            <span>View All Series</span>
            <ArrowUpRight className="w-4 h-4 text-luxury-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COLLECTIONS.map((col, index) => (
            <Link
              key={col.id}
              to={col.link}
              className="group relative flex flex-col overflow-hidden bg-luxury-charcoal/60 border border-white/10 hover:border-luxury-gold/40 transition-all duration-500"
            >
              {/* Image Container with Hover Scale */}
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
                <img
                  src={col.image}
                  alt={col.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                
                {/* Number Badge */}
                <div className="absolute top-4 left-4 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-widest text-luxury-champagne">
                  0{index + 1}
                </div>

                <div className="absolute top-4 right-4 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-wider text-luxury-muted">
                  {col.itemCount}
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-medium mb-2 group-hover:text-luxury-champagne transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-xs text-luxury-muted leading-relaxed line-clamp-2">
                    {col.subtitle}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs tracking-widest uppercase text-luxury-champagne">
                  <span>Explore Series</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-luxury-gold transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
