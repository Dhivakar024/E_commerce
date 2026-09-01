import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const MobileCheckoutBar = ({
  grandTotal = 0,
  items = [],
}) => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  if (items.length === 0) return null;

  const hasOutOfStock = items.some((i) => (i.product?.stock ?? i.stock ?? 99) <= 0);

  return (
    <div
      className={`lg:hidden fixed bottom-0 inset-x-0 border-t px-4 py-3 z-40 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-4 transition-colors duration-250 ${
        isDark
          ? 'bg-[#101820]/95 border-white/15 text-[#F7F3EA]'
          : 'bg-white/95 border-black/15 text-[#101820]'
      }`}
    >
      <div>
        <span className={`text-[10px] uppercase tracking-widest block ${isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}`}>
          Total (Inc. Tax)
        </span>
        <span className="font-serif text-lg font-semibold text-[#C9A45C]">
          ₹{grandTotal.toLocaleString('en-IN')}
        </span>
      </div>

      <button
        type="button"
        onClick={() => !hasOutOfStock && navigate('/checkout')}
        disabled={hasOutOfStock}
        className={`py-3 px-6 text-xs uppercase tracking-widest font-semibold flex items-center gap-2 transition-all shadow-md ${
          hasOutOfStock
            ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
            : isDark
            ? 'bg-[#C9A45C] text-[#101820] hover:bg-[#D8B872] cursor-pointer'
            : 'bg-[#101820] text-white hover:bg-[#C9A45C] hover:text-[#101820] cursor-pointer'
        }`}
      >
        <Lock className="w-3.5 h-3.5" />
        <span>Checkout</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
