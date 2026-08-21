import React from 'react';

export const BrandStatement = () => {
  return (
    <section className="py-24 sm:py-32 md:py-36 bg-luxury-charcoal/50 border-y border-white/5 relative z-10 flex items-center justify-center text-center">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Small Label */}
        <span className="text-xs uppercase tracking-ultra text-luxury-gold block mb-6 font-medium">
          OUR PHILOSOPHY
        </span>

        {/* Large Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-6 sm:mb-8 leading-tight tracking-tight">
          Designed With Intention.
        </h2>

        {/* Brand Statement Paragraph */}
        <p className="text-base sm:text-lg md:text-xl text-luxury-cream/85 font-light max-w-2xl mx-auto leading-relaxed italic">
          "We believe great style is not about following every trend. It's about finding pieces that feel distinctly yours."
        </p>

        {/* Signature monogram */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <div className="w-8 h-[1px] bg-luxury-gold/40" />
          <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-luxury-champagne">
            LAX360 PVT LTD
          </span>
          <div className="w-8 h-[1px] bg-luxury-gold/40" />
        </div>
      </div>
    </section>
  );
};
