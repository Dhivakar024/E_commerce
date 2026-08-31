import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Layers,
  CheckCircle2,
  ShieldCheck,
  HeartHandshake,
  Shirt,
  Armchair,
  Smartphone,
  Pill,
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { MagneticButton } from '../components/common/MagneticButton';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTheme } from '../context/ThemeContext';

const CATEGORY_ICONS = {
  fashion: Shirt,
  furniture: Armchair,
  electronics: Smartphone,
  medicines: Pill,
  cosmetics: Sparkles,
};

const WHAT_WE_OFFER = [
  {
    category: 'Fashion',
    slug: 'fashion',
    icon: Shirt,
    description: 'Everyday styles and essentials for men, women and kids.',
  },
  {
    category: 'Furniture',
    slug: 'furniture',
    icon: Armchair,
    description: 'Furniture and home pieces designed for modern living.',
  },
  {
    category: 'Electronics',
    slug: 'electronics',
    icon: Smartphone,
    description: 'Technology and smart devices for everyday life.',
  },
  {
    category: 'Medicines',
    slug: 'medicines',
    icon: Pill,
    description: 'Everyday healthcare, wellness and personal care essentials.',
  },
  {
    category: 'Cosmetics',
    slug: 'cosmetics',
    icon: Sparkles,
    description: 'Beauty, skincare, haircare and personal care products.',
  },
];

const WHY_LAX360 = [
  {
    icon: Layers,
    title: 'One Marketplace',
    description: 'Shop across multiple categories from one platform.',
  },
  {
    icon: CheckCircle2,
    title: 'Wide Selection',
    description: 'Discover products for different parts of everyday life.',
  },
  {
    icon: ShieldCheck,
    title: 'Simple Experience',
    description: 'Search, compare and shop with a clean experience.',
  },
  {
    icon: HeartHandshake,
    title: 'Customer Focused',
    description: 'Designed around convenience and customer needs.',
  },
];

export const About = () => {
  const { isDark } = useTheme();
  const [heroRef, isHeroVisible] = useScrollReveal({ threshold: 0.1 });
  const [missionRef, isMissionVisible] = useScrollReveal({ threshold: 0.1 });
  const [offerRef, isOfferVisible] = useScrollReveal({ threshold: 0.1 });
  const [whyRef, isWhyVisible] = useScrollReveal({ threshold: 0.1 });
  const [storyRef, isStoryVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <main className={`w-full min-h-screen pt-28 sm:pt-32 pb-24 overflow-x-hidden transition-colors duration-250 ${
      isDark ? 'bg-[#101820] text-[#F7F3EA]' : 'bg-[#F8F6F0] text-[#101820]'
    }`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-20">
        {/* 1. Hero Section */}
        <div
          ref={heroRef}
          className="text-center max-w-3xl mx-auto space-y-4 transition-all duration-700 ease-out"
          style={{
            opacity: isHeroVisible ? 1 : 0,
            transform: isHeroVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block font-semibold">
            ABOUT LAX360 PVT LTD
          </span>
          <h1 className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight ${
            isDark ? 'text-white' : 'text-[#101820]'
          }`}>
            One Marketplace. Everything You Need.
          </h1>
          <p className={`text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto ${
            isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
          }`}>
            LAX360 PVT LTD is a modern multi-category e-commerce platform bringing everyday products together in one convenient shopping destination.
          </p>
        </div>

        {/* 2. Panoramic Marketplace Banner */}
        <div className="relative h-[340px] sm:h-[440px] overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80"
            alt="LAX360 Multi-Category Marketplace"
            className="w-full h-full object-cover filter brightness-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101820] via-transparent to-[#101820]/40" />
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 max-w-lg space-y-2">
            <span className="text-[10px] uppercase tracking-ultra text-[#C9A45C] block font-semibold">
              EVERYDAY SHOPPING SIMPLIFIED
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              Empowering Modern Lifestyles Across India
            </h2>
          </div>
        </div>

        {/* 3. OUR MISSION */}
        <div
          ref={missionRef}
          className={`p-8 sm:p-12 border shadow-xl text-center w-full space-y-4 transition-all duration-700 ease-out ${
            isDark ? 'bg-[#1B2630] border-white/10 text-white' : 'bg-white border-black/10 text-[#101820]'
          }`}
          style={{
            opacity: isMissionVisible ? 1 : 0,
            transform: isMissionVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block font-semibold">
            OUR MISSION
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal">
            "To make everyday shopping simpler by bringing multiple product categories together on one convenient digital marketplace."
          </h2>
          <p className={`text-xs sm:text-sm font-light leading-relaxed max-w-2xl mx-auto ${
            isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
          }`}>
            We eliminate the need to switch between fragmented specialty stores. By consolidating certified electronics, architectural furniture, daily wellness essentials, clean cosmetics, and versatile fashion, LAX360 provides a frictionless unified shopping journey.
          </p>
        </div>

        {/* 4. WHAT WE OFFER (5 Category Blocks) */}
        <div ref={offerRef} className="space-y-8">
          <div
            className="text-center max-w-2xl mx-auto transition-all duration-700 ease-out"
            style={{
              opacity: isOfferVisible ? 1 : 0,
              transform: isOfferVisible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
              CORE CATEGORIES
            </span>
            <h2 className={`font-serif text-3xl sm:text-4xl font-normal ${
              isDark ? 'text-white' : 'text-[#101820]'
            }`}>
              What We Offer
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {WHAT_WE_OFFER.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.category}
                  to={`/category/${item.slug}`}
                  className={`p-6 border transition-all duration-300 flex flex-col justify-between space-y-4 group shadow-xl hover:-translate-y-1 ${
                    isDark
                      ? 'bg-[#1B2630] border-white/10 hover:border-[#C9A45C] text-white'
                      : 'bg-white border-black/10 hover:border-[#B08B43] text-[#101820]'
                  }`}
                  style={{
                    opacity: isOfferVisible ? 1 : 0,
                    transform: isOfferVisible ? 'translateY(0)' : 'translateY(28px)',
                    transition: 'opacity 0.6s ease-out, transform 0.6s ease-out, border-color 0.3s ease',
                    transitionDelay: `${idx * 80}ms`,
                  }}
                >
                  <div className={`w-12 h-12 border flex items-center justify-center text-[#C9A45C] transition-colors ${
                    isDark
                      ? 'bg-white/5 border-white/10 group-hover:bg-[#C9A45C] group-hover:text-[#101820]'
                      : 'bg-black/5 border-black/10 group-hover:bg-[#B08B43] group-hover:text-white'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className={`font-serif text-lg font-medium mb-1.5 transition-colors ${
                      isDark ? 'text-white group-hover:text-[#C9A45C]' : 'text-[#101820] group-hover:text-[#B08B43]'
                    }`}>
                      {item.category}
                    </h3>
                    <p className={`text-xs font-light leading-relaxed ${
                      isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
                    }`}>
                      {item.description}
                    </p>
                  </div>

                  <div className={`pt-3 border-t flex items-center justify-between text-xs uppercase tracking-widest font-semibold ${
                    isDark ? 'border-white/5 text-[#C9A45C]' : 'border-black/5 text-[#B08B43]'
                  }`}>
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 5. WHY LAX360? */}
        <div ref={whyRef} className="space-y-8 pt-6 border-t border-black/10 dark:border-white/10">
          <div
            className="text-center max-w-2xl mx-auto transition-all duration-700 ease-out"
            style={{
              opacity: isWhyVisible ? 1 : 0,
              transform: isWhyVisible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
              ADVANTAGES
            </span>
            <h2 className={`font-serif text-3xl sm:text-4xl font-normal ${
              isDark ? 'text-white' : 'text-[#101820]'
            }`}>
              Why LAX360?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_LAX360.map((prop, idx) => {
              const Icon = prop.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 border space-y-4 shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                    isDark
                      ? 'bg-[#1B2630] border-white/10 text-white hover:border-[#C9A45C]/60'
                      : 'bg-white border-black/10 text-[#101820] hover:border-[#B08B43]/60'
                  }`}
                  style={{
                    opacity: isWhyVisible ? 1 : 0,
                    transform: isWhyVisible ? 'translateY(0)' : 'translateY(28px)',
                    transition: 'opacity 0.6s ease-out, transform 0.6s ease-out, border-color 0.3s ease',
                    transitionDelay: `${idx * 90}ms`,
                  }}
                >
                  <div className={`w-10 h-10 border flex items-center justify-center text-[#C9A45C] ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-medium">{prop.title}</h3>
                  <p className={`text-xs font-light leading-relaxed ${
                    isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
                  }`}>
                    {prop.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. FORWARD-LOOKING BRAND STORY */}
        <div
          ref={storyRef}
          className={`p-8 sm:p-12 border w-full space-y-4 transition-all duration-700 ease-out ${
            isDark ? 'bg-[#1B2630]/60 border-white/10 text-white' : 'bg-white border-black/10 text-[#101820]'
          }`}
          style={{
            opacity: isStoryVisible ? 1 : 0,
            transform: isStoryVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block font-semibold">
            OUR STORY
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal">
            Building The Future of Everyday Commerce
          </h2>
          <div className={`space-y-3 text-sm font-light leading-relaxed ${
            isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
          }`}>
            <p>
              LAX360 PVT LTD is built around a simple idea: shopping should be convenient, diverse and accessible from one place.
            </p>
            <p>
              The platform brings multiple everyday categories together while keeping the shopping experience simple and modern. Whether furnishing a new home, upgrading everyday technology, stocking verified health care products, or refreshing your personal style, LAX360 delivers quality assurance, rapid fulfillment, and verified transparency.
            </p>
          </div>
        </div>

        {/* 7. EXPLORE OUR CATEGORIES GRID */}
        <div className="space-y-8 pt-6 border-t border-black/10 dark:border-white/10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2 font-semibold">
              DISCOVER
            </span>
            <h2 className={`font-serif text-3xl sm:text-4xl font-normal ${
              isDark ? 'text-white' : 'text-[#101820]'
            }`}>
              Explore Our Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.slug] || Sparkles;
              return (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  className="group relative overflow-hidden border border-black/10 dark:border-white/10 hover:border-[#C9A45C] transition-all shadow-xl"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-1.5 text-[#C9A45C] text-xs font-semibold uppercase mb-1">
                        <Icon className="w-3.5 h-3.5" />
                        <span>{cat.name}</span>
                      </div>
                      <span className="text-[11px] text-white/80">Explore Store →</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* CTA to Shop */}
        <div className="text-center py-8 space-y-6">
          <h2 className={`font-serif text-3xl sm:text-4xl font-normal ${
            isDark ? 'text-white' : 'text-[#101820]'
          }`}>
            Ready to Start Shopping?
          </h2>
          <MagneticButton
            to="/shop"
            className="btn-shine inline-flex items-center gap-2 px-10 py-4 bg-[#C9A45C] hover:bg-[#D8B872] text-[#101820] uppercase tracking-widest text-xs font-semibold transition-all shadow-2xl"
          >
            <span>Explore All Marketplace Products</span>
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>
        </div>
      </div>

      <NewsletterSection />
    </main>
  );
};
