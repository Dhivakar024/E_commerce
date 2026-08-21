import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Lock, AlertCircle } from 'lucide-react';

export const OrderSummaryCard = ({
  items = [],
  subtotal = 0,
  discount = 0,
  shipping = 0,
  tax = 0,
  grandTotal = 0,
  appliedCoupon = null,
}) => {
  const navigate = useNavigate();

  const hasOutOfStockItem = items.some((item) => (item.product?.stock ?? item.stock ?? 99) <= 0);
  const isCartEmpty = items.length === 0;

  const handleProceedToCheckout = () => {
    if (!isCartEmpty && !hasOutOfStockItem) {
      navigate('/checkout');
    }
  };

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
            <span>
              Promo Discount ({appliedCoupon.code})
            </span>
            <span className="font-medium">-₹{discount.toLocaleString('en-IN')}</span>
          </div>
        )}

        {/* Shipping */}
        <div className="flex items-center justify-between text-luxury-muted">
          <span>Estimated Shipping</span>
          <span className={`font-medium ${shipping === 0 ? 'text-emerald-400 uppercase tracking-widest text-[10px]' : 'text-white'}`}>
            {shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString('en-IN')}`}
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
            <span className="text-[10px] text-luxury-muted font-light">Includes all applicable duties</span>
          </div>
          <span className="font-serif text-2xl sm:text-3xl text-luxury-champagne font-medium">
            ₹{grandTotal.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Stock warning if needed */}
      {hasOutOfStockItem && (
        <div className="p-3 bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 animate-fade-in">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>Please remove out-of-stock items before checkout.</span>
        </div>
      )}

      {/* Proceed to Checkout CTA */}
      <div className="space-y-3 pt-2">
        <button
          type="button"
          onClick={handleProceedToCheckout}
          disabled={isCartEmpty || hasOutOfStockItem}
          className={`btn-shine w-full py-4 font-medium text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2.5 ${
            isCartEmpty || hasOutOfStockItem
              ? 'bg-neutral-800 text-neutral-500 border border-neutral-700 cursor-not-allowed'
              : 'bg-white text-luxury-black hover:bg-luxury-champagne cursor-pointer'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <Link
          to="/shop"
          className="w-full py-3 bg-transparent hover:bg-white/5 text-luxury-cream/80 hover:text-white border border-white/15 text-xs uppercase tracking-widest font-medium flex items-center justify-center transition-colors text-center"
        >
          <span>Continue Shopping</span>
        </Link>
      </div>

      {/* Trust Highlights */}
      <div className="pt-6 border-t border-white/10 space-y-3 text-[11px] text-luxury-muted font-light">
        <div className="flex items-center gap-2.5">
          <Truck className="w-3.5 h-3.5 text-luxury-gold flex-shrink-0" />
          <span>Free insured express shipping on orders over ₹2,000.</span>
        </div>
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-3.5 h-3.5 text-luxury-gold flex-shrink-0" />
          <span>256-bit SSL encrypted secure checkout.</span>
        </div>
        <div className="flex items-center gap-2.5">
          <RotateCcw className="w-3.5 h-3.5 text-luxury-gold flex-shrink-0" />
          <span>14-day complimentary returns and size exchanges.</span>
        </div>
      </div>
    </div>
  );
};
