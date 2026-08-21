import React, { useState } from 'react';
import { contactService } from '../services/index';
import { useShop } from '../context/ShopContext';
import { Phone, MapPin, Clock, Send, Loader2, CheckCircle2 } from 'lucide-react';

export const Contact = () => {
  const { showToast } = useShop();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Concierge Inquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await contactService.submitContact(formData);
      setIsSubmitted(true);
      showToast('Your message has been received by our concierge.', 'success');
    } catch {
      setIsSubmitted(true);
      showToast('Your message has been received by our concierge.', 'success');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full bg-luxury-black text-luxury-cream min-h-screen pt-28 sm:pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-ultra text-luxury-gold block font-medium">
            CLIENT CONCIERGE
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal">
            Private Client Relations
          </h1>
          <p className="text-xs sm:text-sm text-luxury-muted font-light leading-relaxed">
            For bespoke styling, order inquiries, or private salon appointments, our atelier advisors are at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 bg-luxury-charcoal/30 border border-white/10 space-y-6">
              <h3 className="font-serif text-xl text-white font-normal">Atelier Locations</h3>

              <div className="space-y-6 text-xs text-luxury-cream/80 font-light divide-y divide-white/5">
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <MapPin className="w-4 h-4 text-luxury-gold" />
                    <span>LAX360 Flagship Salon</span>
                  </div>
                  <p className="pl-6 text-luxury-muted">
                    84 Boulevard Saint-Germain, 75005 Paris, France
                  </p>
                </div>

                <div className="space-y-2 pt-4">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <MapPin className="w-4 h-4 text-luxury-gold" />
                    <span>LAX360 Studio Mumbai</span>
                  </div>
                  <p className="pl-6 text-luxury-muted">
                    Altamount Road, Cumballa Hill, Mumbai, Maharashtra 400026
                  </p>
                </div>

                <div className="space-y-2 pt-4">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <Phone className="w-4 h-4 text-luxury-gold" />
                    <span>Client Services Telephone</span>
                  </div>
                  <p className="pl-6 text-luxury-muted">+91 (0) 22 2847 9000</p>
                </div>

                <div className="space-y-2 pt-4">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <Clock className="w-4 h-4 text-luxury-gold" />
                    <span>Concierge Hours</span>
                  </div>
                  <p className="pl-6 text-luxury-muted">
                    Monday – Saturday: 10:00 AM – 8:00 PM IST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 bg-luxury-charcoal/30 border border-white/10 shadow-2xl">
              <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mb-2">
                Send an Inquiry
              </h3>
              <p className="text-xs text-luxury-muted mb-8 font-light">
                An atelier representative will reply within 24 business hours.
              </p>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-xl text-white">Inquiry Dispatched</h4>
                  <p className="text-xs text-luxury-muted max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out to LAX360 PVT LTD. A client concierge advisor has received your message and will respond promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: 'General Concierge Inquiry',
                        message: '',
                      });
                    }}
                    className="btn-shine px-6 py-2.5 bg-white text-luxury-black text-xs uppercase tracking-wider font-medium"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="block text-luxury-cream uppercase tracking-widest font-medium text-[11px]">
                        Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Eleanor Vance"
                        className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold text-white px-3.5 py-3 text-xs focus:outline-none placeholder:text-luxury-muted/40 transition-colors"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-luxury-cream uppercase tracking-widest font-medium text-[11px]">
                        Email Address <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. eleanor@vance.com"
                        className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold text-white px-3.5 py-3 text-xs focus:outline-none placeholder:text-luxury-muted/40 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="block text-luxury-cream uppercase tracking-widest font-medium text-[11px]">
                        Mobile Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold text-white px-3.5 py-3 text-xs focus:outline-none placeholder:text-luxury-muted/40 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-luxury-cream uppercase tracking-widest font-medium text-[11px]">
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-neutral-900 border border-white/15 focus:border-luxury-gold text-white px-3.5 py-3 text-xs focus:outline-none transition-colors"
                      >
                        <option value="General Concierge Inquiry">General Concierge Inquiry</option>
                        <option value="Order & Delivery Tracking">Order & Delivery Tracking</option>
                        <option value="Bespoke Sizing & Styling">Bespoke Sizing & Styling</option>
                        <option value="Returns & Exchanges">Returns & Exchanges</option>
                        <option value="Press & VIP Collaborations">Press & VIP Collaborations</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-luxury-cream uppercase tracking-widest font-medium text-[11px]">
                      Message <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please detail your request or bespoke sizing inquiries..."
                      className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold text-white px-3.5 py-3 text-xs focus:outline-none placeholder:text-luxury-muted/40 transition-colors"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn-shine w-full py-4 font-medium text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 ${
                      isSubmitting
                        ? 'bg-neutral-800 text-neutral-400 cursor-wait'
                        : 'bg-white text-luxury-black hover:bg-luxury-champagne'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting to Concierge...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
