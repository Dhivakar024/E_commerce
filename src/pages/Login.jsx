import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { showToast } = useShop();

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
    <main className="w-full bg-luxury-black text-luxury-cream min-h-screen pt-28 sm:pt-36 pb-24 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4 sm:px-6">
        <div className="bg-luxury-charcoal/40 border border-white/10 p-8 sm:p-10 shadow-2xl space-y-8 animate-fade-in backdrop-blur-md">
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase tracking-ultra text-luxury-gold block font-medium">
              CLIENT PORTAL
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              Sign In to Your Account
            </h1>
            <p className="text-xs text-luxury-muted font-light">
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

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-luxury-cream uppercase tracking-widest font-medium text-[11px]">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[10px] text-luxury-muted hover:text-luxury-champagne uppercase tracking-wider transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold text-white pl-10 pr-10 py-3 text-xs focus:outline-none placeholder:text-luxury-muted/40 transition-colors"
                  required
                />
                <Lock className="w-4 h-4 text-luxury-muted absolute left-3.5 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-luxury-muted hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
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
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Switch to Register & Admin */}
          <div className="pt-6 border-t border-white/10 text-center space-y-3 text-xs">
            <p className="text-luxury-muted">
              Don't have an account?{' '}
              <Link
                to={`/register${redirect !== '/account' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`}
                className="text-white hover:text-luxury-champagne underline underline-offset-4 font-medium transition-colors"
              >
                Register Now
              </Link>
            </p>

            <Link
              to="/admin/login"
              className="inline-block text-[11px] text-luxury-gold/80 hover:text-luxury-gold uppercase tracking-wider transition-colors pt-2"
            >
              LAX360 Management Portal →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
