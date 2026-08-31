import React from 'react';
import { Layers, ShieldCheck, Lock, Truck, RotateCcw } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useTheme } from '../../context/ThemeContext';

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
  const { isDark } = useTheme();

  return (
    <section
      ref={sectionRef}
      className={`py-24 sm:py-28 border-y relative z-10 overflow-hidden transition-colors duration-250 ${
        isDark
          ? 'bg-[#151F28] border-white/[0.08]'
          : 'bg-[#EDE9DF] border-black/[0.08]'
      }`}
    >
      {/* Floating decorative elements */}
      <div className="absolute -top-10 left-10 w-48 h-48 bg-[#C9A45C]/5 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute -bottom-10 right-10 w-48 h-48 bg-[#C9A45C]/5 rounded-full blur-3xl pointer-events-none animate-float-reverse" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
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
          <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-normal mb-4 ${
            isDark ? 'text-white' : 'text-[#101820]'
          }`}>
            WHY SHOP WITH LAX360?
          </h2>
          <p className={`text-xs sm:text-sm font-light leading-relaxed ${
            isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
          }`}>
            A modern, customer-first shopping destination engineered for convenience, quality, and complete peace of mind.
          </p>
        </div>

        {/* 5 Marketplace Benefit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {VALUE_PROPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-6 border transition-all duration-300 flex flex-col justify-between space-y-4 group shadow-xl hover:shadow-2xl hover:-translate-y-1.5 cursor-default ${
                  isDark
                    ? 'bg-[#1B2630] border-white/[0.08] hover:border-[#C9A45C] hover:shadow-black/60 text-white'
                    : 'bg-white border-black/[0.08] hover:border-[#B08B43] hover:shadow-black/10 text-[#101820]'
                }`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
                  transition: 'opacity 0.6s ease-out, transform 0.6s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
                  transitionDelay: `${idx * 90}ms`,
                }}
              >
                <div className={`w-12 h-12 rounded-none border flex items-center justify-center transition-all ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-[#C9A45C] group-hover:bg-[#C9A45C] group-hover:text-[#101820] group-hover:scale-105'
                    : 'bg-black/5 border-black/10 text-[#B08B43] group-hover:bg-[#B08B43] group-hover:text-white group-hover:scale-105'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div>
                  <h3 className={`font-serif text-base font-medium mb-1.5 transition-colors ${
                    isDark ? 'text-white group-hover:text-[#C9A45C]' : 'text-[#101820] group-hover:text-[#B08B43]'
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`text-xs font-light leading-relaxed ${
                    isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
                  }`}>
                    {item.description}
                  </p>
                </div>

                <div className={`pt-2 border-t flex items-center text-[10px] uppercase tracking-widest font-semibold ${
                  isDark ? 'border-white/5 text-[#C9A45C]/80' : 'border-black/5 text-[#B08B43]'
                }`}>
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
