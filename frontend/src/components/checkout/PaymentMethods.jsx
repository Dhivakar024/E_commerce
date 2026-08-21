import React from 'react';
import { CreditCard, Smartphone, Banknote } from 'lucide-react';
import { CardPaymentForm } from './CardPaymentForm';
import { UPIPaymentForm } from './UPIPaymentForm';
import { CODPayment } from './CODPayment';

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
    <div className="p-6 sm:p-8 bg-luxury-charcoal/30 border border-white/10 space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h3 className="font-serif text-lg sm:text-xl text-white font-normal">
          4. Payment Method
        </h3>
        <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-medium">
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
                  ? 'bg-white/10 border-luxury-gold ring-1 ring-luxury-gold'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className={`w-5 h-5 ${isSelected ? 'text-luxury-gold' : 'text-luxury-muted'}`} />
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    isSelected ? 'border-luxury-gold bg-luxury-gold' : 'border-white/30'
                  }`}
                >
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-luxury-black" />}
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-white block">
                  {opt.title}
                </span>
                <span className="text-[10px] text-luxury-muted block mt-0.5">
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
