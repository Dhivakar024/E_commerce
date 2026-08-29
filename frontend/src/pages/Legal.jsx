import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, FileText, ChevronRight } from 'lucide-react';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { useTheme } from '../context/ThemeContext';

export const LegalPage = () => {
  const { pathname } = useLocation();
  const { isDark } = useTheme();

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
    <main className={`w-full min-h-screen pt-28 sm:pt-32 pb-24 transition-colors duration-250 ${
      isDark ? 'bg-[#101820] text-[#F7F3EA]' : 'bg-[#F8F6F0] text-[#101820]'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className={`flex items-center gap-2 text-xs tracking-wider mb-8 ${
          isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
        }`}>
          <Link to="/" className="hover:text-[#C9A45C] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="text-[#C9A45C] font-semibold">{title}</span>
        </nav>

        {/* Header */}
        <div className={`pb-8 border-b mb-10 space-y-3 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
          <div className={`w-10 h-10 border flex items-center justify-center text-[#C9A45C] mb-4 ${
            isDark ? 'bg-white/5 border-white/15' : 'bg-black/5 border-black/15'
          }`}>
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block font-semibold">
            LEGAL & POLICIES
          </span>
          <h1 className={`font-serif text-3xl sm:text-4xl font-normal ${
            isDark ? 'text-white' : 'text-[#101820]'
          }`}>
            {title}
          </h1>
          <p className={`text-xs sm:text-sm font-light leading-relaxed ${
            isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
          }`}>
            {subtitle}
          </p>
          <p className={`text-[11px] font-mono pt-1 ${
            isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
          }`}>
            Last Updated: August 2026 • Version 2.0
          </p>
        </div>

        {/* Policy Body */}
        <div className={`space-y-8 text-xs sm:text-sm font-light leading-relaxed ${
          isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
        }`}>
          <section className="space-y-2">
            <h2 className={`font-serif text-lg font-medium ${
              isDark ? 'text-white' : 'text-[#101820]'
            }`}>
              1. Overview & Acceptance
            </h2>
            <p>
              Welcome to LAX360 PVT LTD. By accessing or using our multi-category e-commerce marketplace, you acknowledge and agree to comply with our comprehensive operational terms, data safety commitments, and return protocols.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className={`font-serif text-lg font-medium ${
              isDark ? 'text-white' : 'text-[#101820]'
            }`}>
              2. Multi-Category Regulatory Standards
            </h2>
            <p>
              LAX360 operates distinct compliance guidelines for every product category. Wellness and pharmaceutical orders marked "Prescription Required" undergo verified pharmacist validation before dispatch. Electronics and high-value furniture pieces include serialized authenticity tracking and insured transit protection.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className={`font-serif text-lg font-medium ${
              isDark ? 'text-white' : 'text-[#101820]'
            }`}>
              3. Data Security & Transaction Encryption
            </h2>
            <p>
              All customer interactions, payment credentials, and order history are safeguarded with bank-grade 256-bit SSL encryption. We do not store raw credit/debit card numbers on our servers and strictly adhere to industry privacy regulations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className={`font-serif text-lg font-medium ${
              isDark ? 'text-white' : 'text-[#101820]'
            }`}>
              4. Contact Legal Department
            </h2>
            <p>
              For legal inquiries, corporate governance, or data rights requests, please contact our legal counsel at <span className="text-[#C9A45C]">legal@lax360.com</span>.
            </p>
          </section>
        </div>
      </div>

      <div className="mt-20">
        <NewsletterSection />
      </div>
    </main>
  );
};
