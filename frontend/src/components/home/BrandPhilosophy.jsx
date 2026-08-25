import React from 'react';
import { Layers, ShieldCheck, HeartHandshake } from 'lucide-react';

export const BrandPhilosophy = () => {
  const pillars = [
    {
      icon: Layers,
      title: 'Unified Multi-Category Catalog',
      text: 'Access fashion, furniture, electronics, certified medicines, and cosmetics seamlessly through a single, intuitive interface.',
    },
    {
      icon: ShieldCheck,
      title: 'Guaranteed Authenticity',
      text: 'Every item on our platform is verified through stringent quality checkpoints and source authenticity audits.',
    },
    {
      icon: HeartHandshake,
      title: 'Customer-Centric Fulfillment',
      text: 'Fast, insured doorstep delivery with a 14-day hassle-free return and exchange policy across India.',
    },
  ];

  return (
    <section className="py-20 bg-[#101820] text-[#F7F3EA] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block font-semibold">
            THE LAX360 PROMISE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
            A Better Way to Shop Every Day
          </h2>
          <p className="text-xs sm:text-sm text-[#A9B0B5] font-light leading-relaxed">
            Delivering quality, variety, and uncompromising reliability straight to your doorstep.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 bg-[#1B2630] border border-white/10 space-y-4 hover:border-[#C9A45C] transition-all"
              >
                <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-[#C9A45C]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-white font-medium">{pillar.title}</h3>
                <p className="text-xs text-[#A9B0B5] font-light leading-relaxed">
                  {pillar.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
