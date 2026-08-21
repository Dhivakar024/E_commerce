import React from 'react';
import { Truck, Zap } from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD } from '../../utils/cartCalculations';

export const DeliveryMethods = ({
  selectedMethod,
  subtotal = 0,
  onSelect,
}) => {
  const isFreeStandard = subtotal >= FREE_SHIPPING_THRESHOLD;
  const standardPrice = isFreeStandard ? 0 : 99;

  const methods = [
    {
      id: 'standard',
      name: 'Standard Insured Delivery',
      estimate: '3–5 Business Days',
      price: standardPrice,
    },
    {
      id: 'express',
      name: 'Priority Atelier Express',
      estimate: '1–2 Business Days',
      price: 199,
    },
  ];

  return (
    <div className="p-6 sm:p-8 bg-luxury-charcoal/30 border border-white/10 space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h3 className="font-serif text-lg sm:text-xl text-white font-normal">
          3. Delivery Method
        </h3>
        <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-medium">
          Step 3 of 4
        </span>
      </div>

      <div className="space-y-3.5">
        {methods.map((method) => {
          const isSelected = selectedMethod?.id === method.id;

          return (
            <label
              key={method.id}
              onClick={() => onSelect?.(method)}
              className={`p-4 sm:p-5 flex items-center justify-between border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-white/10 border-luxury-gold ring-1 ring-luxury-gold'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    isSelected ? 'border-luxury-gold bg-luxury-gold' : 'border-white/30'
                  }`}
                >
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-luxury-black" />}
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    {method.id === 'express' ? (
                      <Zap className="w-3.5 h-3.5 text-luxury-gold" />
                    ) : (
                      <Truck className="w-3.5 h-3.5 text-luxury-gold" />
                    )}
                    <span className="text-xs font-medium text-white uppercase tracking-wider">
                      {method.name}
                    </span>
                  </div>
                  <span className="text-[11px] text-luxury-muted block">
                    Estimated Transit: {method.estimate}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-serif text-sm text-luxury-champagne font-medium block">
                  {method.price === 0 ? 'FREE' : `₹${method.price.toLocaleString('en-IN')}`}
                </span>
                {method.price === 0 && (
                  <span className="text-[9px] text-emerald-400 uppercase tracking-widest block">
                    Complimentary
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};
