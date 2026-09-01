import React from 'react';
import { Truck, CheckCircle2 } from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD } from '../../utils/cartCalculations';
import { useTheme } from '../../context/ThemeContext';

export const ShippingInfoBanner = ({ subtotal = 0 }) => {
  const { isDark } = useTheme();
  const isFreeUnlocked = subtotal >= FREE_SHIPPING_THRESHOLD;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const percentage = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <div
      className={`p-4 sm:p-5 border mb-6 space-y-2.5 transition-colors duration-250 ${
        isDark
          ? 'bg-[#1B2630]/60 border-white/10 text-[#F7F3EA]'
          : 'bg-white border-black/10 text-[#101820] shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {isFreeUnlocked ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          ) : (
            <Truck className="w-4 h-4 text-[#C9A45C] flex-shrink-0" />
          )}
          <span className={`font-medium ${isDark ? 'text-white' : 'text-[#101820]'}`}>
            {isFreeUnlocked ? (
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Complimentary Free Shipping Unlocked!</span>
            ) : (
              <span>
                Add <strong className="text-[#C9A45C]">₹{remaining.toLocaleString('en-IN')}</strong> more to unlock Free Express Shipping
              </span>
            )}
          </span>
        </div>
        <span className={`font-mono text-[11px] ${isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}`}>{percentage}%</span>
      </div>

      {/* Progress Bar */}
      <div className={`w-full h-1.5 overflow-hidden ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
        <div
          className={`h-full transition-all duration-500 ${
            isFreeUnlocked ? 'bg-emerald-500' : 'bg-[#C9A45C]'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
