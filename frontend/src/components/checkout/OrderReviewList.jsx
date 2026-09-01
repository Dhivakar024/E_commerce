import React from 'react';
import { Link } from 'react-router-dom';
import { Edit2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const OrderReviewList = ({ items = [] }) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`p-6 sm:p-8 border space-y-6 transition-colors duration-250 ${
        isDark
          ? 'bg-[#1B2630]/60 border-white/10 text-[#F7F3EA]'
          : 'bg-white border-black/10 text-[#101820] shadow-sm'
      }`}
    >
      <div className={`flex items-center justify-between border-b pb-4 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <div>
          <h3 className={`font-serif text-lg sm:text-xl font-normal ${isDark ? 'text-white' : 'text-[#101820]'}`}>
            Order Review
          </h3>
          <span className={`text-xs font-light ${isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}`}>
            {items.reduce((acc, i) => acc + i.quantity, 0)} items in your shipment
          </span>
        </div>

        <Link
          to="/cart"
          className={`text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 transition-colors border px-3 py-1.5 ${
            isDark
              ? 'text-[#C9A45C] hover:text-white border-white/15 bg-white/5 hover:bg-white/10'
              : 'text-[#101820] hover:text-[#C9A45C] border-black/15 bg-black/5 hover:bg-black/10'
          }`}
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>Edit Cart</span>
        </Link>
      </div>

      <div className={`divide-y max-h-80 overflow-y-auto pr-1 ${isDark ? 'divide-white/5' : 'divide-black/5'}`}>
        {items.map((item, idx) => {
          const price = item.product?.price ?? item.price ?? 0;
          const itemTotal = price * item.quantity;
          return (
            <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <img
                  src={item.product?.image || item.image}
                  alt={item.product?.name || item.name}
                  className={`w-14 h-16 object-cover border flex-shrink-0 ${
                    isDark ? 'bg-neutral-900 border-white/10' : 'bg-neutral-100 border-black/10'
                  }`}
                />
                <div className="min-w-0 space-y-0.5">
                  <span className="text-[10px] uppercase tracking-widest text-[#C9A45C] block font-semibold">
                    {item.product?.category}
                  </span>
                  <span className={`font-serif text-xs sm:text-sm font-semibold truncate block ${isDark ? 'text-white' : 'text-[#101820]'}`}>
                    {item.product?.name || item.name}
                  </span>
                  <div className={`text-[11px] flex items-center gap-2 ${isDark ? 'text-[#A9B0B5]' : 'text-[#55606A]'}`}>
                    <span>Size: <strong className={isDark ? 'text-white' : 'text-[#101820]'}>{item.selectedSize}</strong></span>
                    <span>•</span>
                    <span>Color: <strong className={isDark ? 'text-white' : 'text-[#101820]'}>{item.selectedColor}</strong></span>
                  </div>
                  <span className="text-[11px] text-[#C9A45C] sm:hidden block font-semibold">
                    Qty {item.quantity} • ₹{itemTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="hidden sm:block text-right flex-shrink-0">
                <span className={`font-serif text-sm font-semibold block ${isDark ? 'text-white' : 'text-[#101820]'}`}>
                  ₹{itemTotal.toLocaleString('en-IN')}
                </span>
                <span className={`text-[10px] block ${isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}`}>
                  Qty: {item.quantity} × ₹{price.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
