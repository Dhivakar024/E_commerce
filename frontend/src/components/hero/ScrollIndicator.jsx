import React from 'react';

export const ScrollIndicator = ({ targetId = 'shop-by-category' }) => {
  const handleScroll = () => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={handleScroll}
      className="absolute bottom-6 sm:bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70 transition-colors duration-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
      aria-label="Scroll to explore"
    >
      <span className="text-[10px] font-light uppercase tracking-[0.32em] text-luxury-champagne/85">
        Scroll to Explore
      </span>
      <span className="flex h-7 w-4 items-start justify-center overflow-hidden" aria-hidden="true">
        <span className="mt-0.5 block h-2 w-[1px] bg-white/80 animate-float-slow" />
      </span>
    </button>
  );
};
