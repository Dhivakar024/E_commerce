import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.15 });

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
      className="py-24 sm:py-32 bg-[#101820] relative z-10 overflow-hidden"
    >
      {/* Floating decorative elements */}
      <div className="absolute top-10 right-1/4 w-36 h-36 bg-[#C9A45C]/5 rounded-full blur-3xl pointer-events-none animate-float-slow" />

      <div
        className="max-w-3xl mx-auto px-6 sm:px-8 text-center transition-all duration-700 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        }}
      >
        <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block mb-3 font-semibold">
          MARKETPLACE DISPATCH
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-4">
          Stay in the Loop
        </h2>
        <p className="text-xs sm:text-sm text-[#A9B0B5] font-light max-w-md mx-auto mb-10 leading-relaxed">
          Get updates on new products, exclusive offers and marketplace deals.
        </p>

        {status === 'success' ? (
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-white/5 border border-[#C9A45C]/40 text-[#F7F3EA] text-xs sm:text-sm tracking-wide animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-[#C9A45C] flex-shrink-0" />
            <span>Thank you for subscribing! You will receive our latest marketplace deals.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto" noValidate>
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              <div className="relative flex-grow">
                <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#A9B0B5]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Enter your email"
                  className={`w-full bg-[#1B2630] border text-xs sm:text-sm text-white placeholder:text-[#A9B0B5]/60 pl-11 pr-4 py-3.5 focus:outline-none transition-colors ${
                    status === 'error'
                      ? 'border-rose-500 focus:border-rose-400'
                      : 'border-white/15 focus:border-[#C9A45C]'
                  }`}
                  aria-label="Email address for newsletter"
                />
              </div>
              <button
                type="submit"
                className="btn-shine px-8 py-3.5 bg-[#C9A45C] hover:bg-[#D8B872] text-[#101820] font-semibold text-xs uppercase tracking-widest transition-colors flex items-center justify-center cursor-pointer flex-shrink-0"
              >
                SUBSCRIBE
              </button>
            </div>

            {status === 'error' && (
              <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-rose-400 text-left sm:text-center animate-fade-in">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </form>
        )}

        <p className="text-[10px] text-[#A9B0B5] mt-4 tracking-wider">
          We respect your inbox. Unsubscribe anytime with one click.
        </p>
      </div>
    </section>
  );
};
