import React, { useState } from 'react';
import { ChevronDown, Truck, RotateCcw } from 'lucide-react';

export const ProductInfoTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [openAccordions, setOpenAccordions] = useState({
    description: true,
    specs: false,
    shipping: false,
    returns: false,
  });

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="mt-14 pt-10 border-t border-black/10">
      {/* Desktop Tabs Header (Hidden on Mobile) */}
      <div className="hidden md:flex items-center space-x-8 border-b border-black/10 pb-4 mb-8">
        <button
          type="button"
          onClick={() => setActiveTab('description')}
          className={`text-xs uppercase tracking-ultra pb-2 transition-colors relative ${
            activeTab === 'description'
              ? 'text-[#C9A45C] font-semibold'
              : 'text-[#A9B0B5] hover:text-[#101820]'
          }`}
        >
          <span>Description</span>
          {activeTab === 'description' && (
            <span className="absolute -bottom-4 left-0 right-0 h-[2px] bg-[#C9A45C]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('specs')}
          className={`text-xs uppercase tracking-ultra pb-2 transition-colors relative ${
            activeTab === 'specs'
              ? 'text-[#C9A45C] font-semibold'
              : 'text-[#A9B0B5] hover:text-[#101820]'
          }`}
        >
          <span>Specifications & Details</span>
          {activeTab === 'specs' && (
            <span className="absolute -bottom-4 left-0 right-0 h-[2px] bg-[#C9A45C]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('shipping')}
          className={`text-xs uppercase tracking-ultra pb-2 transition-colors relative ${
            activeTab === 'shipping'
              ? 'text-[#C9A45C] font-semibold'
              : 'text-[#A9B0B5] hover:text-[#101820]'
          }`}
        >
          <span>Shipping & Dispatch</span>
          {activeTab === 'shipping' && (
            <span className="absolute -bottom-4 left-0 right-0 h-[2px] bg-[#C9A45C]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('returns')}
          className={`text-xs uppercase tracking-ultra pb-2 transition-colors relative ${
            activeTab === 'returns'
              ? 'text-[#C9A45C] font-semibold'
              : 'text-[#A9B0B5] hover:text-[#101820]'
          }`}
        >
          <span>Returns & Exchanges</span>
          {activeTab === 'returns' && (
            <span className="absolute -bottom-4 left-0 right-0 h-[2px] bg-[#C9A45C]" />
          )}
        </button>
      </div>

      {/* Desktop Tab Contents */}
      <div className="hidden md:block">
        {activeTab === 'description' && (
          <div className="space-y-4 max-w-3xl animate-fade-in">
            <h4 className="font-serif text-xl text-[#101820] font-normal mb-2">
              The Architecture of {product.name}
            </h4>
            <p className="text-sm text-[#101820]/80 font-light leading-relaxed">
              {product.description}
            </p>
            <p className="text-xs text-[#A9B0B5] font-light leading-relaxed">
              Engineered with sculptural precision, this piece balances structural definition with fluid ease. Finished with fine single-needle stitching, reinforced internal canvas, and French seams to guarantee longevity.
            </p>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="grid grid-cols-2 gap-8 max-w-3xl animate-fade-in text-xs">
            <div className="space-y-3.5">
              <div>
                <span className="text-[#A9B0B5] uppercase tracking-widest block mb-0.5 font-medium">Composition</span>
                <span className="text-[#101820] font-semibold">100% Noble Natural Fibers (Grade-A European Mill)</span>
              </div>
              <div>
                <span className="text-[#A9B0B5] uppercase tracking-widest block mb-0.5 font-medium">Silhouette & Fit</span>
                <span className="text-[#101820] font-semibold">True to size; designed for a tailored yet relaxed drape</span>
              </div>
              <div>
                <span className="text-[#A9B0B5] uppercase tracking-widest block mb-0.5 font-medium">Hardware & Buttons</span>
                <span className="text-[#101820] font-semibold">Natural Mother-of-Pearl / Palladium-plated brass</span>
              </div>
            </div>
            <div className="space-y-3.5">
              <div>
                <span className="text-[#A9B0B5] uppercase tracking-widest block mb-0.5 font-medium">Garment Care</span>
                <span className="text-[#101820] font-semibold">Specialist dry clean or delicate cold hand wash</span>
              </div>
              <div>
                <span className="text-[#A9B0B5] uppercase tracking-widest block mb-0.5 font-medium">Provenance</span>
                <span className="text-[#101820] font-semibold">Designed in Paris • Crafted in small batches</span>
              </div>
              <div>
                <span className="text-[#A9B0B5] uppercase tracking-widest block mb-0.5 font-medium">Product Code</span>
                <span className="text-[#101820] font-mono font-semibold">LAX-{(product.slug || 'prod').toUpperCase().slice(0, 10)}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-4 max-w-3xl animate-fade-in text-xs text-[#101820]/85 font-light leading-relaxed">
            <div className="flex items-start gap-3 p-4 bg-white border border-black/10 shadow-sm">
              <Truck className="w-5 h-5 text-[#C9A45C] flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-semibold text-[#101820] text-sm mb-1">Complimentary Insured Delivery Across India</h5>
                <p className="text-[#A9B0B5]">
                  All orders are dispatched within 24 business hours from our Mumbai atelier. Delivery takes 2–4 business days via premium air freight with signature verification.
                </p>
              </div>
            </div>
            <p className="text-[#A9B0B5]">
              International express delivery available to over 90 countries via DHL Express (3–5 business days).
            </p>
          </div>
        )}

        {activeTab === 'returns' && (
          <div className="space-y-4 max-w-3xl animate-fade-in text-xs text-[#101820]/85 font-light leading-relaxed">
            <div className="flex items-start gap-3 p-4 bg-white border border-black/10 shadow-sm">
              <RotateCcw className="w-5 h-5 text-[#C9A45C] flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-semibold text-[#101820] text-sm mb-1">14-Day Complimentary Returns & Size Exchanges</h5>
                <p className="text-[#A9B0B5]">
                  If the fit or drape is not absolute perfection, request a complimentary doorstep pickup within 14 days of delivery. Garments must remain unworn with original security tags attached.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Accordions (Shown on Mobile & Tablet) */}
      <div className="md:hidden divide-y divide-black/10">
        {/* Accordion 1: Description */}
        <div>
          <button
            type="button"
            onClick={() => toggleAccordion('description')}
            className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-widest text-[#101820] font-semibold"
          >
            <span>Description</span>
            <ChevronDown
              className={`w-4 h-4 text-[#C9A45C] transition-transform duration-300 ${
                openAccordions.description ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openAccordions.description && (
            <div className="pb-5 text-xs text-[#101820]/80 font-light leading-relaxed space-y-2">
              <p>{product.description}</p>
              <p className="text-[#A9B0B5]">
                Crafted with noble natural textiles and timeless architectural cuts.
              </p>
            </div>
          )}
        </div>

        {/* Accordion 2: Specs */}
        <div>
          <button
            type="button"
            onClick={() => toggleAccordion('specs')}
            className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-widest text-[#101820] font-semibold"
          >
            <span>Specifications & Details</span>
            <ChevronDown
              className={`w-4 h-4 text-[#C9A45C] transition-transform duration-300 ${
                openAccordions.specs ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openAccordions.specs && (
            <div className="pb-5 text-xs text-[#101820]/80 font-light space-y-3">
              <div>
                <span className="text-[#A9B0B5] block">Material</span>
                <span className="text-[#101820] font-semibold">100% Noble Natural Fibers</span>
              </div>
              <div>
                <span className="text-[#A9B0B5] block">Fit</span>
                <span className="text-[#101820] font-semibold">True to size bespoke drape</span>
              </div>
              <div>
                <span className="text-[#A9B0B5] block">Care</span>
                <span className="text-[#101820] font-semibold">Specialist dry clean or cold delicate wash</span>
              </div>
            </div>
          )}
        </div>

        {/* Accordion 3: Shipping */}
        <div>
          <button
            type="button"
            onClick={() => toggleAccordion('shipping')}
            className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-widest text-[#101820] font-semibold"
          >
            <span>Shipping & Dispatch</span>
            <ChevronDown
              className={`w-4 h-4 text-[#C9A45C] transition-transform duration-300 ${
                openAccordions.shipping ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openAccordions.shipping && (
            <div className="pb-5 text-xs text-[#A9B0B5] font-light leading-relaxed">
              Complimentary insured shipping across India in 2–4 business days with signature tracking.
            </div>
          )}
        </div>

        {/* Accordion 4: Returns */}
        <div>
          <button
            type="button"
            onClick={() => toggleAccordion('returns')}
            className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-widest text-[#101820] font-semibold"
          >
            <span>Returns & Exchanges</span>
            <ChevronDown
              className={`w-4 h-4 text-[#C9A45C] transition-transform duration-300 ${
                openAccordions.returns ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openAccordions.returns && (
            <div className="pb-5 text-xs text-[#A9B0B5] font-light leading-relaxed">
              Hassle-free 14-day return and size exchange policy with complimentary home pickup.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
