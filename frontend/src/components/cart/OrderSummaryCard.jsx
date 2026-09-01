import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Lock, AlertCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useShop } from '../../context/ShopContext';

export const OrderSummaryCard = ({
  items,
  subtotal = 0,
  discount = 0,
  shipping = 0,
  tax = 0,
  grandTotal = 0,
  appliedCoupon = null,
}) => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const shopContext = useShop();

  // Resolve items from prop or ShopContext fallback
  const effectiveItems = items !== undefined ? items : (shopContext?.cart || []);
  const validItems = Array.isArray(effectiveItems)
    ? effectiveItems.filter((item) => item && (item.product || item.name || item.id) && item.quantity > 0)
    : [];

  const isCartEmpty = validItems.length === 0;
  const hasOutOfStockItem = validItems.some((item) => (item.product?.stock ?? item.stock ?? 99) <= 0);

  const handleProceedToCheckout = () => {
    if (!isCartEmpty && !hasOutOfStockItem) {
      navigate('/checkout');
    }
  };

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
            <span>
              Promo Discount ({appliedCoupon.code})
            </span>
            <span>-₹{discount.toLocaleString('en-IN')}</span>
          </div>
        )}

        {/* Shipping */}
        <div
          className={`flex items-center justify-between ${
            isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
          }`}
        >
          <span>Estimated Shipping</span>
          <span
            className={`font-semibold ${
              shipping === 0
                ? 'text-emerald-700 dark:text-emerald-400 uppercase tracking-widest text-[10px]'
                : isDark
                ? 'text-white'
                : 'text-[#101820]'
            }`}
          >
            {shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString('en-IN')}`}
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
              Includes all applicable duties
            </span>
          </div>
          <span className="font-serif text-2xl sm:text-3xl text-[#C9A45C] font-semibold">
            ₹{grandTotal.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Stock warning if needed */}
      {hasOutOfStockItem && (
        <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-500/40 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2 animate-fade-in">
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
          className={`btn-shine w-full py-3.5 font-semibold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2.5 ${
            isCartEmpty || hasOutOfStockItem
              ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 border border-neutral-300 dark:border-neutral-700 cursor-not-allowed'
              : isDark
              ? 'bg-[#C9A45C] text-[#101820] hover:bg-[#D8B872] cursor-pointer'
              : 'bg-[#101820] text-white hover:bg-[#C9A45C] hover:text-[#101820] cursor-pointer'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <Link
          to="/shop"
          className={`w-full py-3 border text-xs uppercase tracking-widest font-semibold flex items-center justify-center transition-colors text-center ${
            isDark
              ? 'bg-transparent hover:bg-white/5 text-[#F7F3EA]/90 hover:text-white border-white/15'
              : 'bg-transparent hover:bg-black/5 text-[#101820] hover:text-black border-black/15'
          }`}
        >
          <span>Continue Shopping</span>
        </Link>
      </div>

      {/* Trust Highlights */}
      <div
        className={`pt-6 border-t space-y-3 text-[11px] font-light ${
          isDark ? 'border-white/10 text-[#A9B0B5]' : 'border-black/10 text-[#55606A]'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <Truck className="w-3.5 h-3.5 text-[#C9A45C] flex-shrink-0" />
          <span>Free insured express shipping on orders over ₹2,000.</span>
        </div>
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C9A45C] flex-shrink-0" />
          <span>256-bit SSL encrypted secure checkout.</span>
        </div>
        <div className="flex items-center gap-2.5">
          <RotateCcw className="w-3.5 h-3.5 text-[#C9A45C] flex-shrink-0" />
          <span>14-day complimentary returns and size exchanges.</span>
        </div>
      </div>
    </div>
  );
};
