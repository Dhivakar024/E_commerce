import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';

export const MobileCheckoutBar = ({
  grandTotal = 0,
  items = [],
}) => {
  const navigate = useNavigate();

  if (items.length === 0) return null;

  const hasOutOfStock = items.some((i) => (i.product?.stock ?? i.stock ?? 99) <= 0);

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 bg-luxury-black/95 border-t border-white/15 px-4 py-3 z-40 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-4">
      <div>
        <span className="text-[10px] uppercase tracking-widest text-luxury-muted block">
          Total (Inc. Tax)
        </span>
        <span className="font-serif text-lg font-medium text-luxury-champagne">
          ₹{grandTotal.toLocaleString('en-IN')}
        </span>
      </div>

      <button
        type="button"
        onClick={() => !hasOutOfStock && navigate('/checkout')}
        disabled={hasOutOfStock}
        className={`py-3 px-6 text-xs uppercase tracking-widest font-medium flex items-center gap-2 transition-all shadow-xl ${
          hasOutOfStock
            ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
            : 'bg-white text-luxury-black hover:bg-luxury-champagne cursor-pointer'
        }`}
      >
        <Lock className="w-3.5 h-3.5" />
        <span>Checkout</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
