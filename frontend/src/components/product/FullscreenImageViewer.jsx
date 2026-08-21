import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export const FullscreenImageViewer = ({
  isOpen,
  images = [],
  currentIndex = 0,
  onClose,
  onPrev,
  onNext,
  productName = '',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose?.();
      if (e.key === 'ArrowLeft') onPrev?.();
      if (e.key === 'ArrowRight') onNext?.();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`Fullscreen image viewer for ${productName}`}
    >
      {/* Top Bar: Counter & Close */}
      <div className="absolute top-6 inset-x-6 sm:inset-x-10 flex items-center justify-between z-20">
        <span className="text-xs uppercase tracking-widest text-luxury-champagne font-medium">
          {currentIndex + 1} / {images.length} • {productName}
        </span>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close fullscreen viewer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Container */}
      <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center select-none">
        <img
          src={images[currentIndex]}
          alt={`${productName} view ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain filter brightness-95 shadow-2xl transition-all duration-300"
        />

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={onPrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/10 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={onNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/10 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      {images.length > 1 && (
        <div className="absolute bottom-6 inset-x-6 flex items-center justify-center gap-2 overflow-x-auto z-20 py-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (idx > currentIndex) {
                  for (let i = 0; i < idx - currentIndex; i++) onNext();
                } else if (idx < currentIndex) {
                  for (let i = 0; i < currentIndex - idx; i++) onPrev();
                }
              }}
              className={`w-12 h-14 overflow-hidden border transition-all ${
                currentIndex === idx
                  ? 'border-luxury-gold ring-1 ring-luxury-gold opacity-100 scale-105'
                  : 'border-white/20 opacity-50 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
