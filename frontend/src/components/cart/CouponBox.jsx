import React, { useState } from 'react';
import { Tag, Check, X, AlertCircle } from 'lucide-react';
import { DEMO_COUPONS } from '../../utils/cartCalculations';
import { useTheme } from '../../context/ThemeContext';

export const CouponBox = ({
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
}) => {
  const { isDark } = useTheme();
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
    <div
      className={`p-5 sm:p-6 border space-y-3.5 transition-colors duration-250 ${
        isDark
          ? 'bg-[#1B2630]/40 border-white/10 text-[#F7F3EA]'
          : 'bg-white border-black/10 text-[#101820] shadow-sm'
      }`}
    >
      <div className="flex items-center gap-2 text-xs text-[#C9A45C] font-semibold uppercase tracking-widest">
        <Tag className="w-3.5 h-3.5 text-[#C9A45C]" />
        <span>Have a promo code?</span>
      </div>

      {appliedCoupon ? (
        <div
          className={`flex items-center justify-between p-3 border text-xs animate-fade-in ${
            isDark
              ? 'bg-white/5 border-[#C9A45C]/40 text-white'
              : 'bg-neutral-50 border-[#C9A45C]/50 text-[#101820]'
          }`}
        >
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <div>
              <span className={`font-mono font-medium tracking-wider ${isDark ? 'text-white' : 'text-[#101820]'}`}>
                {appliedCoupon.code}
              </span>
              <span className={`block text-[10px] ${isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}`}>
                {appliedCoupon.description}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onRemoveCoupon}
            className="p-1 text-rose-500 hover:text-rose-700 transition-colors flex items-center gap-1 text-[10px] uppercase tracking-wider cursor-pointer"
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
              className={`w-full text-xs uppercase px-3.5 py-2.5 focus:outline-none border transition-colors ${
                isDark
                  ? 'bg-white/5 border-white/15 focus:border-[#C9A45C] text-white placeholder:text-[#A9B0B5]/50'
                  : 'bg-neutral-50 border-black/15 focus:border-[#C9A45C] text-[#101820] placeholder:text-[#717D86]/60'
              }`}
              aria-label="Coupon code input"
            />
            <button
              type="submit"
              className={`px-5 py-2.5 text-xs uppercase tracking-widest font-semibold border transition-colors flex-shrink-0 cursor-pointer ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-white border-white/15'
                  : 'bg-black/5 hover:bg-black/10 text-[#101820] border-black/15'
              }`}
            >
              Apply
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-1.5 text-[11px] text-rose-600 dark:text-rose-400 animate-fade-in">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className={`text-[10px] flex items-center gap-2 pt-1 ${isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}`}>
            <span>Available codes:</span>
            <span className="font-mono text-[#C9A45C] font-semibold cursor-pointer hover:underline" onClick={() => setCode('SAVE10')}>SAVE10</span>
            <span>•</span>
            <span className="font-mono text-[#C9A45C] font-semibold cursor-pointer hover:underline" onClick={() => setCode('FLAT500')}>FLAT500</span>
            <span>•</span>
            <span className="font-mono text-[#C9A45C] font-semibold cursor-pointer hover:underline" onClick={() => setCode('WELCOME15')}>WELCOME15</span>
          </div>
        </form>
      )}
    </div>
  );
};
