import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { useTheme } from '../context/ThemeContext';
import { Eye, EyeOff, Lock, Mail, User, Phone, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { PrivacyConsent } from '../components/common/PrivacyConsent';

export const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();
  const { showToast } = useShop();
  const { isDark } = useTheme();

  const redirect = new URLSearchParams(location.search).get('redirect') || '/account';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [hasReadPrivacy, setHasReadPrivacy] = useState(false);
  const [acknowledgedPrivacy, setAcknowledgedPrivacy] = useState(false);

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

    if (!hasReadPrivacy || !acknowledgedPrivacy) {
      setError('Please read and acknowledge the Privacy Notice before creating an account.');
      return;
    }

    setIsSubmitting(true);

    try {
      const user = await register({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password,
      });

      showToast(`Welcome to LAX360, ${user?.firstName}.`, 'success');
      navigate(redirect);
    } catch (err) {
      setError(err?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={`w-full min-h-screen pt-28 sm:pt-36 pb-24 flex items-center justify-center transition-colors duration-250 ${
      isDark ? 'bg-[#101820] text-[#F7F3EA]' : 'bg-[#F8F6F0] text-[#101820]'
    }`}>
      <div className="w-full max-w-lg mx-auto px-4 sm:px-6">
        <div className={`p-8 sm:p-10 shadow-2xl space-y-8 animate-fade-in border ${
          isDark
            ? 'bg-[#1B2630] border-white/[0.08] text-white'
            : 'bg-white border-black/[0.08] text-[#101820]'
        }`}>
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase tracking-ultra text-[#C9A45C] block font-medium">
              NEW CLIENT REGISTRATION
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-normal">
              Create an Account
            </h1>
            <p className={`text-xs font-light ${isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}`}>
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
                <label className="block uppercase tracking-widest font-medium text-[11px]">
                  First Name <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    placeholder="e.g. Eleanor"
                    className={`w-full border pl-9 pr-3 py-3 text-xs focus:outline-none transition-colors ${
                      isDark
                        ? 'bg-white/5 border-white/15 focus:border-[#C9A45C] text-white placeholder:text-[#A9B0B5]/40'
                        : 'bg-black/5 border-black/15 focus:border-[#B08B43] text-[#101820] placeholder:text-[#717D86]/40'
                    }`}
                    required
                  />
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A9B0B5]" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block uppercase tracking-widest font-medium text-[11px]">
                  Last Name <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    placeholder="e.g. Vance"
                    className={`w-full border pl-9 pr-3 py-3 text-xs focus:outline-none transition-colors ${
                      isDark
                        ? 'bg-white/5 border-white/15 focus:border-[#C9A45C] text-white placeholder:text-[#A9B0B5]/40'
                        : 'bg-black/5 border-black/15 focus:border-[#B08B43] text-[#101820] placeholder:text-[#717D86]/40'
                    }`}
                    required
                  />
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A9B0B5]" />
                </div>
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block uppercase tracking-widest font-medium text-[11px]">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="client@lax360.com"
                    className={`w-full border pl-9 pr-3 py-3 text-xs focus:outline-none transition-colors ${
                      isDark
                        ? 'bg-white/5 border-white/15 focus:border-[#C9A45C] text-white placeholder:text-[#A9B0B5]/40'
                        : 'bg-black/5 border-black/15 focus:border-[#B08B43] text-[#101820] placeholder:text-[#717D86]/40'
                    }`}
                    required
                  />
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A9B0B5]" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block uppercase tracking-widest font-medium text-[11px]">
                  Phone (Optional)
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    className={`w-full border pl-9 pr-3 py-3 text-xs focus:outline-none transition-colors ${
                      isDark
                        ? 'bg-white/5 border-white/15 focus:border-[#C9A45C] text-white placeholder:text-[#A9B0B5]/40'
                        : 'bg-black/5 border-black/15 focus:border-[#B08B43] text-[#101820] placeholder:text-[#717D86]/40'
                    }`}
                  />
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A9B0B5]" />
                </div>
              </div>
            </div>

            {/* Password & Confirm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block uppercase tracking-widest font-medium text-[11px]">
                  Password <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="Min. 6 chars"
                    className={`w-full border pl-9 pr-9 py-3 text-xs focus:outline-none transition-colors ${
                      isDark
                        ? 'bg-white/5 border-white/15 focus:border-[#C9A45C] text-white placeholder:text-[#A9B0B5]/40'
                        : 'bg-black/5 border-black/15 focus:border-[#B08B43] text-[#101820] placeholder:text-[#717D86]/40'
                    }`}
                    required
                  />
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A9B0B5]" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A9B0B5] hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block uppercase tracking-widest font-medium text-[11px]">
                  Confirm Password <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    placeholder="Re-enter password"
                    className={`w-full border pl-9 pr-9 py-3 text-xs focus:outline-none transition-colors ${
                      isDark
                        ? 'bg-white/5 border-white/15 focus:border-[#C9A45C] text-white placeholder:text-[#A9B0B5]/40'
                        : 'bg-black/5 border-black/15 focus:border-[#B08B43] text-[#101820] placeholder:text-[#717D86]/40'
                    }`}
                    required
                  />
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A9B0B5]" />
                </div>
              </div>
            </div>

            {/* DPDP Privacy Notice Acknowledgement */}
            <PrivacyConsent
              id="register-privacy-consent"
              acknowledged={acknowledgedPrivacy}
              onChange={(checked) => {
                setAcknowledgedPrivacy(checked);
                if (error) setError('');
              }}
              hasRead={hasReadPrivacy}
              onReadChange={setHasReadPrivacy}
              className="pt-2 pb-1"
            />

            <button
              type="submit"
              disabled={isSubmitting || !hasReadPrivacy || !acknowledgedPrivacy}
              className={`btn-shine w-full py-3.5 font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer mt-2 ${
                isSubmitting || !hasReadPrivacy || !acknowledgedPrivacy
                  ? 'bg-neutral-300 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-500 cursor-not-allowed opacity-60'
                  : 'bg-[#C9A45C] text-[#101820] hover:bg-[#D8B872]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-black/10 dark:border-white/10 text-xs">
            <span className={isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}>
              Already registered with LAX360?{' '}
            </span>
            <Link
              to={`/login?redirect=${encodeURIComponent(redirect)}`}
              className="text-[#C9A45C] font-medium hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
