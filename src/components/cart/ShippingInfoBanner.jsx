import React from 'react';
import { Truck, CheckCircle2 } from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD } from '../../utils/cartCalculations';

export const ShippingInfoBanner = ({ subtotal = 0 }) => {
  const isFreeUnlocked = subtotal >= FREE_SHIPPING_THRESHOLD;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const percentage = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <div className="p-4 sm:p-5 bg-luxury-charcoal/40 border border-white/10 mb-6 space-y-2.5">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {isFreeUnlocked ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          ) : (
            <Truck className="w-4 h-4 text-luxury-gold flex-shrink-0" />
          )}
          <span className="font-medium text-white">
            {isFreeUnlocked ? (
              <span className="text-emerald-400">Complimentary Free Shipping Unlocked!</span>
            ) : (
              <span>
                Add <strong className="text-luxury-champagne">₹{remaining.toLocaleString('en-IN')}</strong> more to unlock Free Express Shipping
              </span>
            )}
          </span>
        </div>
        <span className="text-luxury-muted font-mono text-[11px]">{percentage}%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-white/10 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${
            isFreeUnlocked ? 'bg-emerald-400' : 'bg-luxury-gold'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
