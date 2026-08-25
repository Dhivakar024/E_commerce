import React, { lazy, Suspense } from 'react';
import { HeroVideo } from '../components/hero/HeroVideo';
import { HeroContent } from '../components/hero/HeroContent';
import { ScrollIndicator } from '../components/hero/ScrollIndicator';
import { MarketplaceStats } from '../components/home/MarketplaceStats';

const ShopByCategory = lazy(() =>
  import('../components/home/ShopByCategory').then((m) => ({ default: m.ShopByCategory }))
);
const FeaturedCollection = lazy(() =>
  import('../components/home/FeaturedCollection').then((m) => ({ default: m.FeaturedCollection }))
);
const TrendingNow = lazy(() =>
  import('../components/home/TrendingNow').then((m) => ({ default: m.TrendingNow }))
);
const PromotionalBanner = lazy(() =>
  import('../components/home/PromotionalBanner').then((m) => ({ default: m.PromotionalBanner }))
);
const NewArrivals = lazy(() =>
  import('../components/home/NewArrivals').then((m) => ({ default: m.NewArrivals }))
);
const BrandStatement = lazy(() =>
  import('../components/home/BrandStatement').then((m) => ({ default: m.BrandStatement }))
);
const NewsletterSection = lazy(() =>
  import('../components/home/NewsletterSection').then((m) => ({ default: m.NewsletterSection }))
);

export const Home = () => {
  return (
    <main className="w-full bg-[#101820] text-[#F7F3EA] overflow-x-hidden">
      {/* 1. Cinematic Hero Section with Subtle Parallax */}
      <section className="relative flex h-[100svh] min-h-[100svh] w-full items-center overflow-hidden">
        <HeroVideo videoSrc="/videos/hero-fashion.mp4" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-5 sm:px-8 lg:px-12">
          <HeroContent />
        </div>

        <ScrollIndicator targetId="shop-by-category" />
      </section>

      {/* 2. Interactive Marketplace Sections */}
      <Suspense fallback={<div className="min-h-[40vh] bg-[#101820]" aria-hidden="true" />}>
        {/* Shop by Category (Interactive 3D Cards) */}
        <ShopByCategory />

        {/* Curated Category Hubs */}
        <FeaturedCollection />

        {/* Animated Marketplace Stats Counter */}
        <MarketplaceStats />

        {/* Trending Now (Interactive Carousel & Category Filter Tabs) */}
        <TrendingNow />

        {/* Why Shop with LAX360 Benefits */}
        <BrandStatement />

        {/* Promotional Section */}
        <PromotionalBanner />

        {/* New Arrivals Horizontal Carousel */}
        <NewArrivals />

        {/* Marketplace Newsletter */}
        <NewsletterSection />
      </Suspense>
    </main>
  );
};
