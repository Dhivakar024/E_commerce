import React from 'react';
import { CreditCard, Lock, AlertCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const CardPaymentForm = ({
  data,
  errors = {},
  onChange,
  onBlur,
}) => {
  const { isDark } = useTheme();

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
    <div
      className={`p-5 sm:p-6 border space-y-4 animate-fade-in text-xs ${
        isDark ? 'bg-white/5 border-white/10' : 'bg-neutral-50 border-black/10'
      }`}
    >
      <div className={`flex items-center justify-between pb-3 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <div className="flex items-center gap-2 text-[#C9A45C] font-semibold uppercase tracking-wider">
          <CreditCard className="w-4 h-4 text-[#C9A45C]" />
          <span>Card Details</span>
        </div>
        <span className="text-[10px] text-[#C9A45C] uppercase tracking-widest bg-[#C9A45C]/10 px-2 py-0.5 border border-[#C9A45C]/30 font-medium">
          Demo Secure Gateway
        </span>
      </div>

      {/* Card Number */}
      <div>
        <label className={`block uppercase tracking-widest mb-1.5 font-medium ${isDark ? 'text-[#F7F3EA]' : 'text-[#101820]'}`}>
          Card Number <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            maxLength={19}
            value={data.cardNumber || ''}
            onChange={(e) => onChange?.('cardNumber', formatCardNumber(e.target.value))}
            onBlur={() => onBlur?.('cardNumber')}
            placeholder="4111 2222 3333 4444"
            className={`w-full border ${
              errors.cardNumber
                ? 'border-rose-500/80 focus:border-rose-500'
                : isDark
                ? 'border-white/15 focus:border-[#C9A45C] bg-white/5 text-white placeholder:text-[#A9B0B5]/40'
                : 'border-black/15 focus:border-[#C9A45C] bg-white text-[#101820] placeholder:text-[#717D86]/60'
            } px-3.5 py-3 text-xs font-mono tracking-wider focus:outline-none transition-colors`}
            aria-label="16 digit card number"
          />
          <CreditCard className={`w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 ${isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'} pointer-events-none`} />
        </div>
        {errors.cardNumber && (
          <div className="flex items-center gap-1 text-[11px] text-rose-600 dark:text-rose-400 mt-1">
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            <span>{errors.cardNumber}</span>
          </div>
        )}
      </div>

      {/* Name on Card */}
      <div>
        <label className={`block uppercase tracking-widest mb-1.5 font-medium ${isDark ? 'text-[#F7F3EA]' : 'text-[#101820]'}`}>
          Name on Card <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          value={data.nameOnCard || ''}
          onChange={(e) => onChange?.('nameOnCard', e.target.value)}
          onBlur={() => onBlur?.('nameOnCard')}
          placeholder="e.g. Arjun Kapoor"
          className={`w-full border ${
            errors.nameOnCard
              ? 'border-rose-500/80 focus:border-rose-500'
              : isDark
              ? 'border-white/15 focus:border-[#C9A45C] bg-white/5 text-white placeholder:text-[#A9B0B5]/40'
              : 'border-black/15 focus:border-[#C9A45C] bg-white text-[#101820] placeholder:text-[#717D86]/60'
          } px-3.5 py-3 text-xs uppercase tracking-wider focus:outline-none transition-colors`}
          aria-label="Cardholder full name"
        />
        {errors.nameOnCard && (
          <div className="flex items-center gap-1 text-[11px] text-rose-600 dark:text-rose-400 mt-1">
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            <span>{errors.nameOnCard}</span>
          </div>
        )}
      </div>

      {/* Expiry & CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={`block uppercase tracking-widest mb-1.5 font-medium ${isDark ? 'text-[#F7F3EA]' : 'text-[#101820]'}`}>
            Expiry Date <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            maxLength={5}
            value={data.expiry || ''}
            onChange={(e) => onChange?.('expiry', formatExpiry(e.target.value))}
            onBlur={() => onBlur?.('expiry')}
            placeholder="MM/YY"
            className={`w-full border ${
              errors.expiry
                ? 'border-rose-500/80 focus:border-rose-500'
                : isDark
                ? 'border-white/15 focus:border-[#C9A45C] bg-white/5 text-white placeholder:text-[#A9B0B5]/40'
                : 'border-black/15 focus:border-[#C9A45C] bg-white text-[#101820] placeholder:text-[#717D86]/60'
            } px-3.5 py-3 text-xs font-mono tracking-wider focus:outline-none transition-colors`}
            aria-label="Card expiry MM/YY"
          />
          {errors.expiry && (
            <div className="flex items-center gap-1 text-[11px] text-rose-600 dark:text-rose-400 mt-1">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{errors.expiry}</span>
            </div>
          )}
        </div>

        <div>
          <label className={`block uppercase tracking-widest mb-1.5 font-medium ${isDark ? 'text-[#F7F3EA]' : 'text-[#101820]'}`}>
            CVV / CVC <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="password"
              maxLength={4}
              value={data.cvv || ''}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, '').slice(0, 4);
                onChange?.('cvv', digits);
              }}
              onBlur={() => onBlur?.('cvv')}
              placeholder="123"
              className={`w-full border ${
                errors.cvv
                  ? 'border-rose-500/80 focus:border-rose-500'
                  : isDark
                  ? 'border-white/15 focus:border-[#C9A45C] bg-white/5 text-white placeholder:text-[#A9B0B5]/40'
                  : 'border-black/15 focus:border-[#C9A45C] bg-white text-[#101820] placeholder:text-[#717D86]/60'
              } px-3.5 py-3 text-xs font-mono tracking-widest focus:outline-none transition-colors`}
              aria-label="3 or 4 digit CVV code"
            />
            <Lock className={`w-3.5 h-3.5 absolute right-3.5 top-1/2 -translate-y-1/2 ${isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'} pointer-events-none`} />
          </div>
          {errors.cvv && (
            <div className="flex items-center gap-1 text-[11px] text-rose-600 dark:text-rose-400 mt-1">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{errors.cvv}</span>
            </div>
          )}
        </div>
      </div>

      {/* Security Statement */}
      <div className={`pt-2 flex items-center gap-2 text-[11px] border-t ${isDark ? 'border-white/10 text-[#A9B0B5]' : 'border-black/10 text-[#717D86]'}`}>
        <Lock className={`w-3.5 h-3.5 flex-shrink-0 ${isDark ? 'text-[#C9A45C]' : 'text-[#C9A45C]'}`} />
        <span>Your payment details are securely processed by our payment provider.</span>
      </div>
    </div>
  );
};
