import React from 'react';
import { Mail, Phone, AlertCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ContactForm = ({
  data,
  errors = {},
  onChange,
  onBlur,
}) => {
  const { isDark } = useTheme();

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
          1. Contact Information
        </h3>
        <span className="text-[10px] uppercase tracking-widest text-[#C9A45C] font-semibold">
          Step 1 of 4
        </span>
      </div>

      <div className="space-y-4 text-xs">
        {/* Email Field */}
        <div>
          <label className={`block uppercase tracking-widest mb-1.5 font-medium ${isDark ? 'text-[#F7F3EA]' : 'text-[#101820]'}`}>
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}`} />
            <input
              type="email"
              value={data?.email || ''}
              onChange={(e) => onChange?.('email', e.target.value)}
              onBlur={() => onBlur?.('email')}
              placeholder="client@lax360.com"
              className={`w-full border ${
                errors.email
                  ? 'border-rose-500/80 focus:border-rose-500'
                  : isDark
                  ? 'border-white/15 focus:border-[#C9A45C] bg-white/5 text-white placeholder:text-[#A9B0B5]/40'
                  : 'border-black/15 focus:border-[#C9A45C] bg-neutral-50 text-[#101820] placeholder:text-[#717D86]/60'
              } pl-10 pr-4 py-3 text-xs focus:outline-none transition-colors`}
              aria-label="Email address"
            />
          </div>
          {errors.email && (
            <div className="flex items-center gap-1.5 text-[11px] text-rose-600 dark:text-rose-400 mt-1.5 animate-fade-in">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{errors.email}</span>
            </div>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label className={`block uppercase tracking-widest mb-1.5 font-medium ${isDark ? 'text-[#F7F3EA]' : 'text-[#101820]'}`}>
            Mobile Number (India) <span className="text-rose-500">*</span>
          </label>
          <div className="relative flex items-center">
            <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 font-medium border-r pr-2.5 ${
              isDark ? 'text-[#C9A45C] border-white/15' : 'text-[#B08B43] border-black/15'
            }`}>
              <Phone className="w-3.5 h-3.5 text-[#C9A45C]" />
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
              className={`w-full border ${
                errors.phone
                  ? 'border-rose-500/80 focus:border-rose-500'
                  : isDark
                  ? 'border-white/15 focus:border-[#C9A45C] bg-white/5 text-white placeholder:text-[#A9B0B5]/40'
                  : 'border-black/15 focus:border-[#C9A45C] bg-neutral-50 text-[#101820] placeholder:text-[#717D86]/60'
              } pl-20 pr-4 py-3 text-xs focus:outline-none transition-colors`}
              aria-label="Mobile phone number"
            />
          </div>
          {errors.phone ? (
            <div className="flex items-center gap-1.5 text-[11px] text-rose-600 dark:text-rose-400 mt-1.5 animate-fade-in">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{errors.phone}</span>
            </div>
          ) : (
            <span className={`text-[10px] mt-1 block ${isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}`}>
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
            className="mt-0.5 rounded-none accent-[#C9A45C] w-4 h-4 cursor-pointer"
          />
          <span className={`text-xs leading-relaxed font-light ${isDark ? 'text-[#F7F3EA]/80' : 'text-[#4A5560]'}`}>
            Email me exclusive offers, order milestones, and marketplace delivery updates.
          </span>
        </label>
      </div>
    </div>
  );
};
