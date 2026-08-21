import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const CartEmptyState = () => {
  return (
    <div className="py-24 sm:py-32 px-6 text-center max-w-md mx-auto space-y-6 animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-luxury-gold">
        <ShoppingBag className="w-8 h-8" />
      </div>

      <span className="text-xs uppercase tracking-ultra text-luxury-gold block mb-2 font-medium">
        EMPTY BAG
      </span>

      <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
        Your Cart is Empty
      </h2>

      <p className="text-xs sm:text-sm text-luxury-muted font-light leading-relaxed">
        Looks like you haven't added anything yet. Explore our current seasonal collection and discover bespoke luxury crafted for the way you live.
      </p>

      <div className="pt-2">
        <Link
          to="/shop"
          className="btn-shine inline-flex items-center gap-2.5 px-9 py-4 bg-white text-luxury-black hover:bg-luxury-champagne text-xs uppercase tracking-widest font-medium transition-all shadow-xl"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
