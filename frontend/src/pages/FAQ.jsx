import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { useTheme } from '../context/ThemeContext';

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
  const { isDark } = useTheme();
  const [openIdx, setOpenIdx] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Orders & Shipping', 'Medicines & Health', 'Furniture & Electronics', 'Returns & Refunds', 'Payment & Security'];

  const filteredFAQs = activeCategory === 'All'
    ? FAQ_DATA
    : FAQ_DATA.filter((item) => item.category === activeCategory);

  return (
    <main className={`w-full min-h-screen pt-28 sm:pt-32 pb-24 transition-colors duration-250 ${
      isDark ? 'bg-[#101820] text-[#F7F3EA]' : 'bg-[#F8F6F0] text-[#101820]'
    }`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs uppercase tracking-ultra text-[#C9A45C] block font-semibold">
            CUSTOMER HELP CENTER
          </span>
          <h1 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-normal ${
            isDark ? 'text-white' : 'text-[#101820]'
          }`}>
            Frequently Asked Questions
          </h1>
          <p className={`text-xs sm:text-sm font-light leading-relaxed max-w-lg mx-auto ${
            isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
          }`}>
            Find answers to common questions about ordering, category guidelines, nationwide shipping, and returns.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10 pb-6 border-b border-black/10 dark:border-white/10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveCategory(cat);
                setOpenIdx(0);
              }}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#C9A45C] text-[#101820] font-semibold shadow-md'
                  : isDark
                    ? 'bg-white/5 text-[#F7F3EA]/70 hover:text-white border border-white/10'
                    : 'bg-white text-[#101820]/70 hover:text-[#101820] border border-black/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`border transition-colors duration-200 ${
                  isDark
                    ? isOpen ? 'bg-[#1B2630] border-[#C9A45C]/50' : 'bg-[#1B2630]/40 border-white/10 hover:border-white/20'
                    : isOpen ? 'bg-white border-[#B08B43]/50 shadow-md' : 'bg-white border-black/10 hover:border-black/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className={`font-serif text-base sm:text-lg font-normal ${
                    isOpen ? 'text-[#C9A45C]' : isDark ? 'text-white' : 'text-[#101820]'
                  }`}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#C9A45C]' : isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className={`px-5 pb-5 pt-1 text-xs sm:text-sm font-light leading-relaxed border-t border-black/5 dark:border-white/5 animate-fade-in ${
                    isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
                  }`}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-20">
        <NewsletterSection />
      </div>
    </main>
  );
};
