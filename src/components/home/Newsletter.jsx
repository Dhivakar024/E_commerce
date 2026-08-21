import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-24 sm:py-28 bg-luxury-charcoal border-t border-white/5 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs uppercase tracking-ultra text-luxury-gold block mb-3 font-medium">
          PRIVATE CLIENT ACCESS
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-4">
          Join The Atelier Circle
        </h2>
        <p className="text-xs sm:text-sm text-luxury-muted font-light max-w-lg mx-auto mb-8 leading-relaxed">
          Receive private invitations to runway debuts, complimentary bespoke fittings, and priority access to limited seasonal releases.
        </p>

        {isSubmitted ? (
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-white/5 border border-luxury-gold/40 text-luxury-champagne text-xs sm:text-sm tracking-wide animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-luxury-gold" />
            <span>Welcome to the Private Circle. Check your inbox for your private invitation code.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch max-w-md mx-auto gap-3"
          >
            <div className="relative flex-grow">
              <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-luxury-muted" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your private email"
                className="w-full bg-luxury-black/90 border border-white/15 focus:border-luxury-gold text-xs sm:text-sm text-white placeholder:text-luxury-muted/60 pl-11 pr-4 py-3.5 focus:outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              className="btn-shine px-7 py-3.5 bg-white hover:bg-luxury-champagne text-luxury-black font-medium text-xs uppercase tracking-widest transition-colors flex items-center justify-center cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-[10px] text-luxury-subtle mt-4 tracking-wider">
          We honor your privacy. Unsubscribe at any time with a single click.
        </p>
      </div>
    </section>
  );
};
