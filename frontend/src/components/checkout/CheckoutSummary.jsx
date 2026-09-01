import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, ShieldCheck, Truck, RotateCcw, Loader2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const CheckoutSummary = ({
  subtotal = 0,
  discount = 0,
  deliveryMethod,
  tax = 0,
  grandTotal = 0,
  appliedCoupon = null,
  isProcessing = false,
  onPlaceOrder,
}) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`p-6 sm:p-8 border shadow-xl space-y-6 lg:sticky lg:top-28 transition-colors duration-250 ${
        isDark
          ? 'bg-[#1B2630] border-white/10 text-[#F7F3EA]'
          : 'bg-white border-black/10 text-[#101820]'
      }`}
    >
      <h3
        className={`font-serif text-xl sm:text-2xl font-normal pb-4 border-b ${
          isDark ? 'text-white border-white/10' : 'text-[#101820] border-black/10'
        }`}
      >
        Order Summary
      </h3>

      {/* Breakdown Rows */}
      <div className="space-y-3.5 text-xs">
        {/* Subtotal */}
        <div
          className={`flex items-center justify-between ${
            isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
          }`}
        >
          <span>Subtotal</span>
          <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#101820]'}`}>
            ₹{subtotal.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Discount */}
        {discount > 0 && appliedCoupon && (
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 animate-fade-in font-medium">
            <div className="flex items-center gap-1.5">
              <span>Coupon ({appliedCoupon.code})</span>
              <Link to="/cart" className="text-[10px] underline hover:text-[#C9A45C]">
                Edit
              </Link>
            </div>
            <span>-₹{discount.toLocaleString('en-IN')}</span>
          </div>
        )}

        {/* Shipping Method */}
        <div
          className={`flex items-center justify-between ${
            isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
          }`}
        >
          <div>
            <span>Shipping</span>
            <span className="text-[10px] text-[#C9A45C] block font-medium">
              {deliveryMethod?.name || 'Standard Shipping'}
            </span>
          </div>
          <span
            className={`font-semibold ${
              (deliveryMethod?.price ?? 0) === 0
                ? 'text-emerald-700 dark:text-emerald-400 uppercase tracking-widest text-[10px]'
                : isDark
                ? 'text-white'
                : 'text-[#101820]'
            }`}
          >
            {(deliveryMethod?.price ?? 0) === 0 ? 'FREE' : `₹${(deliveryMethod?.price ?? 0).toLocaleString('en-IN')}`}
          </span>
        </div>

        {/* Tax */}
        <div
          className={`flex items-center justify-between ${
            isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
          }`}
        >
          <span>Estimated Tax (18% GST)</span>
          <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#101820]'}`}>
            ₹{tax.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Grand Total */}
        <div
          className={`pt-4 border-t flex items-center justify-between ${
            isDark ? 'border-white/10' : 'border-black/10'
          }`}
        >
          <div>
            <span
              className={`font-serif text-base font-semibold block ${
                isDark ? 'text-white' : 'text-[#101820]'
              }`}
            >
              Grand Total
            </span>
            <span
              className={`text-[10px] font-light ${
                isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
              }`}
            >
              All duties included
            </span>
          </div>
          <span className="font-serif text-2xl sm:text-3xl text-[#C9A45C] font-semibold">
            ₹{grandTotal.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Primary Place Order CTA */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onPlaceOrder}
          disabled={isProcessing}
          className={`btn-shine w-full py-3.5 font-semibold text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2.5 ${
            isProcessing
              ? 'bg-neutral-300 dark:bg-neutral-800 text-neutral-500 cursor-wait'
              : isDark
              ? 'bg-[#C9A45C] text-[#101820] hover:bg-[#D8B872] cursor-pointer'
              : 'bg-[#101820] text-white hover:bg-[#C9A45C] hover:text-[#101820] cursor-pointer'
          }`}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Authorizing & Placing Order...</span>
            </>
          ) : (
            <>
              <Lock className="w-3.5 h-3.5" />
              <span>Place Order • ₹{grandTotal.toLocaleString('en-IN')}</span>
            </>
          )}
        </button>
      </div>

      {/* Trust Highlights */}
      <div
        className={`pt-6 border-t space-y-3 text-[11px] font-light ${
          isDark ? 'border-white/10 text-[#A9B0B5]' : 'border-black/10 text-[#55606A]'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <Truck className="w-3.5 h-3.5 text-[#C9A45C] flex-shrink-0" />
          <span>Complimentary insurance & tracked dispatch.</span>
        </div>
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C9A45C] flex-shrink-0" />
          <span>256-bit SSL encrypted secure checkout.</span>
        </div>
        <div className="flex items-center gap-2.5">
          <RotateCcw className="w-3.5 h-3.5 text-[#C9A45C] flex-shrink-0" />
          <span>14-day hassle-free returns & exchange.</span>
        </div>
      </div>
    </div>
  );
};
