import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const CheckoutHeader = () => {
  const { isDark } = useTheme();

  return (
    <header
      className={`w-full sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-250 ${
        isDark
          ? 'bg-[#101820]/95 border-white/10 text-[#F7F3EA]'
          : 'bg-white/95 border-black/10 text-[#101820] shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className={`p-1.5 rounded-full transition-colors ${
              isDark ? 'text-[#A9B0B5] hover:text-white hover:bg-white/5' : 'text-[#717D86] hover:text-[#101820] hover:bg-black/5'
            }`}
            title="Return to Cart"
            aria-label="Return to shopping cart"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <Link to="/" className="group flex flex-col">
            <span
              className={`font-serif tracking-widest text-lg sm:text-xl font-medium transition-colors ${
                isDark ? 'text-white group-hover:text-[#C9A45C]' : 'text-[#101820] group-hover:text-[#C9A45C]'
              }`}
            >
              LAX360 PVT LTD
            </span>
            <span className="text-[8px] uppercase tracking-widest text-[#C9A45C] block -mt-1 font-semibold">
              MULTI-CATEGORY MARKETPLACE
            </span>
          </Link>
        </div>

        {/* Right: Security Trust Badges */}
        <div className="flex items-center gap-3 text-xs">
          <div className="hidden sm:flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-[11px] bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/20 px-2.5 py-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>256-Bit SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#C9A45C]">
            <Lock className="w-3.5 h-3.5" />
            <span className="font-semibold tracking-wider uppercase text-[10px]">Secure Checkout</span>
          </div>
        </div>
      </div>
    </header>
  );
};
