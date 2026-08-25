import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const PromotionalBanner = () => {
  return (
    <section className="relative w-full py-28 sm:py-36 md:py-40 bg-[#101820] overflow-hidden flex items-center justify-center">
      {/* Background Image with modern multi-category ambiance */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1800&auto=format&fit=crop"
          alt="LAX360 Marketplace"
          loading="lazy"
          className="w-full h-full object-cover object-center filter brightness-50"
        />
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#101820]/95 via-[#101820]/80 to-[#101820]/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101820] via-transparent to-[#101820]/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
        {/* Label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-white/10 backdrop-blur-md border border-white/15 mb-5 sm:mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
          <span className="text-xs uppercase tracking-ultra font-semibold text-[#C9A45C]">
            ONE PLATFORM • INFINITE POSSIBILITIES
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-4 sm:mb-5 leading-tight tracking-tight">
          SHOP EVERYTHING YOU NEED
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-[#F7F3EA]/90 font-light max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
          From your wardrobe to your home, your technology and everyday essentials — discover it all at LAX360 PVT LTD.
        </p>

        {/* CTA Button */}
        <div>
          <Link
            to="/shop"
            className="btn-shine group inline-flex items-center justify-center gap-3 px-9 py-4 bg-[#C9A45C] hover:bg-[#D8B872] text-[#101820] font-semibold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            <span>EXPLORE STORE</span>
            <ArrowRight className="w-4 h-4 text-[#101820] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
