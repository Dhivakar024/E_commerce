import React, { useState } from 'react';
import { Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { FullscreenImageViewer } from './FullscreenImageViewer';

export const ProductImageGallery = ({
  images = [],
  productName = '',
  isNew = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({
    transformOrigin: 'center center',
    transform: 'scale(1)',
  });

  const validImages = images && images.length > 0 ? images : [''];

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(1.4)',
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: 'center center',
      transform: 'scale(1)',
    });
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row gap-4 sm:gap-6">
        {/* 1. Desktop Vertical Thumbnail Rail (Hidden on Mobile) */}
        {validImages.length > 1 && (
          <div className="hidden md:flex flex-col gap-3 max-h-[640px] overflow-y-auto scrollbar-none flex-shrink-0">
            {validImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`w-20 h-24 overflow-hidden border transition-all duration-300 relative bg-neutral-900 ${
                  activeIndex === idx
                    ? 'border-luxury-gold ring-1 ring-luxury-gold opacity-100'
                    : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                }`}
                aria-label={`View image ${idx + 1} of ${productName}`}
              >
                <img
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        )}

        {/* 2. Main Stage Product Image */}
        <div className="relative aspect-[3/4] flex-grow overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl group">
          {/* Zoomable Container */}
          <div
            className="w-full h-full cursor-zoom-in overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsViewerOpen(true)}
          >
            <img
              src={validImages[activeIndex]}
              alt={`${productName} - main view`}
              style={zoomStyle}
              className="w-full h-full object-cover object-center transition-transform duration-200 ease-out filter brightness-95"
            />
          </div>

          {/* Badges */}
          {isNew && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-widest text-luxury-champagne font-medium pointer-events-none">
              NEW SEASON
            </span>
          )}

          {/* Fullscreen Trigger Button */}
          <button
            onClick={() => setIsViewerOpen(true)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black text-white/80 hover:text-white border border-white/15 backdrop-blur-md transition-colors opacity-0 group-hover:opacity-100"
            aria-label="Open fullscreen image viewer"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Mobile Navigation Arrows */}
          {validImages.length > 1 && (
            <div className="md:hidden">
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white border border-white/15 backdrop-blur-md"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white border border-white/15 backdrop-blur-md"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Mobile Image Counter / Dots Indicator */}
          {validImages.length > 1 && (
            <div className="md:hidden absolute bottom-4 inset-x-0 flex items-center justify-center gap-1.5">
              {validImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    activeIndex === idx ? 'w-6 bg-luxury-gold' : 'w-1.5 bg-white/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. Mobile Horizontal Thumbnail Row */}
      {validImages.length > 1 && (
        <div className="flex md:hidden items-center gap-2 overflow-x-auto pb-1 scrollbar-none mt-3">
          {validImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-14 h-16 flex-shrink-0 overflow-hidden border transition-all ${
                activeIndex === idx
                  ? 'border-luxury-gold ring-1 ring-luxury-gold'
                  : 'border-white/10 opacity-60'
              }`}
            >
              <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Image Lightbox Modal */}
      <FullscreenImageViewer
        isOpen={isViewerOpen}
        images={validImages}
        currentIndex={activeIndex}
        onClose={() => setIsViewerOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
        productName={productName}
      />
    </>
  );
};
