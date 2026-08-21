import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, FileText, ChevronRight } from 'lucide-react';

export const LegalPage = () => {
  const { pathname } = useLocation();

  let title = 'Privacy Policy';
  let subtitle = 'Our commitment to safeguarding your personal information and confidentiality.';
  let icon = ShieldCheck;

  if (pathname.includes('terms')) {
    title = 'Terms of Service';
    subtitle = 'Conditions governing the use of LAX360 PVT LTD digital services and commercial agreements.';
    icon = FileText;
  } else if (pathname.includes('shipping')) {
    title = 'Shipping & Delivery';
    subtitle = 'Logistics standards, transit timelines, and international white-glove packaging.';
    icon = Truck;
  } else if (pathname.includes('returns')) {
    title = 'Returns & Exchanges';
    subtitle = 'Our 14-day complimentary returns policy and effortless exchange procedure.';
    icon = RotateCcw;
  }

  const Icon = icon;

  return (
    <main className="w-full bg-luxury-black text-luxury-cream min-h-screen pt-28 sm:pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs tracking-wider text-luxury-muted mb-8">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="text-luxury-champagne font-medium">{title}</span>
        </nav>

        {/* Header */}
        <div className="pb-8 border-b border-white/10 mb-10 space-y-3">
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-luxury-gold mb-4">
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase tracking-ultra text-luxury-gold block font-medium">
            LEGAL & POLICIES
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-luxury-muted font-light leading-relaxed">
            {subtitle}
          </p>
          <p className="text-[11px] text-luxury-muted font-mono pt-1">
            Last Updated: August 2026 • Version 1.4
          </p>
        </div>

        {/* Policy Body */}
        <div className="space-y-8 text-xs text-luxury-cream/80 font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-lg text-white font-normal">1. General Overview</h2>
            <p>
              LAX360 PVT LTD ("we", "us", "our") operates this luxury digital commerce platform to offer bespoke tailoring, curated seasonal ready-to-wear collections, and artisanal lifestyle accessories. By accessing our services, you acknowledge and agree to the operational standards set forth herein.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-white font-normal">2. Client Confidentiality & Data Security</h2>
            <p>
              We adhere to strict data minimization principles. Personal identification details, including your contact number, delivery addresses, and purchasing history, are encrypted and used solely for fulfilling orders, providing personalized concierge styling, and maintaining your atelier account. We never monetize or transfer your personal records to third-party advertisers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-white font-normal">3. Order Fulfillment & Delivery Commitments</h2>
            <p>
              Each bespoke garment undergoes a meticulous three-stage quality inspection prior to sealing in our climate-protected packaging. Orders are dispatched through accredited premium courier partners with signature-upon-delivery requirements to guarantee secure transfer.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-white font-normal">4. Complimentary Returns & Atelier Exchanges</h2>
            <p>
              Should an item not meet your bespoke expectations or require size adjustment, returns may be requested within fourteen (14) calendar days of recorded delivery. Returned pieces must remain in their pristine unworn condition with all authenticity tags, hangers, and bespoke dust covers intact.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-white font-normal">5. Concierge Inquiries</h2>
            <p>
              For legal clarifications or private client policy requests, please contact our legal compliance team at <span className="text-luxury-champagne underline">legal@lax360.com</span> or via our <Link to="/contact" className="text-white hover:text-luxury-champagne underline">Client Concierge</Link>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};
