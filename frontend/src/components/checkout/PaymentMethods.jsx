import React from 'react';
import { CreditCard, Smartphone, Banknote } from 'lucide-react';
import { CardPaymentForm } from './CardPaymentForm';
import { UPIPaymentForm } from './UPIPaymentForm';
import { CODPayment } from './CODPayment';
import { useTheme } from '../../context/ThemeContext';

export const PaymentMethods = ({
  selectedMethod,
  onSelectMethod,
  cardData,
  cardErrors,
  onCardChange,
  onCardBlur,
  upiId,
  onUPIChange,
  isUPIVerified,
  onUPIVerifyChange,
  upiError,
}) => {
  const { isDark } = useTheme();

  const options = [
    {
      id: 'card',
      title: 'Credit / Debit Card',
      subtitle: 'Visa, Mastercard, RuPay, Amex',
      icon: CreditCard,
    },
    {
      id: 'upi',
      title: 'UPI / QR Code',
      subtitle: 'Google Pay, PhonePe, Paytm, BHIM',
      icon: Smartphone,
    },
    {
      id: 'cod',
      title: 'Cash on Delivery',
      subtitle: 'Pay at your doorstep',
      icon: Banknote,
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
          4. Payment Method
        </h3>
        <span className="text-[10px] uppercase tracking-widest text-[#C9A45C] font-semibold">
          Step 4 of 4
        </span>
      </div>

      {/* Payment Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {options.map((opt) => {
          const isSelected = selectedMethod === opt.id;
          const Icon = opt.icon;

          return (
            <label
              key={opt.id}
              onClick={() => onSelectMethod?.(opt.id)}
              className={`p-4 flex flex-col justify-between border cursor-pointer transition-all ${
                isSelected
                  ? isDark
                    ? 'bg-white/10 border-[#C9A45C] ring-1 ring-[#C9A45C]'
                    : 'bg-[#C9A45C]/10 border-[#C9A45C] ring-1 ring-[#C9A45C]'
                  : isDark
                  ? 'bg-white/5 border-white/10 hover:border-white/20'
                  : 'bg-neutral-50 border-black/10 hover:border-black/20'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className={`w-5 h-5 ${isSelected ? 'text-[#C9A45C]' : isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}`} />
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    isSelected ? 'border-[#C9A45C] bg-[#C9A45C]' : isDark ? 'border-white/30' : 'border-black/30'
                  }`}
                >
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-[#101820]" />}
                </div>
              </div>

              <div>
                <span className={`text-xs font-semibold block ${isDark ? 'text-white' : 'text-[#101820]'}`}>
                  {opt.title}
                </span>
                <span className={`text-[10px] block mt-0.5 ${isDark ? 'text-[#A9B0B5]' : 'text-[#55606A]'}`}>
                  {opt.subtitle}
                </span>
              </div>
            </label>
          );
        })}
      </div>

      {/* Selected Payment Form Subview */}
      <div>
        {selectedMethod === 'card' && (
          <CardPaymentForm
            data={cardData}
            errors={cardErrors}
            onChange={onCardChange}
            onBlur={onCardBlur}
          />
        )}

        {selectedMethod === 'upi' && (
          <UPIPaymentForm
            upiId={upiId}
            onChange={onUPIChange}
            isVerified={isUPIVerified}
            onVerifyChange={onUPIVerifyChange}
            error={upiError}
          />
        )}

        {selectedMethod === 'cod' && <CODPayment />}
      </div>
    </div>
  );
};
