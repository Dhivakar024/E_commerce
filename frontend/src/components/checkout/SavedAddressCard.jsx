import React from 'react';
import { MapPin, Check, Trash2, Edit3, Plus } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const SavedAddressCard = ({
  savedAddress,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onUseNewAddress,
}) => {
  const { isDark } = useTheme();
  if (!savedAddress) return null;

  return (
    <div
      className={`p-4 sm:p-5 border space-y-3 mb-6 animate-fade-in transition-colors duration-250 ${
        isDark
          ? 'bg-[#1B2630]/60 border-white/15 text-[#F7F3EA]'
          : 'bg-white border-black/10 text-[#101820] shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C9A45C] font-semibold">
          <MapPin className="w-3.5 h-3.5 text-[#C9A45C]" />
          <span>Saved Delivery Address</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onEdit}
            className={`p-1 transition-colors ${
              isDark ? 'text-[#A9B0B5] hover:text-white' : 'text-[#717D86] hover:text-[#101820]'
            }`}
            title="Edit Saved Address"
            aria-label="Edit saved address"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="p-1 text-[#717D86] dark:text-[#A9B0B5] hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            title="Delete Saved Address"
            aria-label="Delete saved address"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="text-xs font-light space-y-1 pl-5 border-l-2 border-[#C9A45C]">
        <p className={`font-semibold ${isDark ? 'text-white' : 'text-[#101820]'}`}>
          {savedAddress.firstName} {savedAddress.lastName} • +91 {savedAddress.phone}
        </p>
        <p className={isDark ? 'text-[#F7F3EA]/80' : 'text-[#4A5560]'}>{savedAddress.addressLine1} {savedAddress.addressLine2 ? `, ${savedAddress.addressLine2}` : ''}</p>
        <p className={isDark ? 'text-[#F7F3EA]/80' : 'text-[#4A5560]'}>{savedAddress.city}, {savedAddress.state} – <strong className="text-[#C9A45C] font-mono font-normal">{savedAddress.pinCode}</strong></p>
        <p className={`uppercase tracking-wider text-[10px] ${isDark ? 'text-[#A9B0B5]' : 'text-[#717D86]'}`}>{savedAddress.country}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onSelect}
          className={`flex-1 py-2.5 px-4 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 border transition-all ${
            isSelected
              ? 'bg-[#C9A45C] text-[#101820] border-[#C9A45C] shadow-md'
              : isDark
              ? 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              : 'bg-black/5 hover:bg-black/10 text-[#101820] border-black/15'
          }`}
        >
          {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
          <span>{isSelected ? 'Address Selected' : 'Deliver to this Address'}</span>
        </button>

        <button
          type="button"
          onClick={onUseNewAddress}
          className={`py-2.5 px-4 border text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors font-medium ${
            isDark
              ? 'bg-transparent hover:bg-white/5 text-[#A9B0B5] hover:text-white border-white/15'
              : 'bg-transparent hover:bg-black/5 text-[#55606A] hover:text-[#101820] border-black/15'
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Address</span>
        </button>
      </div>
    </div>
  );
};
