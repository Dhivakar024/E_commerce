import React from 'react';
import { Truck, Zap } from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD } from '../../utils/cartCalculations';
import { useTheme } from '../../context/ThemeContext';

export const DeliveryMethods = ({
  selectedMethod,
  subtotal = 0,
  onSelect,
}) => {
  const { isDark } = useTheme();
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
      name: 'Priority Air Express',
      estimate: '1–2 Business Days',
      price: 199,
    },
  ];

  return (
    <div
      className={`p-6 sm:p-8 border space-y-6 transition-colors duration-250 ${
        isDark
          ? 'bg-[#1B2630]/60 border-white/10 text-[#F7F3EA]'
          : 'bg-white border-black/10 text-[#101820] shadow-sm'
      }`}
    >
      <div className={`flex items-center justify-between border-b pb-4 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <h3 className={`font-serif text-lg sm:text-xl font-normal ${isDark ? 'text-white' : 'text-[#101820]'}`}>
          3. Delivery Method
        </h3>
        <span className="text-[10px] uppercase tracking-widest text-[#C9A45C] font-semibold">
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
                  ? isDark
                    ? 'bg-white/10 border-[#C9A45C] ring-1 ring-[#C9A45C]'
                    : 'bg-[#C9A45C]/10 border-[#C9A45C] ring-1 ring-[#C9A45C]'
                  : isDark
                  ? 'bg-white/5 border-white/10 hover:border-white/20'
                  : 'bg-neutral-50 border-black/10 hover:border-black/20'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    isSelected
                      ? 'border-[#C9A45C] bg-[#C9A45C]'
                      : isDark
                      ? 'border-white/30'
                      : 'border-black/30'
                  }`}
                >
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-[#101820]" />}
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    {method.id === 'express' ? (
                      <Zap className="w-3.5 h-3.5 text-[#C9A45C]" />
                    ) : (
                      <Truck className="w-3.5 h-3.5 text-[#C9A45C]" />
                    )}
                    <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#101820]'}`}>
                      {method.name}
                    </span>
                  </div>
                  <span className={`text-[11px] block ${isDark ? 'text-[#A9B0B5]' : 'text-[#55606A]'}`}>
                    Estimated Transit: {method.estimate}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-serif text-sm text-[#C9A45C] font-semibold block">
                  {method.price === 0 ? 'FREE' : `₹${method.price.toLocaleString('en-IN')}`}
                </span>
                {method.price === 0 && (
                  <span className="text-[9px] text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block font-medium">
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
