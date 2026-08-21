import React from 'react';
import { Banknote, ShieldCheck } from 'lucide-react';

export const CODPayment = () => {
  return (
    <div className="p-5 sm:p-6 bg-white/5 border border-white/10 space-y-3.5 animate-fade-in text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2 text-luxury-champagne font-medium uppercase tracking-wider">
          <Banknote className="w-4 h-4 text-luxury-gold" />
          <span>Cash on Delivery</span>
        </div>
        <span className="text-[10px] text-luxury-champagne uppercase tracking-widest bg-white/5 px-2 py-0.5 border border-white/15">
          ₹0 Handling Fee
        </span>
      </div>

      <div className="space-y-2 text-luxury-cream/80 font-light leading-relaxed">
        <p>
          Pay conveniently with cash or UPI QR scan directly to our logistics partner upon doorstep delivery.
        </p>
        <div className="flex items-center gap-2 text-[11px] text-emerald-400 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Zero additional COD convenience charges applied for this order.</span>
        </div>
      </div>
    </div>
  );
};
