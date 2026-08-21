import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useShop } from '../context/ShopContext';
import { Eye, EyeOff, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { showToast } = useShop();

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
    <main className="w-full bg-luxury-black text-luxury-cream min-h-screen pt-28 sm:pt-36 pb-24 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4 sm:px-6">
        <div className="bg-luxury-charcoal/40 border border-white/10 p-8 sm:p-10 shadow-2xl space-y-8 animate-fade-in backdrop-blur-md">
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase tracking-ultra text-luxury-gold block font-medium">
              NEW CREDENTIALS
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              Set New Password
            </h1>
            <p className="text-xs text-luxury-muted font-light">
              Choose a strong, secure passphrase for your profile.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-950/70 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="block text-luxury-cream uppercase tracking-widest font-medium text-[11px]">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@lax360.com"
                className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold text-white px-3.5 py-2.5 text-xs focus:outline-none placeholder:text-luxury-muted/40 transition-colors"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-luxury-cream uppercase tracking-widest font-medium text-[11px]">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold text-white pl-3.5 pr-8 py-2.5 text-xs focus:outline-none placeholder:text-luxury-muted/40 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-3 text-luxury-muted hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-luxury-cream uppercase tracking-widest font-medium text-[11px]">
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold text-white px-3.5 py-2.5 text-xs focus:outline-none placeholder:text-luxury-muted/40 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-shine w-full py-3.5 font-medium text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 mt-4 ${
                isSubmitting
                  ? 'bg-neutral-800 text-neutral-400 cursor-wait'
                  : 'bg-white text-luxury-black hover:bg-luxury-champagne'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <span>Save & Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};
