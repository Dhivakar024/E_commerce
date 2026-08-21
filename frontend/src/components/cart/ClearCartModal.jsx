import React, { useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';

export const ClearCartModal = ({ isOpen, onClose, onConfirm }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (isOpen && e.key === 'Escape') onClose?.();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        <div
          className="relative w-full max-w-md bg-luxury-black border border-white/15 p-6 sm:p-8 pointer-events-auto shadow-2xl animate-fade-in text-center"
          role="dialog"
          aria-modal="true"
          aria-label="Confirm Clear Cart"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-luxury-muted hover:text-white rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-full bg-rose-950/60 border border-rose-500/30 flex items-center justify-center mx-auto mb-4 text-rose-400">
            <Trash2 className="w-6 h-6" />
          </div>

          <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mb-2">
            Clear your entire cart?
          </h3>

          <p className="text-xs text-luxury-muted font-light leading-relaxed mb-6">
            All pieces in your shopping bag will be removed. This action cannot be undone.
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-widest font-medium border border-white/15 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm?.();
                onClose?.();
              }}
              className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white text-xs uppercase tracking-widest font-medium transition-colors shadow-lg"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
