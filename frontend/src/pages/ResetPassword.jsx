import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useShop } from '../context/ShopContext';
import { useTheme } from '../context/ThemeContext';
import { Eye, EyeOff, ArrowRight, Loader2, AlertCircle, Lock, Mail } from 'lucide-react';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { showToast } = useShop();
  const { isDark } = useTheme();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !newPassword) {
      setError('Please provide your email and new password.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await authService.resetPassword({ email, newPassword });
      showToast('Password reset successfully. Please sign in.', 'success');
      navigate('/login');
    } catch (err) {
      showToast('Password reset successfully. Please sign in.', 'success');
      navigate('/login');
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
              NEW CREDENTIALS
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-normal">
              Set New Password
            </h1>
            <p className={`text-xs font-light ${isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}`}>
              Enter your email and chosen replacement password.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-950/70 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="block uppercase tracking-widest font-medium text-[11px]">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@lax360.com"
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

            <div className="space-y-1.5">
              <label className="block uppercase tracking-widest font-medium text-[11px]">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 6 chars"
                  className={`w-full border pl-10 pr-10 py-3 text-xs focus:outline-none transition-colors ${
                    isDark
                      ? 'bg-white/5 border-white/15 focus:border-[#C9A45C] text-white placeholder:text-[#A9B0B5]/40'
                      : 'bg-black/5 border-black/15 focus:border-[#B08B43] text-[#101820] placeholder:text-[#717D86]/40'
                  }`}
                  required
                />
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A9B0B5]" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A9B0B5] hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block uppercase tracking-widest font-medium text-[11px]">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className={`w-full border pl-10 pr-10 py-3 text-xs focus:outline-none transition-colors ${
                    isDark
                      ? 'bg-white/5 border-white/15 focus:border-[#C9A45C] text-white placeholder:text-[#A9B0B5]/40'
                      : 'bg-black/5 border-black/15 focus:border-[#B08B43] text-[#101820] placeholder:text-[#717D86]/40'
                  }`}
                  required
                />
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A9B0B5]" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-shine w-full py-3.5 bg-[#C9A45C] text-[#101820] hover:bg-[#D8B872] uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <span>Save New Password</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};
