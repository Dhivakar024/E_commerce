import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, X, CheckCircle2, ChevronDown, FileText, AlertCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const PrivacyConsent = ({
  acknowledged = false,
  onChange,
  hasRead: controlledHasRead,
  onReadChange,
  error = '',
  id = 'privacy-consent-checkbox',
  className = '',
}) => {
  const { isDark } = useTheme();
  const [internalHasRead, setInternalHasRead] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollContainerRef = useRef(null);

  const effectiveHasRead = controlledHasRead !== undefined ? controlledHasRead : internalHasRead;

  // Lock background scroll when Privacy Notice Modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  // Handle ESC key to close modal (without granting read status if unread)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Track scroll position inside the independently scrollable modal container
  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    const tolerance = 12; // 12px tolerance for sub-pixel / browser rounding differences

    if (scrollTop + clientHeight >= scrollHeight - tolerance) {
      if (!effectiveHasRead) {
        setInternalHasRead(true);
        onReadChange?.(true);
      }
    }
  };

  const handleCheckboxChange = (e) => {
    if (!effectiveHasRead) return;
    onChange?.(e.target.checked);
  };

  const handleDoneClick = () => {
    if (effectiveHasRead) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className={`space-y-2 select-none ${className}`}>
      {/* Checkbox Row */}
      <div className="flex items-start gap-3">
        <div className="relative flex items-center pt-0.5">
          <input
            type="checkbox"
            id={id}
            disabled={!effectiveHasRead}
            checked={acknowledged}
            onChange={handleCheckboxChange}
            className={`w-4 h-4 rounded-none transition-all duration-200 ${
              !effectiveHasRead
                ? 'cursor-not-allowed opacity-40 bg-neutral-200 dark:bg-neutral-800 border-neutral-400'
                : 'cursor-pointer accent-[#C9A45C] border-black/30 dark:border-white/30'
            }`}
            aria-describedby={`${id}-hint`}
          />
        </div>

        <label
          htmlFor={id}
          className={`text-xs leading-relaxed transition-colors ${
            !effectiveHasRead
              ? 'text-[#717D86] dark:text-[#A9B0B5] cursor-not-allowed'
              : isDark
              ? 'text-[#F7F3EA] cursor-pointer'
              : 'text-[#101820] cursor-pointer'
          }`}
        >
          <span>I have read and understood the </span>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-[#C9A45C] hover:text-[#B08B43] dark:hover:text-[#D8B872] underline font-semibold inline-flex items-center gap-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#C9A45C]"
          >
            <span>Privacy Notice</span>
            <FileText className="w-3 h-3 inline-block" />
          </button>
          <span>.</span>
        </label>
      </div>

      {/* State Indicators & Guidance */}
      <div id={`${id}-hint`} className="text-[11px] pl-7 space-y-1">
        {!effectiveHasRead ? (
          <span className="text-[#717D86] dark:text-[#A9B0B5] flex items-center gap-1 font-light">
            <ChevronDown className="w-3 h-3 text-[#C9A45C] animate-bounce" />
            <span>Click <strong>Privacy Notice</strong> above and scroll to the end to enable acknowledgement.</span>
          </span>
        ) : !acknowledged ? (
          <span className="text-[#C9A45C] dark:text-[#C9A45C] flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            <span>Notice reviewed. Please tick the checkbox above to confirm.</span>
          </span>
        ) : (
          <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3" />
            <span>Privacy Notice acknowledged.</span>
          </span>
        )}

        {/* Validation Error Message */}
        {error && (
          <div className="flex items-center gap-1.5 text-[11px] text-rose-600 dark:text-rose-400 pt-0.5 animate-fade-in font-medium">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Privacy Notice Modal Overlay */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-notice-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-fade-in"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
            aria-hidden="true"
          />

          {/* Modal Card */}
          <div
            className={`relative w-full max-w-3xl max-h-[90vh] flex flex-col border shadow-2xl z-10 transition-all duration-300 ${
              isDark
                ? 'bg-[#1B2630] border-white/15 text-[#F7F3EA]'
                : 'bg-white border-black/15 text-[#101820]'
            }`}
          >
            {/* Modal Header */}
            <div
              className={`p-4 sm:p-6 border-b flex items-center justify-between flex-shrink-0 ${
                isDark ? 'border-white/10 bg-[#151F28]' : 'border-black/10 bg-[#F8F6F0]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#C9A45C]/15 border border-[#C9A45C]/30 flex items-center justify-center text-[#C9A45C] flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h2
                    id="privacy-notice-title"
                    className={`font-serif text-lg sm:text-xl font-medium leading-tight ${
                      isDark ? 'text-white' : 'text-[#101820]'
                    }`}
                  >
                    Privacy Notice
                  </h2>
                  <span className="text-[10px] uppercase tracking-wider text-[#C9A45C] block font-semibold">
                    DPDP ACT 2023 COMPLIANT • LAX360 PVT LTD
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  isDark
                    ? 'text-[#A9B0B5] hover:text-white hover:bg-white/10'
                    : 'text-[#717D86] hover:text-[#101820] hover:bg-black/10'
                }`}
                aria-label="Close Privacy Notice"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Container */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="p-5 sm:p-7 overflow-y-auto max-h-[58vh] space-y-6 text-xs sm:text-sm font-light leading-relaxed scroll-smooth pr-4"
              tabIndex={0}
              aria-label="Scrollable Privacy Notice Content"
            >
              {/* Introduction Banner */}
              <div
                className={`p-4 border rounded-none text-xs space-y-1.5 ${
                  isDark
                    ? 'bg-[#151F28]/60 border-white/10 text-[#A9B0B5]'
                    : 'bg-[#EDE9DF]/60 border-black/10 text-[#4A5560]'
                }`}
              >
                <p className="font-semibold text-[#C9A45C]">
                  Digital Personal Data Protection (DPDP) Notice — Version 2.0
                </p>
                <p>
                  This Notice explains how <strong>LAX360 PVT LTD</strong> collects, uses, processes, stores, and safeguards your digital personal data in accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and applicable Indian data protection regulations.
                </p>
              </div>

              {/* Section 1 */}
              <section className="space-y-2">
                <h3 className={`font-serif text-sm sm:text-base font-semibold ${isDark ? 'text-white' : 'text-[#101820]'}`}>
                  1. Identity & Contact Details of the Data Fiduciary
                </h3>
                <p>
                  <strong>LAX360 PVT LTD</strong> acts as the Data Fiduciary responsible for determining the purpose and means of processing your personal data.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li><strong>Registered Headquarters:</strong> LAX360 Towers, Bandra Kurla Complex, Mumbai, Maharashtra 400051, India.</li>
                  <li><strong>Corporate Identity:</strong> U74999MH2024PTC123456</li>
                  <li><strong>Data Protection Officer (DPO):</strong> <span className="text-[#C9A45C]">dpo@lax360.com</span></li>
                  <li><strong>Grievance Officer:</strong> <span className="text-[#C9A45C]">grievance@lax360.com</span> | +91 (0) 22 2847 9000</li>
                </ul>
              </section>

              {/* Section 2 */}
              <section className="space-y-2">
                <h3 className={`font-serif text-sm sm:text-base font-semibold ${isDark ? 'text-white' : 'text-[#101820]'}`}>
                  2. Categories of Personal Data Collected
                </h3>
                <p>
                  We collect only the personal information strictly necessary for fulfilling our services:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs">
                  <li><strong>Customer & Contact Data:</strong> Full name, email address, mobile phone number, and delivery addresses provided during checkout, inquiry, or registration.</li>
                  <li><strong>Applicant & Recruitment Data:</strong> For career applications, we collect resume documents, educational credentials, work history, location, and portfolio links.</li>
                  <li><strong>Transaction & Order Details:</strong> Item selections, payment mode preferences, billing records, and delivery milestone logs. (Payment card details are tokenized by PCI-DSS certified gateways and never stored on our servers).</li>
                  <li><strong>Customer Inquiries & Feedback:</strong> Support ticket communications, customer reviews, ratings, and customer care interaction transcripts.</li>
                  <li><strong>Technical & Device Data:</strong> IP addresses, browser specifications, and session cookies required for authenticated session security and fraud prevention.</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section className="space-y-2">
                <h3 className={`font-serif text-sm sm:text-base font-semibold ${isDark ? 'text-white' : 'text-[#101820]'}`}>
                  3. Lawful & Specified Purposes of Processing
                </h3>
                <p>
                  Your digital personal data is processed solely for the following specified, legitimate purposes:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>Processing, packaging, insurance, and doorstep delivery of marketplace orders.</li>
                  <li>Responding to customer support queries, return requests, and warranty claims.</li>
                  <li>Screening and evaluating employment applications submitted through our Careers portal.</li>
                  <li>Verifying customer accounts, preventing fraudulent transactions, and ensuring platform security.</li>
                  <li>Fulfilling statutory tax, GST, invoicing, and regulatory reporting mandates under Indian law.</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section className="space-y-2">
                <h3 className={`font-serif text-sm sm:text-base font-semibold ${isDark ? 'text-white' : 'text-[#101820]'}`}>
                  4. Rights of the Data Principal under DPDP Act, 2023
                </h3>
                <p>
                  As a Data Principal under Indian law, you possess enforceable rights regarding your personal data:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs">
                  <li><strong>Right to Access Information:</strong> You may request a summary of your personal data being processed and the identities of third-party processors with whom it has been shared.</li>
                  <li><strong>Right to Correction & Erasure:</strong> You can update inaccurate personal data or request deletion of personal information that is no longer necessary for the specified purpose.</li>
                  <li><strong>Right of Grievance Redressal:</strong> You have the right to register grievances with our Data Protection Officer, which will be acknowledged within 24 hours and addressed within statutory timelines.</li>
                  <li><strong>Right to Nominate:</strong> You may nominate an individual to exercise your data rights in the event of death or incapacity.</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section className="space-y-2">
                <h3 className={`font-serif text-sm sm:text-base font-semibold ${isDark ? 'text-white' : 'text-[#101820]'}`}>
                  5. Withdrawal of Consent
                </h3>
                <p>
                  You may withdraw your consent for any non-mandatory processing at any time through your Account Settings or by emailing <span className="text-[#C9A45C]">dpo@lax360.com</span>. Withdrawal of consent shall not affect the lawfulness of processing undertaken prior to such withdrawal.
                </p>
              </section>

              {/* Section 6 */}
              <section className="space-y-2">
                <h3 className={`font-serif text-sm sm:text-base font-semibold ${isDark ? 'text-white' : 'text-[#101820]'}`}>
                  6. Third-Party Data Processors & Safeguards
                </h3>
                <p>
                  We share personal information strictly on a need-to-know basis with vetted Data Processors:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li><strong>Logistics & Courier Partners:</strong> For order dispatch and OTP-verified doorstep handover (e.g. Blue Dart, Delhivery).</li>
                  <li><strong>Payment Aggregators:</strong> RBI-authorized payment processors operating with 256-bit SSL encryption.</li>
                  <li><strong>Secure Cloud Infrastructure:</strong> Tier-4 data centers located within the Republic of India compliant with ISO/IEC 27001 data security standards.</li>
                </ul>
              </section>

              {/* Section 7 */}
              <section className="space-y-2">
                <h3 className={`font-serif text-sm sm:text-base font-semibold ${isDark ? 'text-white' : 'text-[#101820]'}`}>
                  7. Data Retention & Secure Disposal
                </h3>
                <p>
                  Personal data is retained only for the duration necessary to satisfy the purpose of collection or comply with statutory accounting and tax regulations. Upon expiry of the retention timeline, data is securely erased or anonymized.
                </p>
              </section>

              {/* Section 8 - End of Document */}
              <section className={`p-4 border text-xs space-y-1.5 ${
                isDark
                  ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-800'
              }`}>
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>End of Privacy Notice</span>
                </div>
                <p className="font-light">
                  By clicking "Done" below and selecting the acknowledgement checkbox on the form, you confirm that you have reviewed and understood these terms.
                </p>
              </section>
            </div>

            {/* Modal Footer & Actions */}
            <div
              className={`p-4 sm:p-5 border-t flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0 ${
                isDark ? 'border-white/10 bg-[#151F28]' : 'border-black/10 bg-[#F8F6F0]'
              }`}
            >
              {/* Progress / Status Indication */}
              <div className="text-xs">
                {!effectiveHasRead ? (
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium">
                    <ChevronDown className="w-4 h-4 animate-bounce" />
                    <span>Please scroll to the end of the Privacy Notice to continue.</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold animate-fade-in">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>✓ Privacy Notice reviewed — you have reached the end</span>
                  </div>
                )}
              </div>

              {/* Done Button */}
              <button
                type="button"
                onClick={handleDoneClick}
                disabled={!effectiveHasRead}
                className={`w-full sm:w-auto px-7 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all shadow-md flex items-center justify-center gap-2 ${
                  !effectiveHasRead
                    ? 'bg-neutral-300 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-500 border border-neutral-400/20 cursor-not-allowed opacity-50'
                    : 'bg-[#C9A45C] hover:bg-[#D8B872] text-[#101820] cursor-pointer'
                }`}
              >
                <span>Done</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
