import React, { useState } from 'react';
import { ChevronDown, Truck, RotateCcw, FileText, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ProductInfoTabs = ({ product }) => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('specs');
  const [openAccordions, setOpenAccordions] = useState({
    description: false,
    specs: true,
    shipping: false,
    returns: false,
  });

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const categorySlug = (product.categorySlug || product.category || '').toLowerCase();

  return (
    <div className={`mt-14 pt-10 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
      {/* Desktop Tabs Header (Hidden on Mobile) */}
      <div className={`hidden md:flex items-center space-x-8 border-b pb-4 mb-8 ${
        isDark ? 'border-white/10' : 'border-black/10'
      }`}>
        <button
          type="button"
          onClick={() => setActiveTab('specs')}
          className={`text-xs uppercase tracking-ultra pb-2 transition-colors relative cursor-pointer ${
            activeTab === 'specs'
              ? 'text-[#C9A45C] font-semibold'
              : isDark ? 'text-[#A9B0B5] hover:text-white' : 'text-[#717D86] hover:text-[#101820]'
          }`}
        >
          <span>Specifications & Details</span>
          {activeTab === 'specs' && (
            <span className="absolute -bottom-4 left-0 right-0 h-[2px] bg-[#C9A45C]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('description')}
          className={`text-xs uppercase tracking-ultra pb-2 transition-colors relative cursor-pointer ${
            activeTab === 'description'
              ? 'text-[#C9A45C] font-semibold'
              : isDark ? 'text-[#A9B0B5] hover:text-white' : 'text-[#717D86] hover:text-[#101820]'
          }`}
        >
          <span>Overview</span>
          {activeTab === 'description' && (
            <span className="absolute -bottom-4 left-0 right-0 h-[2px] bg-[#C9A45C]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('shipping')}
          className={`text-xs uppercase tracking-ultra pb-2 transition-colors relative cursor-pointer ${
            activeTab === 'shipping'
              ? 'text-[#C9A45C] font-semibold'
              : isDark ? 'text-[#A9B0B5] hover:text-white' : 'text-[#717D86] hover:text-[#101820]'
          }`}
        >
          <span>Shipping & Logistics</span>
          {activeTab === 'shipping' && (
            <span className="absolute -bottom-4 left-0 right-0 h-[2px] bg-[#C9A45C]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('returns')}
          className={`text-xs uppercase tracking-ultra pb-2 transition-colors relative cursor-pointer ${
            activeTab === 'returns'
              ? 'text-[#C9A45C] font-semibold'
              : isDark ? 'text-[#A9B0B5] hover:text-white' : 'text-[#717D86] hover:text-[#101820]'
          }`}
        >
          <span>Returns & Authenticity</span>
          {activeTab === 'returns' && (
            <span className="absolute -bottom-4 left-0 right-0 h-[2px] bg-[#C9A45C]" />
          )}
        </button>
      </div>

      {/* Desktop Tab Contents */}
      <div className="hidden md:block">
        {/* 1. Specifications Tab */}
        {activeTab === 'specs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
            <div className={`p-6 border space-y-4 ${
              isDark ? 'bg-[#1B2630] border-white/10' : 'bg-white border-black/10'
            }`}>
              <h3 className={`font-serif text-lg font-medium border-b pb-2 ${
                isDark ? 'text-white border-white/10' : 'text-[#101820] border-black/10'
              }`}>
                Technical Attributes
              </h3>
              <dl className={`divide-y text-xs ${
                isDark ? 'divide-white/5' : 'divide-black/5'
              }`}>
                <div className="py-2.5 flex justify-between">
                  <dt className={isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}>Brand</dt>
                  <dd className="font-semibold">{product.brand || 'LAX360 Curated'}</dd>
                </div>
                <div className="py-2.5 flex justify-between">
                  <dt className={isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}>Category</dt>
                  <dd className="font-semibold capitalize">{product.category}</dd>
                </div>
                <div className="py-2.5 flex justify-between">
                  <dt className={isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}>Subcategory</dt>
                  <dd className="font-semibold">{product.subcategory || 'General'}</dd>
                </div>
                {product.material && (
                  <div className="py-2.5 flex justify-between">
                    <dt className={isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}>Material / Composition</dt>
                    <dd className="font-semibold">{product.material}</dd>
                  </div>
                )}
                {product.dimensions && (
                  <div className="py-2.5 flex justify-between">
                    <dt className={isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}>Dimensions</dt>
                    <dd className="font-semibold">{product.dimensions}</dd>
                  </div>
                )}
                {product.ram && (
                  <div className="py-2.5 flex justify-between">
                    <dt className={isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}>Memory / RAM</dt>
                    <dd className="font-semibold">{product.ram}</dd>
                  </div>
                )}
                {product.storage && (
                  <div className="py-2.5 flex justify-between">
                    <dt className={isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}>Internal Storage</dt>
                    <dd className="font-semibold">{product.storage}</dd>
                  </div>
                )}
                {product.volume && (
                  <div className="py-2.5 flex justify-between">
                    <dt className={isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}>Net Volume / Size</dt>
                    <dd className="font-semibold">{product.volume}</dd>
                  </div>
                )}
                {product.form && (
                  <div className="py-2.5 flex justify-between">
                    <dt className={isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}>Item Form</dt>
                    <dd className="font-semibold">{product.form}</dd>
                  </div>
                )}
                {product.skinType && (
                  <div className="py-2.5 flex justify-between">
                    <dt className={isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}>Recommended Skin Type</dt>
                    <dd className="font-semibold">{product.skinType}</dd>
                  </div>
                )}
                {product.dosage && (
                  <div className="py-2.5 flex justify-between">
                    <dt className={isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}>Recommended Dosage</dt>
                    <dd className="font-semibold">{product.dosage}</dd>
                  </div>
                )}
              </dl>
            </div>

            <div className={`p-6 border space-y-4 ${
              isDark ? 'bg-[#1B2630] border-white/10' : 'bg-white border-black/10'
            }`}>
              <h3 className={`font-serif text-lg font-medium border-b pb-2 ${
                isDark ? 'text-white border-white/10' : 'text-[#101820] border-black/10'
              }`}>
                Quality Assurance
              </h3>
              <ul className={`space-y-3 text-xs ${isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'}`}>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A45C] flex-shrink-0 mt-0.5" />
                  <span>100% Genuine and authenticated products directly sourced from verified manufacturers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A45C] flex-shrink-0 mt-0.5" />
                  <span>Includes all original manufacturer documentation, warranties, and sealed packaging.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A45C] flex-shrink-0 mt-0.5" />
                  <span>Full customer support and hassle-free replacements if received in damaged condition.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* 2. Overview Tab */}
        {activeTab === 'description' && (
          <div className={`p-8 border space-y-4 max-w-3xl animate-fade-in ${
            isDark ? 'bg-[#1B2630] border-white/10 text-white' : 'bg-white border-black/10 text-[#101820]'
          }`}>
            <h3 className="font-serif text-xl font-medium">Product Overview</h3>
            <p className={`text-xs sm:text-sm font-light leading-relaxed ${
              isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
            }`}>
              {product.description}
            </p>
          </div>
        )}

        {/* 3. Shipping Tab */}
        {activeTab === 'shipping' && (
          <div className={`p-8 border space-y-6 max-w-3xl animate-fade-in ${
            isDark ? 'bg-[#1B2630] border-white/10 text-white' : 'bg-white border-black/10 text-[#101820]'
          }`}>
            <div className="flex items-center gap-3">
              <Truck className="w-6 h-6 text-[#C9A45C]" />
              <h3 className="font-serif text-xl font-medium">Delivery & Logistics</h3>
            </div>
            <div className={`space-y-3 text-xs sm:text-sm font-light leading-relaxed ${
              isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
            }`}>
              <p>
                All orders are dispatched in reinforced, tamper-proof packaging. Orders placed before 2:00 PM IST are processed the same business day.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 pt-2">
                <li>Standard Delivery: 2 to 4 business days nationwide.</li>
                <li>Priority Air Express: 24 to 48 hours in metro cities.</li>
                <li>Complimentary shipping on all cart values exceeding ₹1,500.</li>
              </ul>
            </div>
          </div>
        )}

        {/* 4. Returns Tab */}
        {activeTab === 'returns' && (
          <div className={`p-8 border space-y-6 max-w-3xl animate-fade-in ${
            isDark ? 'bg-[#1B2630] border-white/10 text-white' : 'bg-white border-black/10 text-[#101820]'
          }`}>
            <div className="flex items-center gap-3">
              <RotateCcw className="w-6 h-6 text-[#C9A45C]" />
              <h3 className="font-serif text-xl font-medium">14-Day Return Guarantee</h3>
            </div>
            <p className={`text-xs sm:text-sm font-light leading-relaxed ${
              isDark ? 'text-[#A9B0B5]' : 'text-[#4A5560]'
            }`}>
              We stand behind every item listed on LAX360. If you are not completely satisfied, return the unopened product in its original condition within 14 days of delivery for a full refund or instant replacement.
            </p>
          </div>
        )}
      </div>

      {/* Mobile Accordions View */}
      <div className="md:hidden space-y-3">
        {/* Accordion 1: Specs */}
        <div className={`border ${isDark ? 'bg-[#1B2630] border-white/10' : 'bg-white border-black/10'}`}>
          <button
            type="button"
            onClick={() => toggleAccordion('specs')}
            className="w-full p-4 flex items-center justify-between text-xs uppercase tracking-wider font-semibold cursor-pointer"
          >
            <span>Specifications & Details</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openAccordions.specs ? 'rotate-180 text-[#C9A45C]' : ''}`} />
          </button>
          {openAccordions.specs && (
            <div className={`px-4 pb-4 border-t text-xs pt-3 space-y-2 ${
              isDark ? 'border-white/5 text-[#A9B0B5]' : 'border-black/5 text-[#4A5560]'
            }`}>
              <div className="flex justify-between py-1 border-b border-black/5 dark:border-white/5">
                <span>Brand</span>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#101820]'}`}>{product.brand || 'LAX360 Curated'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-black/5 dark:border-white/5">
                <span>Category</span>
                <span className={`font-semibold capitalize ${isDark ? 'text-white' : 'text-[#101820]'}`}>{product.category}</span>
              </div>
              {product.material && (
                <div className="flex justify-between py-1">
                  <span>Material</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#101820]'}`}>{product.material}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Accordion 2: Description */}
        <div className={`border ${isDark ? 'bg-[#1B2630] border-white/10' : 'bg-white border-black/10'}`}>
          <button
            type="button"
            onClick={() => toggleAccordion('description')}
            className="w-full p-4 flex items-center justify-between text-xs uppercase tracking-wider font-semibold cursor-pointer"
          >
            <span>Overview</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openAccordions.description ? 'rotate-180 text-[#C9A45C]' : ''}`} />
          </button>
          {openAccordions.description && (
            <div className={`px-4 pb-4 border-t text-xs font-light pt-3 leading-relaxed ${
              isDark ? 'border-white/5 text-[#A9B0B5]' : 'border-black/5 text-[#4A5560]'
            }`}>
              {product.description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
