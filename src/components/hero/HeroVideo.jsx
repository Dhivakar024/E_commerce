import React, { useRef, useEffect } from 'react';

export const HeroVideo = ({ videoSrc = '/videos/hero-fashion.mp4' }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const tryPlay = () => {
      video.play().catch(() => {
        // Autoplay can be interrupted on first paint; retry on next interaction is handled by loop/muted attrs.
      });
    };

    tryPlay();
    video.addEventListener('canplay', tryPlay);
    return () => video.removeEventListener('canplay', tryPlay);
  }, []);

  return (
    <div className="absolute inset-0 z-0 h-full w-full overflow-hidden bg-luxury-black select-none pointer-events-none">
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
        className="absolute inset-0 h-full w-full object-cover object-[68%_center] sm:object-[62%_center] md:object-center"
      />

      <div className="absolute inset-0 cinematic-overlay" />
      <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/50 via-luxury-black/20 to-transparent md:w-[58%]" />
    </div>
  );
};
