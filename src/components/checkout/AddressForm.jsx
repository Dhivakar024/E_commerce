import React from 'react';
import { AlertCircle } from 'lucide-react';

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Delhi (NCR)',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

export const AddressForm = ({
  data,
  errors = {},
  saveAddress = false,
  onSaveAddressChange,
  onChange,
  onBlur,
}) => {
  return (
    <div className="p-6 sm:p-8 bg-luxury-charcoal/30 border border-white/10 space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h3 className="font-serif text-lg sm:text-xl text-white font-normal">
          2. Shipping Address
        </h3>
        <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-medium">
          Step 2 of 4
        </span>
      </div>

      <div className="space-y-4 text-xs">
        {/* Name Fields (2 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-luxury-cream uppercase tracking-widest mb-1.5 font-medium">
              First Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={data.firstName || ''}
              onChange={(e) => onChange?.('firstName', e.target.value)}
              onBlur={() => onBlur?.('firstName')}
              placeholder="e.g. Arjun"
              className={`w-full bg-white/5 border ${
                errors.firstName ? 'border-rose-500/80 focus:border-rose-500' : 'border-white/15 focus:border-luxury-gold'
              } text-white px-3.5 py-3 text-xs focus:outline-none placeholder:text-luxury-muted/40 transition-colors`}
              aria-label="First name"
            />
            {errors.firstName && (
              <div className="flex items-center gap-1 text-[11px] text-rose-400 mt-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{errors.firstName}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-luxury-cream uppercase tracking-widest mb-1.5 font-medium">
              Last Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={data.lastName || ''}
              onChange={(e) => onChange?.('lastName', e.target.value)}
              onBlur={() => onBlur?.('lastName')}
              placeholder="e.g. Kapoor"
              className={`w-full bg-white/5 border ${
                errors.lastName ? 'border-rose-500/80 focus:border-rose-500' : 'border-white/15 focus:border-luxury-gold'
              } text-white px-3.5 py-3 text-xs focus:outline-none placeholder:text-luxury-muted/40 transition-colors`}
              aria-label="Last name"
            />
            {errors.lastName && (
              <div className="flex items-center gap-1 text-[11px] text-rose-400 mt-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{errors.lastName}</span>
              </div>
            )}
          </div>
        </div>

        {/* Address Line 1 */}
        <div>
          <label className="block text-luxury-cream uppercase tracking-widest mb-1.5 font-medium">
            Address Line 1 <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={data.addressLine1 || ''}
            onChange={(e) => onChange?.('addressLine1', e.target.value)}
            onBlur={() => onBlur?.('addressLine1')}
            placeholder="Flat, House no., Building, Company, Apartment"
            className={`w-full bg-white/5 border ${
              errors.addressLine1 ? 'border-rose-500/80 focus:border-rose-500' : 'border-white/15 focus:border-luxury-gold'
            } text-white px-3.5 py-3 text-xs focus:outline-none placeholder:text-luxury-muted/40 transition-colors`}
            aria-label="Street address line 1"
          />
          {errors.addressLine1 && (
            <div className="flex items-center gap-1 text-[11px] text-rose-400 mt-1">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{errors.addressLine1}</span>
            </div>
          )}
        </div>

        {/* Address Line 2 (Optional) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-luxury-cream uppercase tracking-widest font-medium">
              Address Line 2
            </label>
            <span className="text-[10px] text-luxury-muted uppercase tracking-wider">Optional</span>
          </div>
          <input
            type="text"
            value={data.addressLine2 || ''}
            onChange={(e) => onChange?.('addressLine2', e.target.value)}
            placeholder="Area, Street, Sector, Landmark"
            className="w-full bg-white/5 border border-white/15 focus:border-luxury-gold text-white px-3.5 py-3 text-xs focus:outline-none placeholder:text-luxury-muted/40 transition-colors"
            aria-label="Address line 2"
          />
        </div>

        {/* City, State, PIN (3 Columns on Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-luxury-cream uppercase tracking-widest mb-1.5 font-medium">
              City <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={data.city || ''}
              onChange={(e) => onChange?.('city', e.target.value)}
              onBlur={() => onBlur?.('city')}
              placeholder="e.g. Mumbai"
              className={`w-full bg-white/5 border ${
                errors.city ? 'border-rose-500/80 focus:border-rose-500' : 'border-white/15 focus:border-luxury-gold'
              } text-white px-3.5 py-3 text-xs focus:outline-none placeholder:text-luxury-muted/40 transition-colors`}
              aria-label="City"
            />
            {errors.city && (
              <div className="flex items-center gap-1 text-[11px] text-rose-400 mt-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{errors.city}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-luxury-cream uppercase tracking-widest mb-1.5 font-medium">
              State <span className="text-rose-400">*</span>
            </label>
            <select
              value={data.state || ''}
              onChange={(e) => onChange?.('state', e.target.value)}
              onBlur={() => onBlur?.('state')}
              className={`w-full bg-luxury-charcoal border ${
                errors.state ? 'border-rose-500/80 focus:border-rose-500' : 'border-white/15 focus:border-luxury-gold'
              } text-white px-3.5 py-3 text-xs focus:outline-none transition-colors cursor-pointer`}
              aria-label="State"
            >
              <option value="">Select State</option>
              {INDIAN_STATES.map((st) => (
                <option key={st} value={st} className="bg-luxury-black text-white">
                  {st}
                </option>
              ))}
            </select>
            {errors.state && (
              <div className="flex items-center gap-1 text-[11px] text-rose-400 mt-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{errors.state}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-luxury-cream uppercase tracking-widest mb-1.5 font-medium">
              PIN Code <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              maxLength={6}
              value={data.pinCode || ''}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, '');
                onChange?.('pinCode', digits);
              }}
              onBlur={() => onBlur?.('pinCode')}
              placeholder="e.g. 400001"
              className={`w-full bg-white/5 border ${
                errors.pinCode ? 'border-rose-500/80 focus:border-rose-500' : 'border-white/15 focus:border-luxury-gold'
              } text-white px-3.5 py-3 text-xs font-mono focus:outline-none placeholder:text-luxury-muted/40 transition-colors`}
              aria-label="6 digit PIN code"
            />
            {errors.pinCode && (
              <div className="flex items-center gap-1 text-[11px] text-rose-400 mt-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{errors.pinCode}</span>
              </div>
            )}
          </div>
        </div>

        {/* Country */}
        <div>
          <label className="block text-luxury-cream uppercase tracking-widest mb-1.5 font-medium">
            Country
          </label>
          <input
            type="text"
            disabled
            value="India"
            className="w-full bg-white/5 border border-white/10 text-luxury-champagne px-3.5 py-3 text-xs opacity-80 cursor-not-allowed uppercase tracking-wider"
          />
        </div>

        {/* Save Address Checkbox */}
        <label className="flex items-start gap-3 cursor-pointer pt-2 select-none">
          <input
            type="checkbox"
            checked={saveAddress}
            onChange={(e) => onSaveAddressChange?.(e.target.checked)}
            className="mt-0.5 rounded-none accent-luxury-gold w-4 h-4 bg-white/5 border-white/20 cursor-pointer"
          />
          <span className="text-luxury-cream/80 text-xs leading-relaxed font-light">
            Save this address to my profile for faster future checkout.
          </span>
        </label>
      </div>
    </div>
  );
};
