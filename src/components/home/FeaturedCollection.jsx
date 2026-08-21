import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedCollection = () => {
  return (
    <section className="py-20 sm:py-28 bg-luxury-charcoal/30 border-y border-white/5 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* LEFT: Large Fashion Editorial Image (50% on Desktop) */}
          <div className="lg:col-span-6 order-1">
            <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] overflow-hidden border border-white/10 shadow-2xl bg-neutral-900 group">
              <img
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop"
                alt="Featured Editorial Collection"
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 via-transparent to-transparent" />
              
              {/* Editorial Stamp */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-luxury-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-ultra text-luxury-gold block">
                    EDITORIAL ARCHIVE
                  </span>
                  <span className="font-serif text-sm text-white font-medium">
                    Autumn / Winter Haute Capsule
                  </span>
                </div>
                <span className="text-xs text-luxury-muted">Limited Series</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Text Content (50% on Desktop) */}
          <div className="lg:col-span-6 order-2 flex flex-col justify-center">
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
              <span className="text-xs uppercase tracking-ultra font-medium text-luxury-gold">
                CURATED FOR YOU
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-[1.15] tracking-tight mb-6">
              Timeless Pieces. <br />
              <span className="italic font-light text-luxury-champagne">Modern Expression.</span>
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-luxury-cream/80 font-light leading-relaxed mb-6 max-w-lg">
              Discover carefully selected pieces designed to elevate your everyday wardrobe. Created with unmatched attention to detail, noble textiles, and effortless versatility.
            </p>

            <p className="text-xs sm:text-sm text-luxury-muted font-light leading-relaxed mb-10 max-w-lg">
              Each garment in our featured capsule is hand-draped and structured to bring composure, grace, and an understated presence to every moment.
            </p>

            {/* Features list */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10 mb-10">
              <div>
                <span className="text-xs uppercase tracking-widest text-luxury-champagne font-medium block mb-1">
                  Pure Origins
                </span>
                <span className="text-xs text-luxury-muted">100% Grade-A Italian & French Mills</span>
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-luxury-champagne font-medium block mb-1">
                  Bespoke Craft
                </span>
                <span className="text-xs text-luxury-muted">Limited runs with numbered certificates</span>
              </div>
            </div>

            {/* Button */}
            <div>
              <Link
                to="/collections"
                className="btn-shine group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-luxury-black hover:bg-luxury-champagne font-medium text-xs uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-0.5 shadow-xl"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 text-luxury-black transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
