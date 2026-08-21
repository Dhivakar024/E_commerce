import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const PromotionalBanner = () => {
  return (
    <section className="relative w-full py-28 sm:py-36 md:py-40 bg-luxury-black overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1800&auto=format&fit=crop"
          alt="The Season's Edit"
          loading="lazy"
          className="w-full h-full object-cover object-center filter brightness-90"
        />
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/90 via-luxury-black/70 to-luxury-black/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-luxury-black/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
        {/* Label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-5 sm:mb-6">
          <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
          <span className="text-xs uppercase tracking-ultra font-medium text-luxury-champagne">
            THE SEASON'S EDIT
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-4 sm:mb-5 leading-tight tracking-tight">
          Elevate Your Everyday
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-luxury-cream/80 font-light max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
          Discover new silhouettes, refined essentials and timeless classics.
        </p>

        {/* CTA Button */}
        <div>
          <Link
            to="/shop"
            className="btn-shine group inline-flex items-center justify-center gap-3 px-9 py-4 bg-white text-luxury-black hover:bg-luxury-champagne font-medium text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-0.5 shadow-2xl"
          >
            <span>Shop the Collection</span>
            <ArrowRight className="w-4 h-4 text-luxury-black transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
