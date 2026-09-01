import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

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
  const { isDark } = useTheme();

  return (
    <div
      className={`p-6 sm:p-8 border space-y-6 transition-colors duration-250 ${
        isDark
          ? 'bg-[#1B2630]/60 border-white/10 text-[#F7F3EA]'
          : 'bg-white border-black/10 text-[#101820] shadow-sm'
      }`}
    >
      <div className={`flex items-center justify-between border-b pb-4 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <h3 className={`font-serif text-lg sm:text-xl font-normal ${isDark ? 'text-white' : 'text-[#101820]'}`}>
          2. Shipping Address
        </h3>
        <span className="text-[10px] uppercase tracking-widest text-[#C9A45C] font-semibold">
          Step 2 of 4
        </span>
      </div>

      <div className="space-y-4 text-xs">
        {/* Name Fields (2 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={`block uppercase tracking-widest mb-1.5 font-medium ${isDark ? 'text-[#F7F3EA]' : 'text-[#101820]'}`}>
              First Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={data.firstName || ''}
              onChange={(e) => onChange?.('firstName', e.target.value)}
              onBlur={() => onBlur?.('firstName')}
              placeholder="e.g. Arjun"
              className={`w-full border ${
                errors.firstName
                  ? 'border-rose-500/80 focus:border-rose-500'
                  : isDark
                  ? 'border-white/15 focus:border-[#C9A45C] bg-white/5 text-white placeholder:text-[#A9B0B5]/40'
                  : 'border-black/15 focus:border-[#C9A45C] bg-neutral-50 text-[#101820] placeholder:text-[#717D86]/60'
              } px-3.5 py-3 text-xs focus:outline-none transition-colors`}
              aria-label="First name"
            />
            {errors.firstName && (
              <div className="flex items-center gap-1 text-[11px] text-rose-600 dark:text-rose-400 mt-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{errors.firstName}</span>
              </div>
            )}
          </div>

          <div>
            <label className={`block uppercase tracking-widest mb-1.5 font-medium ${isDark ? 'text-[#F7F3EA]' : 'text-[#101820]'}`}>
              Last Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={data.lastName || ''}
              onChange={(e) => onChange?.('lastName', e.target.value)}
              onBlur={() => onBlur?.('lastName')}
              placeholder="e.g. Kapoor"
              className={`w-full border ${
                errors.lastName
                  ? 'border-rose-500/80 focus:border-rose-500'
                  : isDark
                  ? 'border-white/15 focus:border-[#C9A45C] bg-white/5 text-white placeholder:text-[#A9B0B5]/40'
                  : 'border-black/15 focus:border-[#C9A45C] bg-neutral-50 text-[#101820] placeholder:text-[#717D86]/60'
              } px-3.5 py-3 text-xs focus:outline-none transition-colors`}
              aria-label="Last name"
            />
            {errors.lastName && (
              <div className="flex items-center gap-1 text-[11px] text-rose-600 dark:text-rose-400 mt-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{errors.lastName}</span>
              </div>
            )}
          </div>
        </div>

        {/* Address Line 1 */}
        <div>
          <label className={`block uppercase tracking-widest mb-1.5 font-medium ${isDark ? 'text-[#F7F3EA]' : 'text-[#101820]'}`}>
            Address Line 1 <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={data.addressLine1 || ''}
            onChange={(e) => onChange?.('addressLine1', e.target.value)}
            onBlur={() => onBlur?.('addressLine1')}
            placeholder="Flat, House no., Building, Company, Apartment"
            className={`w-full border ${
              errors.addressLine1
                ? 'border-rose-500/80 focus:border-rose-500'
                : isDark
                ? 'border-white/15 focus:border-[#C9A45C] bg-white/5 text-white placeholder:text-[#A9B0B5]/40'
                : 'border-black/15 focus:border-[#C9A45C] bg-neutral-50 text-[#101820] placeholder:text-[#717D86]/60'
            } px-3.5 py-3 text-xs focus:outline-none transition-colors`}
            aria-label="Street address line 1"
          />
          {errors.addressLine1 && (
            <div className="flex items-center gap-1 text-[11px] text-rose-600 dark:text-rose-400 mt-1">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{errors.addressLine1}</span>
            </div>
          )}
        </div>

        {/* Address Line 2 (Optional) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className={`block uppercase tracking-widest font-medium ${isDark ? 'text-[#F7F3EA]' : 'text-[#101820]'}`}>
              Address Line 2
            </label>
            <span className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}`}>Optional</span>
          </div>
          <input
            type="text"
            value={data.addressLine2 || ''}
            onChange={(e) => onChange?.('addressLine2', e.target.value)}
            placeholder="Area, Street, Sector, Landmark"
            className={`w-full border ${
              isDark
                ? 'border-white/15 focus:border-[#C9A45C] bg-white/5 text-white placeholder:text-[#A9B0B5]/40'
                : 'border-black/15 focus:border-[#C9A45C] bg-neutral-50 text-[#101820] placeholder:text-[#717D86]/60'
            } px-3.5 py-3 text-xs focus:outline-none transition-colors`}
            aria-label="Address line 2"
          />
        </div>

        {/* City, State, PIN (3 Columns on Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={`block uppercase tracking-widest mb-1.5 font-medium ${isDark ? 'text-[#F7F3EA]' : 'text-[#101820]'}`}>
              City <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={data.city || ''}
              onChange={(e) => onChange?.('city', e.target.value)}
              onBlur={() => onBlur?.('city')}
              placeholder="e.g. Mumbai"
              className={`w-full border ${
                errors.city
                  ? 'border-rose-500/80 focus:border-rose-500'
                  : isDark
                  ? 'border-white/15 focus:border-[#C9A45C] bg-white/5 text-white placeholder:text-[#A9B0B5]/40'
                  : 'border-black/15 focus:border-[#C9A45C] bg-neutral-50 text-[#101820] placeholder:text-[#717D86]/60'
              } px-3.5 py-3 text-xs focus:outline-none transition-colors`}
              aria-label="City"
            />
            {errors.city && (
              <div className="flex items-center gap-1 text-[11px] text-rose-600 dark:text-rose-400 mt-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{errors.city}</span>
              </div>
            )}
          </div>

          <div>
            <label className={`block uppercase tracking-widest mb-1.5 font-medium ${isDark ? 'text-[#F7F3EA]' : 'text-[#101820]'}`}>
              State <span className="text-rose-500">*</span>
            </label>
            <select
              value={data.state || ''}
              onChange={(e) => onChange?.('state', e.target.value)}
              onBlur={() => onBlur?.('state')}
              className={`w-full border ${
                errors.state
                  ? 'border-rose-500/80 focus:border-rose-500'
                  : isDark
                  ? 'border-white/15 focus:border-[#C9A45C] bg-[#151F28] text-white'
                  : 'border-black/15 focus:border-[#C9A45C] bg-neutral-50 text-[#101820]'
              } px-3.5 py-3 text-xs focus:outline-none transition-colors cursor-pointer`}
              aria-label="State"
            >
              <option value="">Select State</option>
              {INDIAN_STATES.map((st) => (
                <option key={st} value={st} className={isDark ? 'bg-[#101820] text-white' : 'bg-white text-[#101820]'}>
                  {st}
                </option>
              ))}
            </select>
            {errors.state && (
              <div className="flex items-center gap-1 text-[11px] text-rose-600 dark:text-rose-400 mt-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{errors.state}</span>
              </div>
            )}
          </div>

          <div>
            <label className={`block uppercase tracking-widest mb-1.5 font-medium ${isDark ? 'text-[#F7F3EA]' : 'text-[#101820]'}`}>
              PIN Code <span className="text-rose-500">*</span>
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
              className={`w-full border ${
                errors.pinCode
                  ? 'border-rose-500/80 focus:border-rose-500'
                  : isDark
                  ? 'border-white/15 focus:border-[#C9A45C] bg-white/5 text-white placeholder:text-[#A9B0B5]/40'
                  : 'border-black/15 focus:border-[#C9A45C] bg-neutral-50 text-[#101820] placeholder:text-[#717D86]/60'
              } px-3.5 py-3 text-xs font-mono focus:outline-none transition-colors`}
              aria-label="6 digit PIN code"
            />
            {errors.pinCode && (
              <div className="flex items-center gap-1 text-[11px] text-rose-600 dark:text-rose-400 mt-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{errors.pinCode}</span>
              </div>
            )}
          </div>
        </div>

        {/* Country */}
        <div>
          <label className={`block uppercase tracking-widest mb-1.5 font-medium ${isDark ? 'text-[#F7F3EA]' : 'text-[#101820]'}`}>
            Country
          </label>
          <input
            type="text"
            disabled
            value="India"
            className={`w-full border px-3.5 py-3 text-xs opacity-80 cursor-not-allowed uppercase tracking-wider ${
              isDark ? 'bg-white/5 border-white/10 text-[#C9A45C]' : 'bg-neutral-100 border-black/10 text-[#B08B43]'
            }`}
          />
        </div>

        {/* Save Address Checkbox */}
        <label className="flex items-start gap-3 cursor-pointer pt-2 select-none">
          <input
            type="checkbox"
            checked={saveAddress}
            onChange={(e) => onSaveAddressChange?.(e.target.checked)}
            className="mt-0.5 rounded-none accent-[#C9A45C] w-4 h-4 cursor-pointer"
          />
          <span className={`text-xs leading-relaxed font-light ${isDark ? 'text-[#F7F3EA]/80' : 'text-[#4A5560]'}`}>
            Save this address to my profile for faster future checkout.
          </span>
        </label>
      </div>
    </div>
  );
};
