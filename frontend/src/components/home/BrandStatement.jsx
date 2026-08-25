import React from 'react';
import { Layers, ShieldCheck, Lock, Truck, RotateCcw } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const VALUE_PROPS = [
  {
    icon: Layers,
    title: 'Wide Product Selection',
    description: 'Explore multiple categories from one marketplace.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Products',
    description: 'Discover carefully selected products across categories.',
  },
  {
    icon: Lock,
    title: 'Secure Shopping',
    description: 'Shop with confidence through a simple and secure experience.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Convenient delivery for your everyday purchases.',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: 'Simple and customer-friendly return experience.',
  },
];

export const BrandStatement = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-28 bg-[#1B2630]/60 border-y border-white/5 relative z-10 overflow-hidden"
    >
      {/* Floating decorative elements */}
      <div className="absolute -top-10 left-10 w-48 h-48 bg-[#C9A45C]/5 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute -bottom-10 right-10 w-48 h-48 bg-[#C9A45C]/5 rounded-full blur-3xl pointer-events-none animate-float-reverse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div
          className="text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-3 font-semibold">
            THE LAX360 ADVANTAGE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-4">
            WHY SHOP WITH LAX360?
          </h2>
          <p className="text-xs sm:text-sm text-[#A9B0B5] font-light leading-relaxed">
            A modern, customer-first shopping destination engineered for convenience, quality, and complete peace of mind.
          </p>
        </div>

        {/* 5 Marketplace Benefit Cards with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {VALUE_PROPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-[#101820] border border-white/10 hover:border-[#C9A45C] transition-all duration-300 flex flex-col justify-between space-y-4 group shadow-xl hover:shadow-2xl hover:shadow-black/60 hover:-translate-y-1.5 cursor-default"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
                  transition: 'opacity 0.6s ease-out, transform 0.6s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
                  transitionDelay: `${idx * 90}ms`,
                }}
              >
                <div className="w-12 h-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[#C9A45C] group-hover:bg-[#C9A45C] group-hover:text-[#101820] group-hover:scale-105 transition-all">
                  <Icon className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="font-serif text-base text-white font-medium mb-1.5 group-hover:text-[#C9A45C] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#A9B0B5] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center text-[10px] uppercase tracking-widest text-[#C9A45C]/70 group-hover:text-[#C9A45C] font-semibold">
                  <span>Guaranteed</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
