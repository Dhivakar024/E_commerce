import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { Mail, ArrowRight, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await authService.forgotPassword(email);
      setIsSent(true);
    } catch (err) {
      // Fallback
      setIsSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full bg-luxury-black text-luxury-cream min-h-screen pt-28 sm:pt-36 pb-24 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4 sm:px-6">
        <div className="bg-luxury-charcoal/40 border border-white/10 p-8 sm:p-10 shadow-2xl space-y-8 animate-fade-in backdrop-blur-md">
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase tracking-ultra text-luxury-gold block font-medium">
              ACCOUNT RECOVERY
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              Reset Your Password
            </h1>
            <p className="text-xs text-luxury-muted font-light">
              Enter your registered email to receive password reset instructions.
            </p>
          </div>

          {isSent ? (
            <div className="text-center space-y-4 py-4 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-xs text-luxury-cream leading-relaxed">
                Instructions have been dispatched to <strong className="text-white font-medium">{email}</strong>. Please check your inbox and follow the secure link.
              </p>
              <Link
                to="/login"
                className="btn-shine inline-flex items-center gap-2 px-6 py-2.5 bg-white text-luxury-black hover:bg-luxury-champagne text-xs uppercase tracking-wider font-medium transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Sign In</span>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              {error && (
                <div className="p-3 bg-rose-950/70 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-luxury-cream uppercase tracking-widest font-medium text-[11px]">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. client@lax360.com"
                    className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold text-white pl-10 pr-4 py-3 text-xs focus:outline-none placeholder:text-luxury-muted/40 transition-colors"
                    required
                  />
                  <Mail className="w-4 h-4 text-luxury-muted absolute left-3.5 top-3.5" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-shine w-full py-3.5 font-medium text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? 'bg-neutral-800 text-neutral-400 cursor-wait'
                    : 'bg-white text-luxury-black hover:bg-luxury-champagne'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Instructions...</span>
                  </>
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <Link
                  to="/login"
                  className="text-xs text-luxury-muted hover:text-white uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};
