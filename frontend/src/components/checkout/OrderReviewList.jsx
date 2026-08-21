import React from 'react';
import { Link } from 'react-router-dom';
import { Edit2 } from 'lucide-react';

export const OrderReviewList = ({ items = [] }) => {
  return (
    <div className="p-6 sm:p-8 bg-luxury-charcoal/30 border border-white/10 space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h3 className="font-serif text-lg sm:text-xl text-white font-normal">
            Order Review
          </h3>
          <span className="text-xs text-luxury-muted font-light">
            {items.reduce((acc, i) => acc + i.quantity, 0)} items in your shipment
          </span>
        </div>

        <Link
          to="/cart"
          className="text-xs uppercase tracking-widest text-luxury-champagne hover:text-white flex items-center gap-1.5 transition-colors border border-white/15 px-3 py-1.5 bg-white/5 hover:bg-white/10"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>Edit Cart</span>
        </Link>
      </div>

      <div className="divide-y divide-white/5 max-h-80 overflow-y-auto pr-1">
        {items.map((item, idx) => {
          const price = item.product?.price ?? item.price ?? 0;
          const itemTotal = price * item.quantity;
          return (
            <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <img
                  src={item.product?.image || item.image}
                  alt={item.product?.name || item.name}
                  className="w-14 h-16 object-cover bg-neutral-900 border border-white/10 flex-shrink-0"
                />
                <div className="min-w-0 space-y-0.5">
                  <span className="text-[10px] uppercase tracking-widest text-luxury-gold block">
                    {item.product?.category}
                  </span>
                  <span className="font-serif text-xs sm:text-sm text-white font-medium truncate block">
                    {item.product?.name || item.name}
                  </span>
                  <div className="text-[11px] text-luxury-muted flex items-center gap-2">
                    <span>Size: <strong className="text-white font-normal">{item.selectedSize}</strong></span>
                    <span>•</span>
                    <span>Color: <strong className="text-white font-normal">{item.selectedColor}</strong></span>
                  </div>
                  <span className="text-[11px] text-luxury-champagne sm:hidden block">
                    Qty {item.quantity} • ₹{itemTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="hidden sm:block text-right flex-shrink-0">
                <span className="font-serif text-sm text-white font-medium block">
                  ₹{itemTotal.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-luxury-muted block">
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
