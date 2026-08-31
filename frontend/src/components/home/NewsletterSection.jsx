import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useTheme } from '../../context/ThemeContext';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.15 });
  const { isDark } = useTheme();

  const validateEmail = (val) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your email.');
      return;
    }

    if (!validateEmail(email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('success');
    setErrorMessage('');
    setEmail('');
  };

  return (
    <section
      ref={sectionRef}
      className={`py-8 sm:py-12 relative z-10 overflow-hidden transition-colors duration-250 border-t ${
        isDark ? 'bg-[#151F28] border-white/[0.08]' : 'bg-[#EDE9DF] border-black/[0.08]'
      }`}
    >
      {/* Floating decorative elements */}
      <div className="absolute top-8 right-1/4 w-32 h-32 bg-[#C9A45C]/5 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute bottom-6 left-1/4 w-32 h-32 bg-[#C9A45C]/5 rounded-full blur-3xl pointer-events-none animate-float-reverse" />

      {/* Compact Editorial-Style Centered Card Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex justify-center">
        <div
          className={`w-full max-w-xl sm:max-w-2xl px-6 py-8 sm:px-10 sm:py-10 text-center rounded-none border shadow-xl transition-all duration-700 ease-out relative ${
            isDark
              ? 'bg-[#1B2630] border-[#C9A45C]/45 shadow-[0_12px_32px_rgba(0,0,0,0.4),0_0_16px_rgba(201,164,92,0.12)] text-white'
              : 'bg-white border-[#C9A45C]/60 shadow-[0_12px_32px_rgba(16,24,32,0.08),0_0_0_1px_rgba(201,164,92,0.15)] text-[#101820]'
          }`}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          {/* Top Label */}
          <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-2.5 font-semibold">
            MARKETPLACE DISPATCH
          </span>

          {/* Heading */}
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal mb-3 leading-tight">
            Stay in the Loop
          </h2>

          {/* Subtitle */}
          <p className={`text-xs sm:text-sm font-light max-w-md mx-auto mb-8 leading-relaxed ${
            isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
          }`}>
            Get updates on new products, exclusive offers and marketplace deals.
          </p>

          {status === 'success' ? (
            <div className="inline-flex items-center gap-3 px-5 py-3.5 bg-[#C9A45C]/10 border border-[#C9A45C]/40 text-xs sm:text-sm tracking-wide animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-[#C9A45C] flex-shrink-0" />
              <span>Thank you for subscribing! You will receive our latest marketplace deals.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto" noValidate>
              <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                <div className="relative flex-grow">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A9B0B5]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="Enter your email"
                    className={`w-full border text-xs sm:text-sm pl-10 pr-4 py-3 focus:outline-none transition-colors ${
                      status === 'error'
                        ? 'border-rose-500 focus:border-rose-400'
                        : 'border-white/15 focus:border-[#C9A45C]'
                    } ${
                      isDark
                        ? 'bg-[#101820] text-white placeholder:text-[#A9B0B5]/60'
                        : 'bg-[#F8F6F0] text-[#101820] placeholder:text-[#4A5560]/60'
                    }`}
                    aria-label="Email address for newsletter"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-shine px-7 py-3 bg-[#C9A45C] hover:bg-[#D8B872] text-[#101820] font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-center cursor-pointer flex-shrink-0 active:scale-95"
                >
                  SUBSCRIBE
                </button>
              </div>

              {status === 'error' && (
                <div className="flex items-center justify-center gap-1.5 mt-2.5 text-xs text-rose-400 animate-fade-in">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>
          )}

          <p className={`text-[10px] mt-4 tracking-wider ${
            isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
          }`}>
            We respect your inbox. Unsubscribe anytime with one click.
          </p>
        </div>
      </div>
    </section>
  );
};
