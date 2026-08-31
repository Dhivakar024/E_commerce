import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle = ({ className = '', showLabel = false }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative p-2 rounded-full transition-all duration-400 flex items-center justify-center focus:outline-none cursor-pointer ${
        isDark
          ? 'text-[#C9A45C] bg-white/5 border border-[#C9A45C]/35 hover:bg-[#C9A45C]/20 hover:border-[#C9A45C] hover:shadow-[0_0_12px_rgba(201,164,92,0.35)]'
          : 'text-[#101820] bg-black/10 border border-[#B8944D] hover:bg-black/20 hover:text-black hover:shadow-sm'
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
