import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-[#101820] text-[#F7F3EA] border-t border-white/10 relative z-10">
      <div className="max-w-xl mx-auto px-4 text-center space-y-6">
        <span className="text-xs uppercase tracking-ultra text-[#C9A45C] font-semibold block">
          MARKETPLACE OFFERS
        </span>
        <h3 className="font-serif text-3xl text-white font-normal">
          Stay in the Loop
        </h3>
        <p className="text-xs text-[#A9B0B5] font-light leading-relaxed">
          Get updates on new products, exclusive offers and marketplace deals across all categories.
        </p>

        {subscribed ? (
          <div className="p-4 bg-white/5 border border-[#C9A45C]/40 text-[#F7F3EA] flex items-center justify-center gap-2 text-xs">
            <CheckCircle2 className="w-4 h-4 text-[#C9A45C]" />
            <span>Thank you for subscribing to LAX360 deals!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
            <div className="relative flex-grow">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A9B0B5]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-[#1B2630] border border-white/15 focus:border-[#C9A45C] pl-10 pr-4 py-3 text-xs text-white placeholder:text-[#A9B0B5]/60 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="btn-shine px-6 py-3 bg-[#C9A45C] hover:bg-[#D8B872] text-[#101820] text-xs uppercase tracking-wider font-semibold"
            >
              SUBSCRIBE
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
