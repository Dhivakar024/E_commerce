import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Leaf } from 'lucide-react';
import { BrandPhilosophy } from '../components/home/BrandPhilosophy';

export const About = () => {
  return (
    <main className="w-full bg-luxury-black text-luxury-cream min-h-screen pt-28 sm:pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-20">
        {/* Story Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-ultra text-luxury-gold block font-medium">
            OUR HERITAGE & VISION
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal leading-tight">
            The Pursuit of Pure Architectural Elegance
          </h1>
          <p className="text-xs sm:text-sm text-luxury-muted font-light leading-relaxed max-w-xl mx-auto">
            Founded with an uncompromising devotion to noble fibers, tailored proportion, and European artisan heritage.
          </p>
        </div>

        {/* Cinematic Imagery Banner */}
        <div className="relative h-[380px] sm:h-[480px] overflow-hidden border border-white/10 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80"
            alt="Atelier Craftsmanship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 max-w-lg space-y-2">
            <span className="text-[10px] uppercase tracking-ultra text-luxury-champagne block font-medium">
              ESTABLISHED MMXXVI
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              Every Stitch Tells a Tale of Mastery
            </h2>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          <div className="p-8 bg-luxury-charcoal/30 border border-white/10 space-y-4 shadow-xl">
            <div className="w-10 h-10 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-white font-normal">Master Craftsmanship</h3>
            <p className="text-xs text-luxury-cream/80 font-light leading-relaxed">
              Every silhouette is cut and draped by generational artisans in historic tailoring workshops in Florence and Biella, honoring centuries of sartorial tradition.
            </p>
          </div>

          <div className="p-8 bg-luxury-charcoal/30 border border-white/10 space-y-4 shadow-xl">
            <div className="w-10 h-10 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-white font-normal">Noble & Traceable Fibers</h3>
            <p className="text-xs text-luxury-cream/80 font-light leading-relaxed">
              We exclusively harvest organic European flax, cruelty-free mulberry silk, and Grade-A Mongolian cashmere with full ecological provenance and zero synthetic fillers.
            </p>
          </div>

          <div className="p-8 bg-luxury-charcoal/30 border border-white/10 space-y-4 shadow-xl">
            <div className="w-10 h-10 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-white font-normal">Circular Longevity</h3>
            <p className="text-xs text-luxury-cream/80 font-light leading-relaxed">
              We reject transient micro-trends. Our garments are intentionally designed to age with graceful patina and remain relevant across seasons and decades.
            </p>
          </div>
        </div>

        {/* Existing Brand Philosophy section */}
        <div className="pt-6 border-t border-white/10">
          <BrandPhilosophy />
        </div>

        {/* CTA to Shop */}
        <div className="text-center py-12 space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
            Experience the Atelier Wardrobe
          </h2>
          <Link
            to="/shop"
            className="btn-shine inline-flex items-center gap-2 px-10 py-4 bg-white text-luxury-black hover:bg-luxury-champagne uppercase tracking-widest text-xs font-medium transition-all shadow-2xl"
          >
            <span>Explore the Seasonal Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
};
