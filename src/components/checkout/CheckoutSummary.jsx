import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, ShieldCheck, Truck, RotateCcw, Loader2 } from 'lucide-react';

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
  return (
    <div className="p-6 sm:p-8 bg-luxury-charcoal/50 border border-white/10 shadow-2xl space-y-6 lg:sticky lg:top-28">
      <h3 className="font-serif text-xl sm:text-2xl text-white font-normal pb-4 border-b border-white/10">
        Order Summary
      </h3>

      {/* Breakdown Rows */}
      <div className="space-y-3.5 text-xs">
        {/* Subtotal */}
        <div className="flex items-center justify-between text-luxury-muted">
          <span>Subtotal</span>
          <span className="text-white font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
        </div>

        {/* Discount */}
        {discount > 0 && appliedCoupon && (
          <div className="flex items-center justify-between text-emerald-400 animate-fade-in">
            <div className="flex items-center gap-1.5">
              <span>Coupon ({appliedCoupon.code})</span>
              <Link to="/cart" className="text-[10px] underline text-luxury-muted hover:text-white">
                Edit
              </Link>
            </div>
            <span className="font-medium">-₹{discount.toLocaleString('en-IN')}</span>
          </div>
        )}

        {/* Shipping Method */}
        <div className="flex items-center justify-between text-luxury-muted">
          <div>
            <span>Shipping</span>
            <span className="text-[10px] text-luxury-champagne block">{deliveryMethod?.name || 'Standard Shipping'}</span>
          </div>
          <span className={`font-medium ${(deliveryMethod?.price ?? 0) === 0 ? 'text-emerald-400 uppercase tracking-widest text-[10px]' : 'text-white'}`}>
            {(deliveryMethod?.price ?? 0) === 0 ? 'FREE' : `₹${(deliveryMethod?.price ?? 0).toLocaleString('en-IN')}`}
          </span>
        </div>

        {/* Tax */}
        <div className="flex items-center justify-between text-luxury-muted">
          <span>Estimated Tax (18% GST)</span>
          <span className="text-white">₹{tax.toLocaleString('en-IN')}</span>
        </div>

        {/* Grand Total */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div>
            <span className="font-serif text-base text-white block">Grand Total</span>
            <span className="text-[10px] text-luxury-muted font-light">All duties included</span>
          </div>
          <span className="font-serif text-2xl sm:text-3xl text-luxury-champagne font-medium">
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
          className={`btn-shine w-full py-4 font-medium text-xs uppercase tracking-widest transition-all shadow-2xl flex items-center justify-center gap-2.5 ${
            isProcessing
              ? 'bg-neutral-800 text-neutral-400 cursor-wait'
              : 'bg-white text-luxury-black hover:bg-luxury-champagne cursor-pointer'
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
      <div className="pt-6 border-t border-white/10 space-y-3 text-[11px] text-luxury-muted font-light">
        <div className="flex items-center gap-2.5">
          <Truck className="w-3.5 h-3.5 text-luxury-gold flex-shrink-0" />
          <span>Complimentary insurance & tracked dispatch.</span>
        </div>
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-3.5 h-3.5 text-luxury-gold flex-shrink-0" />
          <span>256-bit SSL encrypted secure checkout.</span>
        </div>
        <div className="flex items-center gap-2.5">
          <RotateCcw className="w-3.5 h-3.5 text-luxury-gold flex-shrink-0" />
          <span>14-day hassle-free returns & exchange.</span>
        </div>
      </div>
    </div>
  );
};
