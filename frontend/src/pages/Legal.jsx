import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, FileText, ChevronRight } from 'lucide-react';
import { NewsletterSection } from '../components/home/NewsletterSection';

export const LegalPage = () => {
  const { pathname } = useLocation();

  let title = 'Privacy Policy';
  let subtitle = 'Our commitment to safeguarding your personal information and account security.';
  let icon = ShieldCheck;

  if (pathname.includes('terms')) {
    title = 'Terms of Service';
    subtitle = 'Conditions governing the use of the LAX360 PVT LTD marketplace platform.';
    icon = FileText;
  } else if (pathname.includes('shipping')) {
    title = 'Shipping & Delivery';
    subtitle = 'Logistics standards, transit timelines, and protective packaging across all categories.';
    icon = Truck;
  } else if (pathname.includes('returns')) {
    title = 'Returns & Exchanges';
    subtitle = 'Our 14-day customer-friendly return and replacement procedure.';
    icon = RotateCcw;
  }

  const Icon = icon;

  return (
    <main className="w-full bg-[#101820] text-[#F7F3EA] min-h-screen pt-28 sm:pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs tracking-wider text-[#A9B0B5] mb-8">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="text-[#C9A45C] font-semibold">{title}</span>
        </nav>

        {/* Header */}
        <div className="pb-8 border-b border-white/10 mb-10 space-y-3">
          <div className="w-10 h-10 rounded-none bg-white/5 border border-white/15 flex items-center justify-center text-[#C9A45C] mb-4">
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block font-semibold">
            LEGAL & POLICIES
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-[#A9B0B5] font-light leading-relaxed">
            {subtitle}
          </p>
          <p className="text-[11px] text-[#A9B0B5] font-mono pt-1">
            Last Updated: August 2026 • Version 2.0
          </p>
        </div>

        {/* Policy Body */}
        <div className="space-y-8 text-xs text-[#F7F3EA]/80 font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-lg text-white font-normal">1. General Overview</h2>
            <p>
              LAX360 PVT LTD ("we", "us", "our") operates a multi-category digital marketplace offering verified products across fashion, furniture, electronics, certified healthcare medicines, cosmetics, and everyday essentials. By accessing our services, you acknowledge and agree to the operational policies set forth herein.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-white font-normal">2. Customer Confidentiality & Data Protection</h2>
            <p>
              We adhere to strict data minimization principles. Personal identification details, including your contact number, delivery addresses, and purchasing history, are encrypted and used solely for fulfilling orders, customer support, and maintaining your account. We never monetize or transfer your personal records to third-party advertisers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-white font-normal">3. Order Fulfillment & Nationwide Delivery</h2>
            <p>
              Each marketplace order undergoes quality inspection and secure packaging prior to dispatch. Orders are routed through accredited courier partners with live tracking and insured transit to ensure safe and timely delivery.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-white font-normal">4. 14-Day Easy Returns & Replacements</h2>
            <p>
              Should an item not meet your expectations or arrive damaged, returns or replacements may be requested within fourteen (14) calendar days of recorded delivery. Returned items must remain in original condition with tags and packaging intact.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-white font-normal">5. Customer Support Contact</h2>
            <p>
              For policy inquiries or assistance, please contact our support team at <span className="text-[#C9A45C] underline">legal@lax360.com</span> or submit a ticket via our <Link to="/contact" className="text-white hover:text-[#C9A45C] underline">Help Center</Link>.
            </p>
          </section>
        </div>
      </div>

      <NewsletterSection />
    </main>
  );
};
