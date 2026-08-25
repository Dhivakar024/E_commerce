import React, { useState } from 'react';
import { ChevronDown, Truck, RotateCcw, FileText, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ProductInfoTabs = ({ product }) => {
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
    <div className="mt-14 pt-10 border-t border-black/10">
      {/* Desktop Tabs Header (Hidden on Mobile) */}
      <div className="hidden md:flex items-center space-x-8 border-b border-black/10 pb-4 mb-8">
        <button
          type="button"
          onClick={() => setActiveTab('specs')}
          className={`text-xs uppercase tracking-ultra pb-2 transition-colors relative cursor-pointer ${
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
          onClick={() => setActiveTab('description')}
          className={`text-xs uppercase tracking-ultra pb-2 transition-colors relative cursor-pointer ${
            activeTab === 'description'
              ? 'text-[#C9A45C] font-semibold'
              : 'text-[#A9B0B5] hover:text-[#101820]'
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
          className={`text-xs uppercase tracking-ultra pb-2 transition-colors relative cursor-pointer ${
            activeTab === 'returns'
              ? 'text-[#C9A45C] font-semibold'
              : 'text-[#A9B0B5] hover:text-[#101820]'
          }`}
        >
          <span>Guarantees & Returns</span>
          {activeTab === 'returns' && (
            <span className="absolute -bottom-4 left-0 right-0 h-[2px] bg-[#C9A45C]" />
          )}
        </button>
      </div>

      {/* Desktop Tab Contents */}
      <div className="hidden md:block">
        {/* SPECIFICATIONS TAB (Category-Specific) */}
        {activeTab === 'specs' && (
          <div className="max-w-3xl animate-fade-in text-xs">
            {/* Category: MEDICINES */}
            {categorySlug === 'medicines' && (
              <div className="space-y-4">
                {product.prescriptionRequired && (
                  <div className="p-4 bg-amber-50 border border-amber-300 text-amber-900 rounded-sm flex items-center gap-3">
                    <FileText className="w-5 h-5 text-amber-700 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-xs uppercase tracking-wider">Prescription Required Medication</h5>
                      <p className="text-[11px] text-amber-800/90 font-light mt-0.5">
                        Please upload or present a valid medical practitioner prescription during checkout or to our delivery courier.
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-x-8 gap-y-4 p-5 bg-white border border-black/10 shadow-sm">
                  <div>
                    <span className="text-[#A9B0B5] uppercase tracking-widest block mb-1 font-medium">Manufacturer / Brand</span>
                    <span className="text-[#101820] font-semibold text-sm">{product.brand || 'NutriCare Essentials'}</span>
                  </div>
                  <div>
                    <span className="text-[#A9B0B5] uppercase tracking-widest block mb-1 font-medium">Dosage Form</span>
                    <span className="text-[#101820] font-semibold text-sm">{product.form || 'Oral Formulation'}</span>
                  </div>
                  <div>
                    <span className="text-[#A9B0B5] uppercase tracking-widest block mb-1 font-medium">Pack Size</span>
                    <span className="text-[#101820] font-semibold text-sm">{product.packSize || 'Standard Sealed Pack'}</span>
                  </div>
                  <div>
                    <span className="text-[#A9B0B5] uppercase tracking-widest block mb-1 font-medium">Expiry / Shelf Life</span>
                    <span className="text-[#101820] font-semibold text-sm">{product.expiry || '12/2027'}</span>
                  </div>
                  <div>
                    <span className="text-[#A9B0B5] uppercase tracking-widest block mb-1 font-medium">Category / Usage</span>
                    <span className="text-[#101820] font-semibold text-sm">{product.subcategory || 'Healthcare Essentials'}</span>
                  </div>
                  <div>
                    <span className="text-[#A9B0B5] uppercase tracking-widest block mb-1 font-medium">Prescription Status</span>
                    <span className={`font-semibold text-sm ${product.prescriptionRequired ? 'text-amber-700' : 'text-emerald-700'}`}>
                      {product.prescriptionRequired ? 'Prescription Required' : 'Over-the-Counter (OTC)'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Category: ELECTRONICS */}
            {categorySlug === 'electronics' && (
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 p-5 bg-white border border-black/10 shadow-sm">
                <div>
                  <span className="text-[#A9B0B5] uppercase tracking-widest block mb-1 font-medium">Brand & Model</span>
                  <span className="text-[#101820] font-semibold text-sm">{product.brand || 'LAX360 Tech'}</span>
                </div>
                <div>
                  <span className="text-[#A9B0B5] uppercase tracking-widest block mb-1 font-medium">RAM Memory</span>
                  <span className="text-[#101820] font-semibold text-sm">{product.ram || 'High-Performance Unified RAM'}</span>
                </div>
                <div>
                  <span className="text-[#A9B0B5] uppercase tracking-widest block mb-1 font-medium">Storage Capacity</span>
                  <span className="text-[#101820] font-semibold text-sm">{product.storage || 'High-Speed NVMe Solid State'}</span>
                </div>
                <div>
                  <span className="text-[#A9B0B5] uppercase tracking-widest block mb-1 font-medium">Processor / Chipset</span>
                  <span className="text-[#101820] font-semibold text-sm">{product.processor || 'Multi-Core Neural Processor'}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[#A9B0B5] uppercase tracking-widest block mb-1 font-medium">Official Warranty</span>
                  <span className="text-[#101820] font-semibold text-sm">{product.warranty || '2 Years Manufacturer Warranty Included'}</span>
                </div>
              </div>
            )}

            {/* Category: FURNITURE */}
            {categorySlug === 'furniture' && (
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 p-5 bg-white border border-black/10 shadow-sm">
                <div>
                  <span className="text-[#A9B0B5] uppercase tracking-widest block mb-1 font-medium">Material Composition</span>
                  <span className="text-[#101820] font-semibold text-sm">{product.material || 'Solid Hardwood & Premium Upholstery'}</span>
                </div>
                <div>
                  <span className="text-[#A9B0B5] uppercase tracking-widest block mb-1 font-medium">Dimensions</span>
                  <span className="text-[#101820] font-semibold text-sm">{product.dimensions || 'Standard Dimensions'}</span>
                </div>
                <div>
                  <span className="text-[#A9B0B5] uppercase tracking-widest block mb-1 font-medium">Net Weight</span>
                  <span className="text-[#101820] font-semibold text-sm">{product.weight || '25 kg'}</span>
                </div>
                <div>
                  <span className="text-[#A9B0B5] uppercase tracking-widest block mb-1 font-medium">Target Room</span>
                  <span className="text-[#101820] font-semibold text-sm">{product.roomType || product.subcategory || 'Living Room'}</span>
                </div>
              </div>
            )}

            {/* Category: COSMETICS */}
            {categorySlug === 'cosmetics' && (
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 p-5 bg-white border border-black/10 shadow-sm">
                <div>
                  <span className="text-[#A9B0B5] uppercase tracking-widest block mb-1 font-medium">Brand</span>
                  <span className="text-[#101820] font-semibold text-sm">{product.brand || 'LuxeBotanics'}</span>
                </div>
                <div>
                  <span className="text-[#A9B0B5] uppercase tracking-widest block mb-1 font-medium">Recommended Skin Type</span>
                  <span className="text-[#101820] font-semibold text-sm">{product.skinType || 'All Skin Types'}</span>
                </div>
                <div>
                  <span className="text-[#A9B0B5] uppercase tracking-widest block mb-1 font-medium">Shade / Color Variant</span>
                  <span className="text-[#101820] font-semibold text-sm">{product.shade || 'Universal Luminous'}</span>
                </div>
                <div>
                  <span className="text-[#A9B0B5] uppercase tracking-widest block mb-1 font-medium">Net Volume / Weight</span>
                  <span className="text-[#101820] font-semibold text-sm">{product.volume || '50 ml'}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[#A9B0B5] uppercase tracking-widest block mb-1 font-medium">Texture & Finish</span>
                  <span className="text-[#101820] font-semibold text-sm">{product.finish || 'Silky Radiant Finish'}</span>
                </div>
              </div>
            )}

            {/* Category: FASHION (Default) */}
            {(categorySlug === 'fashion' || !['furniture', 'electronics', 'medicines', 'cosmetics'].includes(categorySlug)) && (
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 p-5 bg-white border border-black/10 shadow-sm">
                <div>
                  <span className="text-[#A9B0B5] uppercase tracking-widest block mb-1 font-medium">Fabric & Material</span>
                  <span className="text-[#101820] font-semibold text-sm">{product.material || '100% Noble Natural Fibers'}</span>
                </div>
                <div>
                  <span className="text-[#A9B0B5] uppercase tracking-widest block mb-1 font-medium">Silhouette & Fit</span>
                  <span className="text-[#101820] font-semibold text-sm">{product.fit || 'True to size tailored drape'}</span>
                </div>
                <div>
                  <span className="text-[#A9B0B5] uppercase tracking-widest block mb-1 font-medium">Available Sizes</span>
                  <span className="text-[#101820] font-semibold text-sm">{product.sizes?.join(', ') || 'XS, S, M, L, XL'}</span>
                </div>
                <div>
                  <span className="text-[#A9B0B5] uppercase tracking-widest block mb-1 font-medium">Care Instructions</span>
                  <span className="text-[#101820] font-semibold text-sm">Delicate cold wash or dry clean</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* OVERVIEW TAB */}
        {activeTab === 'description' && (
          <div className="space-y-4 max-w-3xl animate-fade-in">
            <h4 className="font-serif text-xl text-[#101820] font-medium mb-2">
              About {product.name}
            </h4>
            <p className="text-sm text-[#101820]/80 font-light leading-relaxed">
              {product.description}
            </p>
            <p className="text-xs text-[#A9B0B5] font-light leading-relaxed">
              Every item at LAX360 PVT LTD undergoes rigorous quality inspection and certified authenticity verification before dispatch.
            </p>
          </div>
        )}

        {/* SHIPPING TAB */}
        {activeTab === 'shipping' && (
          <div className="space-y-4 max-w-3xl animate-fade-in text-xs text-[#101820]/85 font-light leading-relaxed">
            <div className="flex items-start gap-3 p-4 bg-white border border-black/10 shadow-sm">
              <Truck className="w-5 h-5 text-[#C9A45C] flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-semibold text-[#101820] text-sm mb-1">Fast & Insured Delivery Across India</h5>
                <p className="text-[#A9B0B5]">
                  Orders are packed in tamper-proof protective packaging and dispatched within 24 business hours. Express delivery reaches your address in 2–4 business days.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* RETURNS TAB */}
        {activeTab === 'returns' && (
          <div className="space-y-4 max-w-3xl animate-fade-in text-xs text-[#101820]/85 font-light leading-relaxed">
            <div className="flex items-start gap-3 p-4 bg-white border border-black/10 shadow-sm">
              <RotateCcw className="w-5 h-5 text-[#C9A45C] flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-semibold text-[#101820] text-sm mb-1">14-Day Easy Return & Replacement Window</h5>
                <p className="text-[#A9B0B5]">
                  If your order does not meet expectations, request an instant return or replacement through your LAX360 customer portal.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Accordions */}
      <div className="md:hidden divide-y divide-black/10">
        {/* Accordion 1: Specs */}
        <div>
          <button
            type="button"
            onClick={() => toggleAccordion('specs')}
            className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-widest text-[#101820] font-semibold cursor-pointer"
          >
            <span>Specifications & Details</span>
            <ChevronDown
              className={`w-4 h-4 text-[#C9A45C] transition-transform duration-300 ${
                openAccordions.specs ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openAccordions.specs && (
            <div className="pb-5 text-xs text-[#101820]/80 font-light space-y-2.5">
              {product.brand && (
                <div>
                  <span className="text-[#A9B0B5] block text-[10px] uppercase">Brand</span>
                  <span className="text-[#101820] font-semibold">{product.brand}</span>
                </div>
              )}
              {product.material && (
                <div>
                  <span className="text-[#A9B0B5] block text-[10px] uppercase">Material</span>
                  <span className="text-[#101820] font-semibold">{product.material}</span>
                </div>
              )}
              {product.ram && (
                <div>
                  <span className="text-[#A9B0B5] block text-[10px] uppercase">RAM & Storage</span>
                  <span className="text-[#101820] font-semibold">{product.ram} • {product.storage}</span>
                </div>
              )}
              {product.dimensions && (
                <div>
                  <span className="text-[#A9B0B5] block text-[10px] uppercase">Dimensions</span>
                  <span className="text-[#101820] font-semibold">{product.dimensions}</span>
                </div>
              )}
              {product.form && (
                <div>
                  <span className="text-[#A9B0B5] block text-[10px] uppercase">Form & Expiry</span>
                  <span className="text-[#101820] font-semibold">{product.form} • {product.expiry}</span>
                </div>
              )}
              {product.skinType && (
                <div>
                  <span className="text-[#A9B0B5] block text-[10px] uppercase">Skin Type & Finish</span>
                  <span className="text-[#101820] font-semibold">{product.skinType} • {product.finish}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Accordion 2: Description */}
        <div>
          <button
            type="button"
            onClick={() => toggleAccordion('description')}
            className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-widest text-[#101820] font-semibold cursor-pointer"
          >
            <span>Overview</span>
            <ChevronDown
              className={`w-4 h-4 text-[#C9A45C] transition-transform duration-300 ${
                openAccordions.description ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openAccordions.description && (
            <div className="pb-5 text-xs text-[#101820]/80 font-light leading-relaxed">
              <p>{product.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
