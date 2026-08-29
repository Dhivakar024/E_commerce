import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle = ({ className = '', showLabel = false }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative p-2 rounded-full transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-[#C9A45C]/50 cursor-pointer ${
        isDark
          ? 'text-[#F7F3EA]/80 hover:text-white hover:bg-white/10'
          : 'text-[#101820]/80 hover:text-[#101820] hover:bg-black/5'
      } ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-[18px] h-[18px] flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#C9A45C] transition-transform duration-300 rotate-0 hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#B08B43] transition-transform duration-300 rotate-0 hover:-rotate-12" />
        )}
      </div>
      {showLabel && (
        <span className="ml-2 text-xs uppercase tracking-wider font-medium">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
};
