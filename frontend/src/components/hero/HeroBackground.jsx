import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const HeroBackground = () => {
  const { isDark } = useTheme();

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* 1. Base Gradient Canvas */}
      <div
        className={`absolute inset-0 transition-colors duration-300 ${
          isDark
            ? 'bg-gradient-to-b from-[#0D141B] via-[#101820] to-[#101820]'
            : 'bg-gradient-to-b from-[#FAF8F3] via-[#F8F6F0] to-[#EFECE6]'
        }`}
      />

      {/* 2. Ambient Radial Gold Glow (Top-Right & Center-Left) */}
      <div
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-20 dark:opacity-25"
        style={{ background: 'radial-gradient(circle, #C9A45C 0%, rgba(201, 164, 92, 0) 70%)' }}
      />
      <div
        className="absolute top-1/2 -left-40 w-[500px] h-[500px] -translate-y-1/2 rounded-full blur-[160px] pointer-events-none opacity-10 dark:opacity-15"
        style={{ background: 'radial-gradient(circle, #C9A45C 0%, rgba(201, 164, 92, 0) 70%)' }}
      />
      <div
        className="absolute -bottom-24 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-10 dark:opacity-15"
        style={{ background: 'radial-gradient(circle, #1B2630 0%, rgba(27, 38, 48, 0) 70%)' }}
      />

      {/* 3. Subtle Geometric Luxury Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* 4. Elegant Vignette & Depth Overlays */}
      <div className="absolute inset-0 bg-radial-vignette opacity-40 dark:opacity-60 pointer-events-none" />
      <div
        className={`absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t pointer-events-none ${
          isDark ? 'from-[#101820] to-transparent' : 'from-[#F8F6F0] to-transparent'
        }`}
      />
    </div>
  );
};
