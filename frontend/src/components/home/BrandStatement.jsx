import React from 'react';
import { Layers, ShieldCheck, Lock, Truck, RotateCcw } from 'lucide-react';

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
  return (
    <section className="py-24 sm:py-28 bg-[#1B2630]/60 border-y border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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

        {/* 5 Marketplace Benefit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {VALUE_PROPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-[#101820] border border-white/10 hover:border-[#C9A45C]/60 transition-all duration-300 flex flex-col justify-between space-y-4 group shadow-xl hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[#C9A45C] group-hover:bg-[#C9A45C] group-hover:text-[#101820] transition-colors">
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
