import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { NewsletterSection } from '../components/home/NewsletterSection';

const FAQ_DATA = [
  {
    category: 'Orders & Shipping',
    question: 'How long does delivery take for domestic orders?',
    answer: 'Standard Delivery across India typically arrives within 2 to 4 business days. Priority Express orders are dispatched within 24 hours via premium air freight.',
  },
  {
    category: 'Orders & Shipping',
    question: 'Do you offer free delivery?',
    answer: 'Yes, orders exceeding ₹1,500 receive complimentary fast delivery nationwide across all categories. For orders under ₹1,500, a flat shipping charge of ₹99 applies.',
  },
  {
    category: 'Medicines & Health',
    question: 'Do I need a prescription to order medicines on LAX360?',
    answer: 'Over-the-counter (OTC) personal care, wellness supplements, and first-aid kits do not require a prescription. For medications marked "Prescription Required", you will be prompted to upload a valid medical practitioner prescription during checkout.',
  },
  {
    category: 'Furniture & Electronics',
    question: 'How are large furniture and fragile electronics handled?',
    answer: 'Furniture and electronics items are dispatched in multi-layered, reinforced protective packaging with insured logistics and live doorstep tracking.',
  },
  {
    category: 'Returns & Refunds',
    question: 'What is your returns and replacement policy?',
    answer: 'We provide a 14-day customer-friendly return and replacement window from the date of delivery. Items must be in original condition with intact packaging and warranty seals.',
  },
  {
    category: 'Returns & Refunds',
    question: 'How do I initiate a return or replacement?',
    answer: 'You can initiate a return through your Customer Account under Order History, or by submitting a request on our Contact Support page with your order reference number.',
  },
  {
    category: 'Payment & Security',
    question: 'Which payment methods are accepted?',
    answer: 'We accept all major Credit/Debit Cards (Visa, MasterCard, RuPay), UPI (Google Pay, PhonePe, Paytm), Net Banking, and Cash on Delivery (COD) for eligible domestic pin codes.',
  },
  {
    category: 'Payment & Security',
    question: 'Are transactions on LAX360 secure?',
    answer: 'All transactions are encrypted with 256-bit SSL security protocols and compliant with PCI-DSS Tier 1 standards. Your personal data and credentials are completely protected.',
  },
];

export const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Orders & Shipping', 'Medicines & Health', 'Furniture & Electronics', 'Returns & Refunds', 'Payment & Security'];

  const filteredFAQs = activeCategory === 'All'
    ? FAQ_DATA
    : FAQ_DATA.filter((item) => item.category === activeCategory);

  return (
    <main className="w-full bg-[#101820] text-[#F7F3EA] min-h-screen pt-28 sm:pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block font-semibold">
            CUSTOMER HELP CENTER
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#A9B0B5] font-light max-w-lg mx-auto leading-relaxed">
            Find answers to common questions about orders, multi-category shipping, returns, and account management.
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
              className={`px-4 py-2 text-xs uppercase tracking-wider transition-all border cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#C9A45C] text-[#101820] border-[#C9A45C] font-semibold shadow-md'
                  : 'bg-white/5 text-[#A9B0B5] border-white/10 hover:text-white hover:border-white/30'
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
                  className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer"
                >
                  <span className={`font-serif text-base sm:text-lg font-normal transition-colors ${
                    isOpen ? 'text-[#C9A45C]' : 'text-white group-hover:text-[#C9A45C]'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-6 h-6 rounded-full border border-white/15 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#C9A45C] text-[#101820]' : 'text-[#A9B0B5]'
                  }`}>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-3 pr-8 text-xs text-[#F7F3EA]/80 font-light leading-relaxed animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <NewsletterSection />
    </main>
  );
};
