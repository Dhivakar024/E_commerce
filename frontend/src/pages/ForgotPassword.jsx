import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { useTheme } from '../context/ThemeContext';
import { Mail, ArrowRight, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export const ForgotPassword = () => {
  const { isDark } = useTheme();
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
    <main className={`w-full min-h-screen pt-28 sm:pt-36 pb-24 flex items-center justify-center transition-colors duration-250 ${
      isDark ? 'bg-[#101820] text-[#F7F3EA]' : 'bg-[#F8F6F0] text-[#101820]'
    }`}>
      <div className="w-full max-w-md mx-auto px-4 sm:px-6">
        <div className={`p-8 sm:p-10 shadow-2xl space-y-8 animate-fade-in border ${
          isDark
            ? 'bg-[#1B2630] border-white/[0.08] text-white'
            : 'bg-white border-black/[0.08] text-[#101820]'
        }`}>
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase tracking-ultra text-[#C9A45C] block font-medium">
              ACCOUNT RECOVERY
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-normal">
              Reset Your Password
            </h1>
            <p className={`text-xs font-light ${isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}`}>
              Enter your registered email to receive password reset instructions.
            </p>
          </div>

          {isSent ? (
            <div className="text-center space-y-4 py-4 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-xs leading-relaxed">
                Instructions have been dispatched to <strong className="font-medium text-[#C9A45C]">{email}</strong>. Please check your inbox and follow the secure link.
              </p>
              <Link
                to="/login"
                className="btn-shine inline-flex items-center gap-2 px-6 py-2.5 bg-[#C9A45C] text-[#101820] hover:bg-[#D8B872] text-xs uppercase tracking-wider font-semibold transition-all mt-2"
              >
                <span>Return to Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              {error && (
                <div className="p-3.5 bg-rose-950/70 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2 animate-fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block uppercase tracking-widest font-medium text-[11px]">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. client@lax360.com"
                    className={`w-full border pl-10 pr-4 py-3 text-xs focus:outline-none transition-colors ${
                      isDark
                        ? 'bg-white/5 border-white/15 focus:border-[#C9A45C] text-white placeholder:text-[#A9B0B5]/40'
                        : 'bg-black/5 border-black/15 focus:border-[#B08B43] text-[#101820] placeholder:text-[#717D86]/40'
                    }`}
                    required
                  />
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A9B0B5]" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-shine w-full py-3.5 bg-[#C9A45C] text-[#101820] hover:bg-[#D8B872] uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Dispatching Instructions...</span>
                  </>
                ) : (
                  <>
                    <span>Send Reset Instructions</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-3">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-[#C9A45C] hover:underline"
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
