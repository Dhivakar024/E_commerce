import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shirt, Armchair, Smartphone, Pill, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useTheme } from '../../context/ThemeContext';

const STORE_BLOCKS = [
  {
    category: 'Fashion',
    title: 'Modern Apparel & Footwear',
    description: 'Timeless styles, refined workwear, and comfortable casuals for men, women, and kids.',
    cta: 'Shop Fashion',
    link: '/category/fashion',
    icon: Shirt,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop',
  },
  {
    category: 'Furniture',
    title: 'Home & Living Essentials',
    description: 'Architectural living room sofas, solid teak dining tables, and ergonomic office comfort.',
    cta: 'Explore Furniture',
    link: '/category/furniture',
    icon: Armchair,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
  },
  {
    category: 'Electronics',
    title: 'Smart Tech & Gadgets',
    description: 'OLED 4K displays, high-speed laptops, flagship smartphones, and pro audio gear.',
    cta: 'Discover Electronics',
    link: '/category/electronics',
    icon: Smartphone,
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=800&auto=format&fit=crop',
  },
  {
    category: 'Medicines',
    title: 'Health & Personal Wellness',
    description: 'Certified multivitamins, first-aid safety kits, herbal care, and diagnostic monitors.',
    cta: 'Shop Wellness',
    link: '/category/medicines',
    icon: Pill,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop',
  },
  {
    category: 'Cosmetics',
    title: 'Beauty & Skincare Formulations',
    description: 'Hydrating serums, velvet matte lip shades, luminous highlighters, and clean beauty.',
    cta: 'Explore Beauty',
    link: '/category/cosmetics',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop',
  },
];

export const FeaturedCollection = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });
  const { isDark } = useTheme();

  return (
    <section
      ref={sectionRef}
      className={`py-20 sm:py-28 border-y relative z-10 overflow-hidden transition-colors duration-250 ${
        isDark
          ? 'bg-[#1B2630]/40 border-white/5'
          : 'bg-[#F2EFE9]/60 border-black/5'
      }`}
    >
      {/* Subtle floating background decoration */}
      <div className="absolute top-12 right-12 w-64 h-64 bg-[#C9A45C]/5 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute bottom-8 left-8 w-48 h-48 bg-[#C9A45C]/5 rounded-full blur-3xl pointer-events-none animate-float-reverse" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 border-b border-black/10 dark:border-white/10 pb-6 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <div>
            <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
              EXPLORE OUR STORE
            </span>
            <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-normal mb-2 ${
              isDark ? 'text-white' : 'text-[#101820]'
            }`}>
              Curated Category Hubs
            </h2>
            <p className={`text-xs sm:text-sm font-light ${
              isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
            }`}>
              Shop across 5 dedicated marketplace departments with guaranteed authenticity and fast delivery.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C9A45C] hover:text-[#B08B43] mt-4 md:mt-0 font-semibold transition-colors group"
          >
            <span>View Complete Marketplace</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 5 Category Shopping Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {STORE_BLOCKS.map((block, idx) => {
            const Icon = block.icon;

            return (
              <div
                key={block.category}
                className={`group relative flex flex-col justify-between overflow-hidden border transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-1 ${
                  isDark
                    ? 'bg-[#101820] border-white/10 hover:border-[#C9A45C] hover:shadow-black/50 text-white'
                    : 'bg-white border-black/10 hover:border-[#B08B43] hover:shadow-black/10 text-[#101820]'
                }`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
                  transition: 'opacity 0.6s ease-out, transform 0.6s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
                  transitionDelay: `${idx * 110}ms`,
                }}
              >
                {/* Background Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img
                    src={block.image}
                    alt={block.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-85 group-hover:brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-widest text-[#C9A45C] font-semibold transition-transform duration-300 group-hover:scale-105">
                    <Icon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-6" />
                    <span>{block.category}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                  <div>
                    <h3 className={`font-serif text-xl font-medium mb-2 transition-colors ${
                      isDark
                        ? 'text-white group-hover:text-[#C9A45C]'
                        : 'text-[#101820] group-hover:text-[#B08B43]'
                    }`}>
                      {block.title}
                    </h3>
                    <p className={`text-xs font-light leading-relaxed ${
                      isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
                    }`}>
                      {block.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/5 dark:border-white/10">
                    <Link
                      to={block.link}
                      className={`btn-shine inline-flex items-center justify-center gap-2 w-full py-3 text-xs uppercase tracking-widest font-semibold border transition-all ${
                        isDark
                          ? 'bg-white/5 hover:bg-[#C9A45C] hover:text-[#101820] text-[#F7F3EA] border-white/10 hover:border-[#C9A45C]'
                          : 'bg-[#F8F6F0] hover:bg-[#B08B43] hover:text-white text-[#101820] border-black/10 hover:border-[#B08B43]'
                      }`}
                    >
                      <span>{block.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
