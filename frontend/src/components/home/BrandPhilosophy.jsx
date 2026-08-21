import React from 'react';
import { Compass, ShieldCheck, Feather } from 'lucide-react';

export const BrandPhilosophy = () => {
  return (
    <section className="py-24 sm:py-32 bg-luxury-black relative z-10 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-luxury-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Editorial Narrative */}
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-ultra text-luxury-gold block mb-4 font-medium">
              THE ATELIER ETHOS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-tight mb-6">
              Slow Fashion. <br />
              <span className="italic font-light text-luxury-champagne">Eternal Presence.</span>
            </h2>
            <p className="text-sm sm:text-base text-luxury-cream/80 font-light leading-relaxed mb-6">
              Every LAX360 PVT LTD creation begins with an obsession with purity of silhouette and materiality. We collaborate exclusively with certified European textile mills that respect both nature and generational artisan traditions.
            </p>
            <p className="text-xs sm:text-sm text-luxury-muted font-light leading-relaxed mb-10">
              Designed in Paris and tailored in limited quantities, our collections reject the fleeting cycles of fast trends in pursuit of timeless, enduring elegance.
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div className="flex flex-col gap-2">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-luxury-gold">
                  <Feather className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-base text-white">Pure Fibers</h4>
                <p className="text-xs text-luxury-muted leading-relaxed">
                  Organic mulberry silk, GOTS organic cotton, and Mongolian cashmere.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-luxury-gold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-base text-white">Bespoke Fit</h4>
                <p className="text-xs text-luxury-muted leading-relaxed">
                  Engineered drape with hand-finished seams and internal structural canvas.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-luxury-gold">
                  <Compass className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-base text-white">Zero Waste</h4>
                <p className="text-xs text-luxury-muted leading-relaxed">
                  Small-batch production ensuring ethical supply chains and minimal impact.
                </p>
              </div>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=900&auto=format&fit=crop"
                alt="LAX360 PVT LTD Workshop"
                loading="lazy"
                className="w-full h-full object-cover filter grayscale contrast-105 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-luxury-black/80 backdrop-blur-md border border-white/10">
                <p className="font-serif text-sm italic text-luxury-champagne">
                  "Simplicity is the keynote of all true elegance."
                </p>
                <span className="text-[10px] uppercase tracking-widest text-luxury-muted block mt-1">
                  LAX360 PVT LTD Workshop — No. 42 Rue de Sèvres
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
