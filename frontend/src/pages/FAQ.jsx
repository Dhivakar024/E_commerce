import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ_DATA = [
  {
    category: 'Orders & Shipping',
    question: 'How long does delivery take for domestic and international orders?',
    answer: 'Standard Insured Delivery across India typically arrives within 3 to 5 business days. Priority Atelier Express orders are expedited via air freight and delivered within 1 to 2 business days. International dispatches usually take 4 to 7 business days with full customs clearance.',
  },
  {
    category: 'Orders & Shipping',
    question: 'Do you offer complimentary shipping?',
    answer: 'Yes, all orders exceeding ₹2,000 receive complimentary Standard Insured Delivery with white-glove logistics. For orders under ₹2,000, a nominal shipping charge of ₹99 applies.',
  },
  {
    category: 'Returns & Exchanges',
    question: 'What is your returns and exchange policy?',
    answer: 'We provide a 14-day complimentary return and exchange window from the date of delivery. All garments must be unworn, undamaged, and retained with original designer tags and garment bags.',
  },
  {
    category: 'Returns & Exchanges',
    question: 'How do I initiate a return or size exchange?',
    answer: 'You can initiate an exchange by visiting your Client Suite (/account) under Order History, or by contacting our concierge team with your order reference (ORD-2026-XXXXXX). A courier will be scheduled for home pickup.',
  },
  {
    category: 'Payment & Security',
    question: 'Which payment methods are accepted?',
    answer: 'We accept all major domestic and international Credit/Debit Cards (Visa, MasterCard, American Express, RuPay), UPI (Google Pay, PhonePe, Paytm), Net Banking, and Cash on Delivery (COD) for eligible domestic postal codes.',
  },
  {
    category: 'Payment & Security',
    question: 'Is my payment transaction secure?',
    answer: 'All transactions are encrypted with 256-bit SSL security protocol and compliant with PCI-DSS Tier 1 standards. No sensitive credit card details or CVVs are ever stored on our servers.',
  },
  {
    category: 'Products & Sizing',
    question: 'How do I choose the correct size?',
    answer: 'Each product page features a dedicated "Size Guide" modal with exact measurements in both centimeters and inches. If you require tailored advice, our concierge can offer bespoke recommendations.',
  },
  {
    category: 'Products & Sizing',
    question: 'Where are LAX360 PVT LTD garments crafted?',
    answer: 'Our pieces are ethically crafted in master ateliers across Florence, Biella, and Mumbai, using certified organic and traceable natural fibers such as European flax linen, Grade-A Mongolian cashmere, and liquid mulberry silk.',
  },
];

export const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Orders & Shipping', 'Returns & Exchanges', 'Payment & Security', 'Products & Sizing'];

  const filteredFAQs = activeCategory === 'All'
    ? FAQ_DATA
    : FAQ_DATA.filter((item) => item.category === activeCategory);

  return (
    <main className="w-full bg-luxury-black text-luxury-cream min-h-screen pt-28 sm:pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs uppercase tracking-ultra text-luxury-gold block font-medium">
            CLIENT ASSISTANCE
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-luxury-muted font-light max-w-lg mx-auto leading-relaxed">
            Everything you need to know about our atelier creations, bespoke orders, logistics, and private client services.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveCategory(cat);
                setOpenIdx(null);
              }}
              className={`px-4 py-2 text-xs uppercase tracking-wider transition-all border ${
                activeCategory === cat
                  ? 'bg-white text-luxury-black border-white font-medium shadow-md'
                  : 'bg-white/5 text-luxury-muted border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-white/10 border-y border-white/10">
          {filteredFAQs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="py-5 transition-colors">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group"
                >
                  <span className={`font-serif text-base sm:text-lg font-normal transition-colors ${
                    isOpen ? 'text-luxury-champagne' : 'text-white group-hover:text-luxury-champagne'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-6 h-6 rounded-full border border-white/15 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-white/10 text-white' : 'text-luxury-muted'
                  }`}>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-3 pr-8 text-xs text-luxury-cream/80 font-light leading-relaxed animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};
