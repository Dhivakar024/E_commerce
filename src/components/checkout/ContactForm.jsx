import React from 'react';
import { Mail, Phone, AlertCircle } from 'lucide-react';

export const ContactForm = ({
  data,
  errors = {},
  onChange,
  onBlur,
}) => {
  return (
    <div className="p-6 sm:p-8 bg-luxury-charcoal/30 border border-white/10 space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h3 className="font-serif text-lg sm:text-xl text-white font-normal">
          1. Contact Information
        </h3>
        <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-medium">
          Step 1 of 4
        </span>
      </div>

      <div className="space-y-4 text-xs">
        {/* Email Field */}
        <div>
          <label className="block text-luxury-cream uppercase tracking-widest mb-1.5 font-medium">
            Email Address <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-luxury-muted" />
            <input
              type="email"
              value={data?.email || ''}
              onChange={(e) => onChange?.('email', e.target.value)}
              onBlur={() => onBlur?.('email')}
              placeholder="client@lax360.com"
              className={`w-full bg-white/5 border ${
                errors.email ? 'border-rose-500/80 focus:border-rose-500' : 'border-white/15 focus:border-luxury-gold'
              } text-white pl-10 pr-4 py-3 text-xs focus:outline-none placeholder:text-luxury-muted/40 transition-colors`}
              aria-label="Email address"
            />
          </div>
          {errors.email && (
            <div className="flex items-center gap-1.5 text-[11px] text-rose-400 mt-1.5 animate-fade-in">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{errors.email}</span>
            </div>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-luxury-cream uppercase tracking-widest mb-1.5 font-medium">
            Mobile Number (India) <span className="text-rose-400">*</span>
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-luxury-champagne font-medium border-r border-white/15 pr-2.5">
              <Phone className="w-3.5 h-3.5 text-luxury-gold" />
              <span>+91</span>
            </div>
            <input
              type="tel"
              maxLength={10}
              value={data?.phone || ''}
              onChange={(e) => {
                const numericOnly = e.target.value.replace(/\D/g, '');
                onChange?.('phone', numericOnly);
              }}
              onBlur={() => onBlur?.('phone')}
              placeholder="9876543210"
              className={`w-full bg-white/5 border ${
                errors.phone ? 'border-rose-500/80 focus:border-rose-500' : 'border-white/15 focus:border-luxury-gold'
              } text-white pl-20 pr-4 py-3 text-xs focus:outline-none placeholder:text-luxury-muted/40 transition-colors`}
              aria-label="Mobile phone number"
            />
          </div>
          {errors.phone ? (
            <div className="flex items-center gap-1.5 text-[11px] text-rose-400 mt-1.5 animate-fade-in">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{errors.phone}</span>
            </div>
          ) : (
            <span className="text-[10px] text-luxury-muted mt-1 block">
              Used for courier dispatch and delivery OTP verification.
            </span>
          )}
        </div>

        {/* Notifications Checkbox */}
        <label className="flex items-start gap-3 cursor-pointer pt-2 select-none">
          <input
            type="checkbox"
            checked={data?.newsletterOptIn || false}
            onChange={(e) => onChange?.('newsletterOptIn', e.target.checked)}
            className="mt-0.5 rounded-none accent-luxury-gold w-4 h-4 bg-white/5 border-white/20 cursor-pointer"
          />
          <span className="text-luxury-cream/80 text-xs leading-relaxed font-light">
            Email me private atelier previews, order milestones, and delivery updates.
          </span>
        </label>
      </div>
    </div>
  );
};
