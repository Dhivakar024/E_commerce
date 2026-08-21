import React, { useState } from 'react';
import { Tag, Check, X, AlertCircle } from 'lucide-react';
import { DEMO_COUPONS } from '../../utils/cartCalculations';

export const CouponBox = ({
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
}) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleApply = (e) => {
    e.preventDefault();
    const cleanCode = code.trim().toUpperCase();

    if (!cleanCode) {
      setError('Please enter a coupon code.');
      return;
    }

    if (appliedCoupon && appliedCoupon.code === cleanCode) {
      setError('This coupon is already applied.');
      return;
    }

    const matchedCoupon = DEMO_COUPONS[cleanCode];

    if (matchedCoupon) {
      onApplyCoupon(matchedCoupon);
      setCode('');
      setError('');
    } else {
      setError('Invalid coupon. Try "SAVE10", "FLAT500", or "WELCOME15".');
    }
  };

  return (
    <div className="p-5 sm:p-6 bg-luxury-charcoal/40 border border-white/10 space-y-3.5">
      <div className="flex items-center gap-2 text-xs text-luxury-champagne font-medium uppercase tracking-widest">
        <Tag className="w-3.5 h-3.5 text-luxury-gold" />
        <span>Have a promo code?</span>
      </div>

      {appliedCoupon ? (
        <div className="flex items-center justify-between p-3 bg-white/5 border border-luxury-gold/40 text-xs animate-fade-in">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="font-mono font-medium text-white tracking-wider">
                {appliedCoupon.code}
              </span>
              <span className="text-luxury-muted block text-[10px]">
                {appliedCoupon.description}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onRemoveCoupon}
            className="p-1 text-luxury-muted hover:text-rose-400 transition-colors flex items-center gap-1 text-[10px] uppercase tracking-wider"
            aria-label="Remove applied coupon"
          >
            <span>Remove</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <form onSubmit={handleApply} className="space-y-2">
          <div className="flex items-stretch gap-2">
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. SAVE10, FLAT500"
              className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold text-white text-xs uppercase px-3.5 py-2.5 focus:outline-none placeholder:text-luxury-muted/50"
              aria-label="Coupon code input"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-widest font-medium border border-white/15 transition-colors flex-shrink-0"
            >
              Apply
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-1.5 text-[11px] text-rose-400 animate-fade-in">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="text-[10px] text-luxury-muted flex items-center gap-2 pt-1">
            <span>Available codes:</span>
            <span className="font-mono text-luxury-champagne cursor-pointer hover:underline" onClick={() => setCode('SAVE10')}>SAVE10</span>
            <span>•</span>
            <span className="font-mono text-luxury-champagne cursor-pointer hover:underline" onClick={() => setCode('FLAT500')}>FLAT500</span>
            <span>•</span>
            <span className="font-mono text-luxury-champagne cursor-pointer hover:underline" onClick={() => setCode('WELCOME15')}>WELCOME15</span>
          </div>
        </form>
      )}
    </div>
  );
};
