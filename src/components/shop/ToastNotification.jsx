import React from 'react';
import { useShop } from '../../context/ShopContext';
import { CheckCircle2, Info, X } from 'lucide-react';

export const ToastNotification = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-[90vw] sm:w-auto pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3.5 bg-luxury-dark/95 border border-luxury-gold/40 text-luxury-cream text-xs shadow-2xl backdrop-blur-md animate-fade-in"
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'info' ? (
              <Info className="w-4 h-4 text-luxury-champagne flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-luxury-gold flex-shrink-0" />
            )}
            <span className="font-light tracking-wide">{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 text-luxury-muted hover:text-white transition-colors"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
