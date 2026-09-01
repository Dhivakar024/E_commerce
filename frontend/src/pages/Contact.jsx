import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useTheme } from '../context/ThemeContext';
import { Phone, Mail, Clock, Send, Loader2, CheckCircle2, MessageSquare, Headphones } from 'lucide-react';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { PrivacyConsent } from '../components/common/PrivacyConsent';

const CONTACT_CATEGORIES = [
  'Order Support',
  'Product Support',
  'Delivery Support',
  'Returns & Refunds',
  'General Enquiries',
];

export const Contact = () => {
  const { showToast } = useShop();
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Order Support',
    orderNumber: '',
    message: '',
  });

  const [hasReadPrivacy, setHasReadPrivacy] = useState(false);
  const [acknowledgedPrivacy, setAcknowledgedPrivacy] = useState(false);
  const [privacyError, setPrivacyError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPrivacyError('');

    if (!hasReadPrivacy || !acknowledgedPrivacy) {
      setPrivacyError('Please read and acknowledge the Privacy Notice before submitting.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      showToast('Your inquiry has been submitted to LAX360 Support.', 'success');
    }, 600);
  };

  return (
    <main className={`w-full min-h-screen pt-22 sm:pt-24 pb-12 transition-colors duration-250 ${
      isDark ? 'bg-[#101820] text-[#F7F3EA]' : 'bg-[#F8F6F0] text-[#101820]'
    }`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8 sm:space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block font-semibold">
            CUSTOMER ASSISTANCE
          </span>
          <h1 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-normal ${
            isDark ? 'text-white' : 'text-[#101820]'
          }`}>
            How Can We Help?
          </h1>
          <p className={`text-xs sm:text-sm font-light leading-relaxed ${
            isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
          }`}>
            Have a question about an order, product, delivery or anything else? Our team is here to help.
          </p>
        </div>

        {/* 4 Support Channels Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className={`p-6 border space-y-3 shadow-xl ${
            isDark ? 'bg-[#1B2630] border-white/10 text-white' : 'bg-white border-black/10 text-[#101820]'
          }`}>
            <div className={`w-10 h-10 border flex items-center justify-center text-[#C9A45C] ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
            }`}>
              <Headphones className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-medium">Customer Helpline</h3>
            <p className={`text-xs font-light ${isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'}`}>
              +91 (0) 22 2847 9000<br />
              Mon – Sat: 9:00 AM – 9:00 PM IST
            </p>
          </div>

          <div className={`p-6 border space-y-3 shadow-xl ${
            isDark ? 'bg-[#1B2630] border-white/10 text-white' : 'bg-white border-black/10 text-[#101820]'
          }`}>
            <div className={`w-10 h-10 border flex items-center justify-center text-[#C9A45C] ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
            }`}>
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-medium">Email Support</h3>
            <p className={`text-xs font-light ${isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'}`}>
              support@lax360.com<br />
              Average response time: &lt; 4 hours
            </p>
          </div>

          <div className={`p-6 border space-y-3 shadow-xl ${
            isDark ? 'bg-[#1B2630] border-white/10 text-white' : 'bg-white border-black/10 text-[#101820]'
          }`}>
            <div className={`w-10 h-10 border flex items-center justify-center text-[#C9A45C] ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
            }`}>
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-medium">Order Inquiries</h3>
            <p className={`text-xs font-light ${isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'}`}>
              Track, modify, or return items directly through your customer account.
            </p>
          </div>

          <div className={`p-6 border space-y-3 shadow-xl ${
            isDark ? 'bg-[#1B2630] border-white/10 text-white' : 'bg-white border-black/10 text-[#101820]'
          }`}>
            <div className={`w-10 h-10 border flex items-center justify-center text-[#C9A45C] ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
            }`}>
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-medium">Rapid Resolution</h3>
            <p className={`text-xs font-light ${isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'}`}>
              Guaranteed dispute resolution and fast return processing across India.
            </p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className={`max-w-3xl mx-auto p-8 sm:p-12 border shadow-2xl ${
          isDark ? 'bg-[#1B2630] border-white/10' : 'bg-white border-black/10'
        }`}>
          <div className="mb-8">
            <h3 className={`font-serif text-2xl font-normal mb-1 ${isDark ? 'text-white' : 'text-[#101820]'}`}>
              Submit a Support Request
            </h3>
            <p className={`text-xs font-light ${isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'}`}>
              Select your inquiry category and our dedicated specialist will respond promptly.
            </p>
          </div>

          {isSubmitted ? (
            <div className="py-12 text-center space-y-4 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className={`font-serif text-xl ${isDark ? 'text-white' : 'text-[#101820]'}`}>Inquiry Received</h4>
              <p className={`text-xs max-w-md mx-auto leading-relaxed ${isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'}`}>
                Thank you for contacting LAX360 PVT LTD. Your support ticket has been registered and a customer care specialist will follow up shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setHasReadPrivacy(false);
                  setAcknowledgedPrivacy(false);
                  setPrivacyError('');
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    category: 'Order Support',
                    orderNumber: '',
                    message: '',
                  });
                }}
                className="btn-shine px-6 py-2.5 bg-[#C9A45C] text-[#101820] text-xs uppercase tracking-wider font-semibold cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              {/* Category selector pills */}
              <div className="space-y-2">
                <label className={`block uppercase tracking-widest font-semibold text-[11px] ${
                  isDark ? 'text-white' : 'text-[#101820]'
                }`}>
                  Inquiry Category <span className="text-rose-400">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {CONTACT_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat })}
                      className={`px-3.5 py-2 text-xs uppercase tracking-wider border transition-all cursor-pointer ${
                        formData.category === cat
                          ? 'bg-[#C9A45C] text-[#101820] border-[#C9A45C] font-semibold'
                          : isDark
                            ? 'bg-white/5 text-[#F7F3EA]/80 border-white/10 hover:border-white/30'
                            : 'bg-[#F8F6F0] text-[#101820]/80 border-black/10 hover:border-black/30'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div className="space-y-1.5">
                  <label className={`block uppercase tracking-widest font-semibold text-[11px] ${
                    isDark ? 'text-white' : 'text-[#101820]'
                  }`}>
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full border px-3.5 py-3 text-xs focus:outline-none focus:border-[#C9A45C] transition-colors ${
                      isDark
                        ? 'bg-white/5 border-white/15 text-white placeholder:text-[#A9B0B5]/40'
                        : 'bg-[#F8F6F0] border-black/15 text-[#101820] placeholder:text-[#4A5560]/40'
                    }`}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className={`block uppercase tracking-widest font-semibold text-[11px] ${
                    isDark ? 'text-white' : 'text-[#101820]'
                  }`}>
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. rahul@example.com"
                    className={`w-full border px-3.5 py-3 text-xs focus:outline-none focus:border-[#C9A45C] transition-colors ${
                      isDark
                        ? 'bg-white/5 border-white/15 text-white placeholder:text-[#A9B0B5]/40'
                        : 'bg-[#F8F6F0] border-black/15 text-[#101820] placeholder:text-[#4A5560]/40'
                    }`}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className={`block uppercase tracking-widest font-semibold text-[11px] ${
                    isDark ? 'text-white' : 'text-[#101820]'
                  }`}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className={`w-full border px-3.5 py-3 text-xs focus:outline-none focus:border-[#C9A45C] transition-colors ${
                      isDark
                        ? 'bg-white/5 border-white/15 text-white placeholder:text-[#A9B0B5]/40'
                        : 'bg-[#F8F6F0] border-black/15 text-[#101820] placeholder:text-[#4A5560]/40'
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className={`block uppercase tracking-widest font-semibold text-[11px] ${
                    isDark ? 'text-white' : 'text-[#101820]'
                  }`}>
                    Order Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.orderNumber}
                    onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                    placeholder="e.g. ORD-2026-9081"
                    className={`w-full border px-3.5 py-3 text-xs focus:outline-none focus:border-[#C9A45C] transition-colors font-mono ${
                      isDark
                        ? 'bg-white/5 border-white/15 text-white placeholder:text-[#A9B0B5]/40'
                        : 'bg-[#F8F6F0] border-black/15 text-[#101820] placeholder:text-[#4A5560]/40'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className={`block uppercase tracking-widest font-semibold text-[11px] ${
                  isDark ? 'text-white' : 'text-[#101820]'
                }`}>
                  Message & Details <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please describe how we can assist you..."
                  className={`w-full border px-3.5 py-3 text-xs focus:outline-none focus:border-[#C9A45C] transition-colors ${
                    isDark
                      ? 'bg-white/5 border-white/15 text-white placeholder:text-[#A9B0B5]/40'
                      : 'bg-[#F8F6F0] border-black/15 text-[#101820] placeholder:text-[#4A5560]/40'
                  }`}
                  required
                />
              </div>

              {/* DPDP Privacy Notice Acknowledgement */}
              <PrivacyConsent
                id="contact-privacy-consent"
                acknowledged={acknowledgedPrivacy}
                onChange={(checked) => {
                  setAcknowledgedPrivacy(checked);
                  if (privacyError) setPrivacyError('');
                }}
                hasRead={hasReadPrivacy}
                onReadChange={setHasReadPrivacy}
                error={privacyError}
                className="pt-2 pb-1"
              />

              <button
                type="submit"
                disabled={isSubmitting || !hasReadPrivacy || !acknowledgedPrivacy}
                className={`btn-shine w-full py-4 font-semibold text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer ${
                  isSubmitting || !hasReadPrivacy || !acknowledgedPrivacy
                    ? 'bg-neutral-300 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-500 cursor-not-allowed opacity-60'
                    : 'bg-[#C9A45C] hover:bg-[#D8B872] text-[#101820]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Transmit Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <NewsletterSection />
    </main>
  );
};
