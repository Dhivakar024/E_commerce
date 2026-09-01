import React from 'react';
import { Banknote, ShieldCheck } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const CODPayment = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`p-5 sm:p-6 border space-y-3.5 animate-fade-in text-xs ${
        isDark ? 'bg-white/5 border-white/10' : 'bg-neutral-50 border-black/10'
      }`}
    >
      <div className={`flex items-center justify-between pb-3 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <div className="flex items-center gap-2 text-[#C9A45C] font-semibold uppercase tracking-wider">
          <Banknote className="w-4 h-4 text-[#C9A45C]" />
          <span>Cash on Delivery</span>
        </div>
        <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 border font-medium ${
          isDark ? 'text-[#C9A45C] bg-white/5 border-white/15' : 'text-[#B08B43] bg-black/5 border-black/10'
        }`}>
          ₹0 Handling Fee
        </span>
      </div>

      <div className={`space-y-2 font-light leading-relaxed ${isDark ? 'text-[#F7F3EA]/80' : 'text-[#4A5560]'}`}>
        <p>
          Pay conveniently with cash or UPI QR scan directly to our logistics partner upon doorstep delivery.
        </p>
        <div className="flex items-center gap-2 text-[11px] text-emerald-600 dark:text-emerald-400 pt-1 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Zero additional COD convenience charges applied for this order.</span>
        </div>
      </div>
    </div>
  );
};
