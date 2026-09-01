import React, { useState } from 'react';
import { Smartphone, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const UPIPaymentForm = ({
  upiId = '',
  onChange,
  isVerified = false,
  onVerifyChange,
  error = '',
}) => {
  const { isDark } = useTheme();
  const [isVerifying, setIsVerifying] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleVerify = () => {
    const clean = upiId.trim();
    if (!clean || !clean.includes('@') || clean.length < 5) {
      setLocalError('Please enter a valid UPI ID (e.g. user@okhdfcbank).');
      onVerifyChange?.(false);
      return;
    }

    setLocalError('');
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      onVerifyChange?.(true);
    }, 1000);
  };

  return (
    <div
      className={`p-5 sm:p-6 border space-y-4 animate-fade-in text-xs ${
        isDark ? 'bg-white/5 border-white/10' : 'bg-neutral-50 border-black/10'
      }`}
    >
      <div className={`flex items-center justify-between pb-3 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <div className="flex items-center gap-2 text-[#C9A45C] font-semibold uppercase tracking-wider">
          <Smartphone className="w-4 h-4 text-[#C9A45C]" />
          <span>Unified Payments Interface (UPI)</span>
        </div>
        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/20 px-2 py-0.5 uppercase tracking-widest font-medium">
          Instant QR / VPA
        </span>
      </div>

      <div className="space-y-2">
        <label className={`block uppercase tracking-widest font-medium ${isDark ? 'text-[#F7F3EA]' : 'text-[#101820]'}`}>
          Virtual Payment Address (VPA / UPI ID) <span className="text-rose-500">*</span>
        </label>
        <div className="flex items-stretch gap-2">
          <input
            type="text"
            value={upiId}
            onChange={(e) => {
              onChange?.(e.target.value);
              onVerifyChange?.(false);
              setLocalError('');
            }}
            placeholder="e.g. yourname@okaxis, 9876543210@paytm"
            className={`w-full border px-3.5 py-3 text-xs focus:outline-none transition-colors ${
              isDark
                ? 'bg-white/5 border-white/15 focus:border-[#C9A45C] text-white placeholder:text-[#A9B0B5]/40'
                : 'bg-white border-black/15 focus:border-[#C9A45C] text-[#101820] placeholder:text-[#717D86]/60'
            }`}
            aria-label="UPI ID"
          />
          <button
            type="button"
            onClick={handleVerify}
            disabled={isVerifying || isVerified || !upiId.trim()}
            className={`px-5 py-3 text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
              isVerified
                ? 'bg-emerald-600 text-white cursor-default'
                : isDark
                ? 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
                : 'bg-black/5 hover:bg-black/10 text-[#101820] border border-black/15'
            }`}
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : isVerified ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>Verified</span>
              </>
            ) : (
              <span>Verify UPI</span>
            )}
          </button>
        </div>

        {isVerified && (
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 animate-fade-in pt-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
            <span>UPI ID verified. Payment prompt will be sent upon placing order.</span>
          </div>
        )}

        {(localError || error) && !isVerified && (
          <div className="flex items-center gap-1.5 text-[11px] text-rose-600 dark:text-rose-400 animate-fade-in pt-1">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{localError || error}</span>
          </div>
        )}

        <div className={`pt-2 text-[10px] leading-relaxed ${isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}`}>
          <span>Popular UPI Apps supported: GPay, PhonePe, Paytm, Amazon Pay, BHIM, and all major Indian banking VPAs.</span>
        </div>
      </div>
    </div>
  );
};
