import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const NotFound = () => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 transition-colors duration-250 ${
      isDark ? 'bg-[#101820] text-[#F7F3EA]' : 'bg-[#F8F6F0] text-[#101820]'
    }`}>
      <div className="text-center max-w-md">
        <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-3 font-semibold">
          404 ERROR
        </span>
        <h1 className={`font-serif text-4xl sm:text-5xl mb-4 ${
          isDark ? 'text-white' : 'text-[#101820]'
        }`}>
          Page Not Found
        </h1>
        <p className={`text-xs sm:text-sm mb-8 leading-relaxed ${
          isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
        }`}>
          The requested page or department does not exist or has been relocated to another section of the marketplace.
        </p>
        <Link
          to="/"
          className="btn-shine inline-flex items-center gap-2 px-8 py-3.5 bg-[#C9A45C] hover:bg-[#D8B872] text-[#101820] text-xs uppercase tracking-widest font-semibold transition-all shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
};
