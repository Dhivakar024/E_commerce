import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useShop } from '../../context/ShopContext';
import { Shield, Lock, Mail, Eye, EyeOff, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { showToast } = useShop();

  const redirect = new URLSearchParams(location.search).get('redirect') || '/admin';

  const [email, setEmail] = useState('admin@elan.com');
  const [password, setPassword] = useState('Admin@123456');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const loggedUser = await login({ email, password });
      if (loggedUser?.role !== 'admin') {
        setError('Access denied. This account does not possess administrator clearance.');
        setIsSubmitting(false);
        return;
      }
      showToast('Welcome to the LAX360 Management Console.', 'success');
      navigate(redirect);
    } catch (err) {
      setError(err?.message || 'Invalid administrator credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-luxury-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-luxury-black border border-white/15 p-8 sm:p-10 shadow-2xl space-y-8 backdrop-blur-xl relative">
          {/* Top Seal Badge */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold flex items-center justify-center mx-auto shadow-xl">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <span className="font-cinzel text-xl tracking-[0.25em] font-semibold text-white block">
                LAX360 PVT LTD
              </span>
              <span className="text-[9px] uppercase tracking-ultra text-luxury-gold block font-medium mt-0.5">
                EXECUTIVE DIRECTOR PORTAL
              </span>
            </div>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-950/70 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div className="space-y-1.5">
              <label className="block text-luxury-cream uppercase tracking-widest font-medium text-[11px]">
                Director Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@elan.com"
                  className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold text-white pl-10 pr-4 py-3 text-xs focus:outline-none placeholder:text-luxury-muted/40 transition-colors"
                  required
                />
                <Mail className="w-4 h-4 text-luxury-muted absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-luxury-cream uppercase tracking-widest font-medium text-[11px]">
                Master Security Key
              </label>
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
                  className="absolute right-3.5 top-3.5 text-luxury-muted hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-shine w-full py-4 font-medium text-xs uppercase tracking-widest transition-all shadow-2xl flex items-center justify-center gap-2 ${
                isSubmitting
                  ? 'bg-neutral-800 text-neutral-400 cursor-wait'
                  : 'bg-white text-luxury-black hover:bg-luxury-champagne'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Clearance...</span>
                </>
              ) : (
                <>
                  <span>Access Management Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Tip */}
          <div className="p-3 bg-white/5 border border-white/10 text-[11px] text-luxury-muted space-y-1 font-mono">
            <span className="text-luxury-gold uppercase tracking-wider block font-semibold text-[10px]">
              Demo Clearance Credentials:
            </span>
            <p>Email: admin@lax360.com</p>
            <p>Pass: Admin@123456</p>
          </div>

          <div className="text-center pt-2">
            <Link
              to="/"
              className="text-xs text-luxury-muted hover:text-white uppercase tracking-wider transition-colors"
            >
              ← Return to Customer Storefront
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
