import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useTheme } from '../../context/ThemeContext';
import { Package, Layers, ShieldCheck, Truck } from 'lucide-react';

const STATS = [
  {
    icon: Package,
    target: 50,
    suffix: '+',
    label: 'Curated Collections',
    subtext: 'Carefully curated across all 5 marketplace departments',
  },
  {
    icon: Layers,
    target: 5,
    suffix: '',
    label: 'Marketplace Departments',
    subtext: 'Fashion, Furniture, Electronics, Medicines & Cosmetics',
  },
  {
    icon: ShieldCheck,
    target: 100,
    suffix: '%',
    label: 'Verified Authentic Products',
    subtext: 'Direct verified sourcing & strict quality assurance check',
  },
  {
    icon: Truck,
    target: 24,
    suffix: '/7',
    label: 'Fast Nationwide Delivery',
    subtext: 'Priority expedited dispatch across all domestic pin codes',
  },
];

// Single Animated Counter Item
const StatItem = ({ item, isVisible, index, isDark }) => {
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
      className={`p-5 sm:p-6 lg:p-6 xl:p-7 border space-y-3 relative overflow-hidden group transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between ${
        isDark
          ? 'bg-[#1B2630] border-white/[0.08] hover:border-[#C9A45C]/60 text-white'
          : 'bg-white border-black/[0.08] hover:border-[#B08B43]/60 text-[#101820]'
      }`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="flex items-center justify-between">
        <div
          className={`w-10 h-10 rounded-none border flex items-center justify-center transition-colors ${
            isDark
              ? 'bg-white/5 border-white/10 text-[#C9A45C] group-hover:bg-[#C9A45C] group-hover:text-[#101820]'
              : 'bg-black/5 border-black/10 text-[#B08B43] group-hover:bg-[#B08B43] group-hover:text-white'
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <span
          className={`text-[10px] uppercase tracking-widest font-semibold ${
            isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
          }`}
        >
          0{index + 1} Metric
        </span>
      </div>

      <div>
        <div className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-1">
          {count}
          <span className="text-[#C9A45C]">{item.suffix}</span>
        </div>
        <h4 className="font-serif text-sm font-semibold mb-1">
          {item.label}
        </h4>
        <p
          className={`text-[11px] font-light leading-relaxed ${
            isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
          }`}
        >
          {item.subtext}
        </p>
      </div>
    </div>
  );
};

export const MarketplaceStats = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.15 });
  const { isDark } = useTheme();

  return (
    <section
      ref={sectionRef}
      className={`py-14 sm:py-20 border-y relative z-10 overflow-hidden w-full max-w-none transition-colors duration-250 ${
        isDark
          ? 'bg-[#151F28] border-white/[0.08]'
          : 'bg-[#EDE9DF] border-black/[0.08]'
      }`}
    >
      {/* Subtle floating background accent */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C9A45C]/5 rounded-full blur-3xl pointer-events-none animate-float-slow" />

      {/* Full-width container spanning 100% available viewport */}
      <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 relative z-10">
        {/* Section Header */}
        <div
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
            MARKETPLACE AT A GLANCE
          </span>
          <h2
            className={`font-serif text-2xl sm:text-3xl md:text-4xl font-normal ${
              isDark ? 'text-white' : 'text-[#101820]'
            }`}
          >
            Everyday Shopping, Reimagined
          </h2>
        </div>

        {/* 4 Cards evenly distributed across 100% full screen width: 4-cols desktop, 2-cols tablet, 1-col mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6 xl:gap-8 w-full">
          {STATS.map((item, idx) => (
            <StatItem
              key={item.label}
              item={item}
              index={idx}
              isVisible={isVisible}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
