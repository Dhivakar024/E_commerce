import React from 'react';

export const ProductSkeleton = () => {
  return (
    <div className="flex flex-col bg-[#1B2630]/40 border border-white/5 animate-pulse">
      {/* Image Skeleton (1:1 Square) */}
      <div className="aspect-square bg-white/5 w-full" />

      {/* Meta Skeleton */}
      <div className="p-3 sm:p-3.5 space-y-2">
        <div className="h-2 bg-white/10 w-1/3" />
        <div className="h-3.5 bg-white/10 w-3/4" />
        <div className="h-2 bg-white/10 w-1/2" />
        <div className="pt-2 flex items-center justify-between border-t border-white/5">
          <div className="h-3 bg-white/10 w-1/4" />
          <div className="h-2.5 bg-white/10 w-1/5" />
        </div>
      </div>
    </div>
  );
};
