import React, { useRef, useEffect, useState } from 'react';

export const HeroVideo = ({ videoSrc = '/videos/hero-fashion.mp4' }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const tryPlay = () => {
      video.play().catch(() => {});
    };

    tryPlay();
    video.addEventListener('canplay', tryPlay);
    return () => video.removeEventListener('canplay', tryPlay);
  }, []);

  // Subtle Parallax on Desktop
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || window.innerWidth < 768) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (scrollY < window.innerHeight) {
            // Subtle slow movement: video moves slightly down as user scrolls down
            setOffsetY(scrollY * 0.22);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 h-full w-full overflow-hidden bg-luxury-black select-none pointer-events-none"
    >
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        controls={false}
        aria-hidden="true"
        style={{
          transform: `translate3d(0, ${offsetY}px, 0) scale(1.08)`,
          transition: 'transform 0.1s ease-out',
        }}
        className="absolute inset-0 h-full w-full object-cover object-[68%_center] sm:object-[62%_center] md:object-center filter brightness-85"
      />

      <div className="absolute inset-0 cinematic-overlay" />
      <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/60 via-luxury-black/25 to-transparent md:w-[58%]" />
    </div>
  );
};
