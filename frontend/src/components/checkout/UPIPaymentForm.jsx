import React, { useState } from 'react';
import { Smartphone, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const UPIPaymentForm = ({
  upiId = '',
  onChange,
  isVerified = false,
  onVerifyChange,
  error = '',
}) => {
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
    <div className="p-5 sm:p-6 bg-white/5 border border-white/10 space-y-4 animate-fade-in text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2 text-luxury-champagne font-medium uppercase tracking-wider">
          <Smartphone className="w-4 h-4 text-luxury-gold" />
          <span>Unified Payments Interface (UPI)</span>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 uppercase tracking-widest">
          Instant QR / VPA
        </span>
      </div>

      <div className="space-y-2">
        <label className="block text-luxury-cream uppercase tracking-widest font-medium">
          Virtual Payment Address (VPA / UPI ID) <span className="text-rose-400">*</span>
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
            className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold text-white px-3.5 py-3 text-xs focus:outline-none placeholder:text-luxury-muted/40 transition-colors"
            aria-label="UPI ID"
          />
          <button
            type="button"
            onClick={handleVerify}
            disabled={isVerifying || isVerified || !upiId.trim()}
            className={`px-5 py-3 text-xs uppercase tracking-wider font-medium transition-all flex items-center gap-1.5 flex-shrink-0 ${
              isVerified
                ? 'bg-emerald-800 text-white cursor-default'
                : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
            }`}
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : isVerified ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Verified</span>
              </>
            ) : (
              <span>Verify UPI</span>
            )}
          </button>
        </div>

        {isVerified && (
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 animate-fade-in pt-1">
            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
            <span>UPI ID verified. Payment prompt will be sent upon placing order.</span>
          </div>
        )}

        {(localError || error) && !isVerified && (
          <div className="flex items-center gap-1.5 text-[11px] text-rose-400 animate-fade-in pt-1">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{localError || error}</span>
          </div>
        )}

        <div className="pt-2 text-[10px] text-luxury-muted leading-relaxed">
          Supports Google Pay, PhonePe, Paytm, BHIM, CRED, and all major Indian banking UPI applications.
        </div>
      </div>
    </div>
  );
};
