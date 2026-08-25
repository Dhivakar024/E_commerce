import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, ShieldCheck, ArrowLeft } from 'lucide-react';

export const CheckoutHeader = () => {
  return (
    <header className="w-full bg-luxury-black/95 border-b border-white/10 sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="text-luxury-muted hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/5"
            title="Return to Cart"
            aria-label="Return to shopping cart"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <Link to="/" className="group flex flex-col">
            <span className="font-serif tracking-widest text-lg sm:text-xl text-white group-hover:text-luxury-champagne transition-colors font-medium">
              LAX360 PVT LTD
            </span>
            <span className="text-[8px] uppercase tracking-widest text-[#C9A45C] block -mt-1 font-semibold">
              MULTI-CATEGORY MARKETPLACE
            </span>
          </Link>
        </div>

        {/* Right: Security Trust Badges */}
        <div className="flex items-center gap-3 text-xs text-luxury-champagne">
          <div className="hidden sm:flex items-center gap-1.5 text-emerald-400 text-[11px] bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>256-Bit SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-1.5 text-luxury-gold">
            <Lock className="w-3.5 h-3.5" />
            <span className="font-medium tracking-wider uppercase text-[10px]">Secure Checkout</span>
          </div>
        </div>
      </div>
    </header>
  );
};
