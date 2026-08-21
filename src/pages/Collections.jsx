import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CAPSULE_COLLECTIONS = [
  {
    title: 'New Season Preview',
    subtitle: 'Fall / Winter Haute Couture',
    description: 'Sculpted coats, brushed alpaca wools, and tailored trench coats engineered for dramatic presence.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
    link: '/shop/new-arrivals',
    itemCount: '12 Silhouettes',
  },
  {
    title: 'The Linen & Silk Edit',
    subtitle: 'Effortless Warm-Weather Drapery',
    description: 'Fluid mulberry silk-satin slip dresses and 100% breathable organic European flax shirts.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
    link: '/shop/women',
    itemCount: '18 Silhouettes',
  },
  {
    title: 'Sartorial Men’s Tailoring',
    subtitle: 'Modern Architectural Proportion',
    description: 'Deconstructed Italian wool blazers, relaxed pleated trousers, and artisan cashmere knitwear.',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1200&auto=format&fit=crop',
    link: '/shop/men',
    itemCount: '14 Silhouettes',
  },
  {
    title: 'Artisanal Leather & Solid Jewelry',
    subtitle: 'Hand-Finished Objects of Desire',
    description: 'Full-grain Tuscan calfskin bags, hand-lasted Chelsea boots, and 18k gold vermeil signet rings.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop',
    link: '/shop/accessories',
    itemCount: '10 Silhouettes',
  },
];

export const Collections = () => {
  return (
    <main className="w-full bg-luxury-black text-luxury-cream min-h-screen pt-28 sm:pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-ultra text-luxury-gold block font-medium">
            EDITORIAL RUNWAY
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal">
            Curated Atelier Collections
          </h1>
          <p className="text-xs sm:text-sm text-luxury-muted font-light leading-relaxed">
            Explore dedicated thematic chapters from our Paris atelier, featuring limited-run haute couture, noble fibers, and permanent wardrobe anchors.
          </p>
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {CAPSULE_COLLECTIONS.map((col, idx) => (
            <Link
              key={idx}
              to={col.link}
              className="group relative overflow-hidden bg-luxury-charcoal/30 border border-white/10 block shadow-2xl transition-all hover:border-white/25"
            >
              {/* Image with zoom */}
              <div className="relative h-80 sm:h-96 overflow-hidden">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] uppercase tracking-wider bg-black/60 backdrop-blur-md text-luxury-champagne px-3 py-1 border border-white/15">
                    {col.itemCount}
                  </span>
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-6 sm:p-8 space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-luxury-gold block font-medium">
                  {col.subtitle}
                </span>
                <h3 className="font-serif text-2xl text-white font-normal group-hover:text-luxury-champagne transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs text-luxury-cream/80 font-light leading-relaxed">
                  {col.description}
                </p>

                <div className="pt-3 flex items-center gap-2 text-xs uppercase tracking-widest text-white font-medium group-hover:text-luxury-champagne transition-colors">
                  <span>Explore Capsule</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};
