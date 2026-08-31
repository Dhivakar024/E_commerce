import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { useTheme } from '../context/ThemeContext';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { showToast } = useShop();
  const { isDark } = useTheme();

  const redirect = new URLSearchParams(location.search).get('redirect') || '/account';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);

    try {
      const user = await login({ email, password });
      showToast(`Welcome back, ${user?.firstName || 'Client'}.`, 'success');
      navigate(redirect);
    } catch (err) {
      setError(err?.message || 'Invalid email or password. Please try again.');
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
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase tracking-ultra text-[#C9A45C] block font-medium">
              CLIENT PORTAL
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-normal">
              Sign In to Your Account
            </h1>
            <p className={`text-xs font-light ${isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}`}>
              Access your bespoke orders, wishlist, and saved addresses.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3.5 bg-rose-950/70 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
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

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block uppercase tracking-widest font-medium text-[11px]">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] text-[#C9A45C] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
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
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-black/10 dark:border-white/10 text-xs">
            <span className={isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}>
              Don't have an account?{' '}
            </span>
            <Link
              to={`/register?redirect=${encodeURIComponent(redirect)}`}
              className="text-[#C9A45C] font-medium hover:underline"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
