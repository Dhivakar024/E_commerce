import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { Eye, EyeOff, Lock, Mail, User, Phone, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

export const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();
  const { showToast } = useShop();

  const redirect = new URLSearchParams(location.search).get('redirect') || '/account';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      setError('Please provide your full name and email address.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);

    try {
      const user = await register({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
      });

      showToast(`Welcome to LAX360 PVT LTD, ${user?.firstName || 'Client'}.`, 'success');
      navigate(redirect);
    } catch (err) {
      setError(err?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full bg-luxury-black text-luxury-cream min-h-screen pt-28 sm:pt-36 pb-24 flex items-center justify-center">
      <div className="w-full max-w-lg mx-auto px-4 sm:px-6">
        <div className="bg-luxury-charcoal/40 border border-white/10 p-8 sm:p-10 shadow-2xl space-y-8 animate-fade-in backdrop-blur-md">
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase tracking-ultra text-luxury-gold block font-medium">
              NEW CLIENT REGISTRATION
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              Create an Account
            </h1>
            <p className="text-xs text-luxury-muted font-light">
              Enjoy tailored experiences, order tracking, and private collection access.
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
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-luxury-cream uppercase tracking-widest font-medium text-[11px]">
                  First Name <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    placeholder="e.g. Dhivakar"
                    className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold text-white pl-9 pr-3 py-2.5 text-xs focus:outline-none placeholder:text-luxury-muted/40 transition-colors"
                    required
                  />
                  <User className="w-3.5 h-3.5 text-luxury-muted absolute left-3 top-3.5" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-luxury-cream uppercase tracking-widest font-medium text-[11px]">
                  Last Name <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    placeholder="e.g. Kumar"
                    className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold text-white pl-9 pr-3 py-2.5 text-xs focus:outline-none placeholder:text-luxury-muted/40 transition-colors"
                    required
                  />
                  <User className="w-3.5 h-3.5 text-luxury-muted absolute left-3 top-3.5" />
                </div>
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-luxury-cream uppercase tracking-widest font-medium text-[11px]">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="e.g. client@lax360.com"
                    className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold text-white pl-9 pr-3 py-2.5 text-xs focus:outline-none placeholder:text-luxury-muted/40 transition-colors"
                    required
                  />
                  <Mail className="w-3.5 h-3.5 text-luxury-muted absolute left-3 top-3.5" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-luxury-cream uppercase tracking-widest font-medium text-[11px]">
                  Mobile Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold text-white pl-9 pr-3 py-2.5 text-xs focus:outline-none placeholder:text-luxury-muted/40 transition-colors"
                  />
                  <Phone className="w-3.5 h-3.5 text-luxury-muted absolute left-3 top-3.5" />
                </div>
              </div>
            </div>

            {/* Password & Confirm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-luxury-cream uppercase tracking-widest font-medium text-[11px]">
                  Password <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold text-white pl-9 pr-8 py-2.5 text-xs focus:outline-none placeholder:text-luxury-muted/40 transition-colors"
                    required
                  />
                  <Lock className="w-3.5 h-3.5 text-luxury-muted absolute left-3 top-3.5" />
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
                  Confirm Password <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    placeholder="Repeat password"
                    className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold text-white pl-9 pr-3 py-2.5 text-xs focus:outline-none placeholder:text-luxury-muted/40 transition-colors"
                    required
                  />
                  <Lock className="w-3.5 h-3.5 text-luxury-muted absolute left-3 top-3.5" />
                </div>
              </div>
            </div>

            <div className="pt-2">
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
                    <span>Registering Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Switch to Login */}
          <div className="pt-6 border-t border-white/10 text-center text-xs">
            <p className="text-luxury-muted">
              Already have an account?{' '}
              <Link
                to={`/login${redirect !== '/account' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`}
                className="text-white hover:text-luxury-champagne underline underline-offset-4 font-medium transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
