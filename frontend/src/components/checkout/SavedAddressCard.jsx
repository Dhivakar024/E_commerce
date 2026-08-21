import React from 'react';
import { MapPin, Check, Trash2, Edit3, Plus } from 'lucide-react';

export const SavedAddressCard = ({
  savedAddress,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onUseNewAddress,
}) => {
  if (!savedAddress) return null;

  return (
    <div className="p-4 sm:p-5 bg-white/5 border border-white/15 space-y-3 mb-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-luxury-champagne font-medium">
          <MapPin className="w-3.5 h-3.5 text-luxury-gold" />
          <span>Saved Delivery Address</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="p-1 text-luxury-muted hover:text-white transition-colors"
            title="Edit Saved Address"
            aria-label="Edit saved address"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="p-1 text-luxury-muted hover:text-rose-400 transition-colors"
            title="Delete Saved Address"
            aria-label="Delete saved address"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="text-xs text-luxury-cream/80 font-light space-y-1 pl-5 border-l-2 border-luxury-gold">
        <p className="font-medium text-white">
          {savedAddress.firstName} {savedAddress.lastName} • +91 {savedAddress.phone}
        </p>
        <p>{savedAddress.addressLine1} {savedAddress.addressLine2 ? `, ${savedAddress.addressLine2}` : ''}</p>
        <p>{savedAddress.city}, {savedAddress.state} – <strong className="text-luxury-champagne font-mono font-normal">{savedAddress.pinCode}</strong></p>
        <p className="text-luxury-muted uppercase tracking-wider text-[10px]">{savedAddress.country}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onSelect}
          className={`flex-1 py-2.5 px-4 text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 border transition-all ${
            isSelected
              ? 'bg-luxury-gold text-luxury-black border-luxury-gold shadow-md'
              : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
          }`}
        >
          {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
          <span>{isSelected ? 'Address Selected' : 'Deliver to this Address'}</span>
        </button>

        <button
          type="button"
          onClick={onUseNewAddress}
          className="py-2.5 px-4 bg-transparent hover:bg-white/5 text-luxury-muted hover:text-white border border-white/15 text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Address</span>
        </button>
      </div>
    </div>
  );
};
