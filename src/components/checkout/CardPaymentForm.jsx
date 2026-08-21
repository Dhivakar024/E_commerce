import React from 'react';
import { CreditCard, Lock, AlertCircle } from 'lucide-react';

export const CardPaymentForm = ({
  data,
  errors = {},
  onChange,
  onBlur,
}) => {
  const formatCardNumber = (val) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    return raw.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiry = (val) => {
    const raw = val.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      return `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    return raw;
  };

  return (
    <div className="p-5 sm:p-6 bg-white/5 border border-white/10 space-y-4 animate-fade-in text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2 text-luxury-champagne font-medium uppercase tracking-wider">
          <CreditCard className="w-4 h-4 text-luxury-gold" />
          <span>Card Details</span>
        </div>
        <span className="text-[10px] text-luxury-gold uppercase tracking-widest bg-luxury-gold/10 px-2 py-0.5 border border-luxury-gold/20">
          Demo Secure Gateway
        </span>
      </div>

      {/* Card Number */}
      <div>
        <label className="block text-luxury-cream uppercase tracking-widest mb-1.5 font-medium">
          Card Number <span className="text-rose-400">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            maxLength={19}
            value={data.cardNumber || ''}
            onChange={(e) => onChange?.('cardNumber', formatCardNumber(e.target.value))}
            onBlur={() => onBlur?.('cardNumber')}
            placeholder="4111 2222 3333 4444"
            className={`w-full bg-white/5 border ${
              errors.cardNumber ? 'border-rose-500/80 focus:border-rose-500' : 'border-white/15 focus:border-luxury-gold'
            } text-white px-3.5 py-3 text-xs font-mono tracking-wider focus:outline-none placeholder:text-luxury-muted/40 transition-colors`}
            aria-label="16 digit card number"
          />
          <CreditCard className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-luxury-muted pointer-events-none" />
        </div>
        {errors.cardNumber && (
          <div className="flex items-center gap-1 text-[11px] text-rose-400 mt-1">
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            <span>{errors.cardNumber}</span>
          </div>
        )}
      </div>

      {/* Name on Card */}
      <div>
        <label className="block text-luxury-cream uppercase tracking-widest mb-1.5 font-medium">
          Name on Card <span className="text-rose-400">*</span>
        </label>
        <input
          type="text"
          value={data.nameOnCard || ''}
          onChange={(e) => onChange?.('nameOnCard', e.target.value)}
          onBlur={() => onBlur?.('nameOnCard')}
          placeholder="e.g. Arjun Kapoor"
          className={`w-full bg-white/5 border ${
            errors.nameOnCard ? 'border-rose-500/80 focus:border-rose-500' : 'border-white/15 focus:border-luxury-gold'
          } text-white px-3.5 py-3 text-xs uppercase tracking-wider focus:outline-none placeholder:text-luxury-muted/40 transition-colors`}
          aria-label="Cardholder full name"
        />
        {errors.nameOnCard && (
          <div className="flex items-center gap-1 text-[11px] text-rose-400 mt-1">
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            <span>{errors.nameOnCard}</span>
          </div>
        )}
      </div>

      {/* Expiry & CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-luxury-cream uppercase tracking-widest mb-1.5 font-medium">
            Expiry Date <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            maxLength={5}
            value={data.expiry || ''}
            onChange={(e) => onChange?.('expiry', formatExpiry(e.target.value))}
            onBlur={() => onBlur?.('expiry')}
            placeholder="MM/YY"
            className={`w-full bg-white/5 border ${
              errors.expiry ? 'border-rose-500/80 focus:border-rose-500' : 'border-white/15 focus:border-luxury-gold'
            } text-white px-3.5 py-3 text-xs font-mono text-center focus:outline-none placeholder:text-luxury-muted/40 transition-colors`}
            aria-label="Card expiration date MM/YY"
          />
          {errors.expiry && (
            <div className="flex items-center gap-1 text-[11px] text-rose-400 mt-1">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{errors.expiry}</span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-luxury-cream uppercase tracking-widest mb-1.5 font-medium">
            CVV / CVC <span className="text-rose-400">*</span>
          </label>
          <input
            type="password"
            maxLength={4}
            value={data.cvv || ''}
            onChange={(e) => onChange?.('cvv', e.target.value.replace(/\D/g, ''))}
            onBlur={() => onBlur?.('cvv')}
            placeholder="•••"
            className={`w-full bg-white/5 border ${
              errors.cvv ? 'border-rose-500/80 focus:border-rose-500' : 'border-white/15 focus:border-luxury-gold'
            } text-white px-3.5 py-3 text-xs font-mono text-center tracking-widest focus:outline-none placeholder:text-luxury-muted/40 transition-colors`}
            aria-label="3 or 4 digit CVV code"
          />
          {errors.cvv && (
            <div className="flex items-center gap-1 text-[11px] text-rose-400 mt-1">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{errors.cvv}</span>
            </div>
          )}
        </div>
      </div>

      {/* Security Statement */}
      <div className="pt-2 flex items-center gap-2 text-[11px] text-luxury-muted border-t border-white/10">
        <Lock className="w-3.5 h-3.5 text-luxury-gold flex-shrink-0" />
        <span>Your payment details are securely processed by our payment provider.</span>
      </div>
    </div>
  );
};
