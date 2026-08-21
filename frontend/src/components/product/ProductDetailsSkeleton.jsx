import React from 'react';

export const ProductDetailsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-32 pb-20 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="h-4 bg-white/10 w-48 mb-8" />

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left Gallery Skeleton */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          <div className="hidden md:flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-20 h-24 bg-white/5" />
            ))}
          </div>
          <div className="aspect-[3/4] flex-grow bg-white/5" />
        </div>

        {/* Right Info Skeleton */}
        <div className="lg:col-span-5 space-y-6">
          <div className="h-4 bg-white/10 w-24" />
          <div className="h-8 bg-white/10 w-3/4" />
          <div className="h-6 bg-white/10 w-1/3" />
          <div className="h-20 bg-white/5 w-full" />
          <div className="h-10 bg-white/5 w-1/2" />
          <div className="h-12 bg-white/10 w-full" />
        </div>
      </div>
    </div>
  );
};
