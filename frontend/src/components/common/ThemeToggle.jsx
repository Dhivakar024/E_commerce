import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle = ({ className = '', showLabel = false }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative p-2 rounded-full transition-all duration-300 flex items-center justify-center focus:outline-none cursor-pointer ${
        isDark
          ? 'text-[#101820] bg-black/10 border border-[#101820]/30 hover:bg-black/20 hover:border-[#101820]/50'
          : 'text-[#101820] bg-[#F7F3EA] border border-[#101820]/45 shadow-[0_2px_8px_rgba(16,24,32,0.12)] hover:bg-white hover:border-[#101820]/75 hover:shadow-[0_3px_10px_rgba(16,24,32,0.18)]'
      } ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-[18px] h-[18px] flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#C9A45C] transition-transform duration-400 rotate-0 hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#101820] transition-transform duration-400 rotate-0 hover:-rotate-12" />
        )}
      </div>
      {showLabel && (
        <span className={`ml-2 text-xs uppercase tracking-wider font-semibold ${
          isDark ? 'text-[#C9A45C]' : 'text-[#101820]'
        }`}>
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
};
