import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Package, Layers, Clock, ShieldCheck } from 'lucide-react';

const STATS = [
  {
    icon: Package,
    target: 50,
    suffix: '+',
    label: 'Demo Products',
    subtext: 'Carefully curated across all 5 departments',
  },
  {
    icon: Layers,
    target: 5,
    suffix: '',
    label: 'Core Categories',
    subtext: 'Fashion, Furniture, Tech, Health & Beauty',
  },
  {
    icon: Clock,
    target: 24,
    suffix: '/7',
    label: 'Online Access',
    subtext: 'Instant ordering & live shipment tracking',
  },
  {
    icon: ShieldCheck,
    target: 100,
    suffix: '%',
    label: 'Verified Quality',
    subtext: 'Authentic products & secure transactions',
  },
];

// Single Animated Counter Item
const StatItem = ({ item, isVisible, index }) => {
  const [count, setCount] = useState(0);
  const Icon = item.icon;

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = item.target;
    const duration = 1400; // ms
    const steps = 30;
    const increment = end / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isVisible, item.target]);

  return (
    <div
      className="p-6 bg-[#101820] border border-white/10 space-y-3 relative overflow-hidden group hover:border-[#C9A45C]/60 transition-all duration-300 shadow-xl"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[#C9A45C] group-hover:bg-[#C9A45C] group-hover:text-[#101820] transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-[10px] uppercase tracking-widest text-[#A9B0B5] font-semibold">
          0{index + 1} Metric
        </span>
      </div>

      <div>
        <div className="font-serif text-3xl sm:text-4xl text-white font-bold tracking-tight mb-1">
          {count}
          <span className="text-[#C9A45C]">{item.suffix}</span>
        </div>
        <h4 className="font-serif text-sm text-white font-medium mb-1">
          {item.label}
        </h4>
        <p className="text-[11px] text-[#A9B0B5] font-light leading-relaxed">
          {item.subtext}
        </p>
      </div>
    </div>
  );
};

export const MarketplaceStats = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 bg-[#1B2630]/40 border-y border-white/5 relative z-10 overflow-hidden"
    >
      {/* Subtle floating background accent */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C9A45C]/5 rounded-full blur-3xl pointer-events-none animate-float-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div
          className="text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
            MARKETPLACE AT A GLANCE
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal">
            Everyday Shopping, Reimagined
          </h2>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((item, idx) => (
            <StatItem
              key={item.label}
              item={item}
              index={idx}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
