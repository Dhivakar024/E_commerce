import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (val) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
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
    <section className="py-24 sm:py-32 bg-luxury-black relative z-10">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
        <span className="text-xs uppercase tracking-ultra text-luxury-gold block mb-3 font-medium">
          THE INNER CIRCLE
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-4">
          Stay in the Know
        </h2>
        <p className="text-xs sm:text-sm text-luxury-muted font-light max-w-md mx-auto mb-10 leading-relaxed">
          Be the first to discover new collections, exclusive releases and special offers.
        </p>

        {status === 'success' ? (
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-white/5 border border-luxury-gold/40 text-luxury-champagne text-xs sm:text-sm tracking-wide animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-luxury-gold flex-shrink-0" />
            <span>Thank you for subscribing. You are now on the private guest list.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto" noValidate>
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              <div className="relative flex-grow">
                <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-luxury-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Enter your email address"
                  className={`w-full bg-luxury-charcoal/80 border text-xs sm:text-sm text-white placeholder:text-luxury-muted/60 pl-11 pr-4 py-3.5 focus:outline-none transition-colors ${
                    status === 'error'
                      ? 'border-rose-500/80 focus:border-rose-400'
                      : 'border-white/15 focus:border-luxury-gold'
                  }`}
                  aria-label="Email address for newsletter"
                />
              </div>
              <button
                type="submit"
                className="btn-shine px-8 py-3.5 bg-white hover:bg-luxury-champagne text-luxury-black font-medium text-xs uppercase tracking-widest transition-colors flex items-center justify-center cursor-pointer flex-shrink-0"
              >
                Subscribe
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

        <p className="text-[10px] text-luxury-subtle mt-4 tracking-wider">
          Complimentary subscription. Unsubscribe at any time with complete ease.
        </p>
      </div>
    </section>
  );
};
