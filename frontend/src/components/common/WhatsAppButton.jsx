import React, { useState } from 'react';

export const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '919876543210';
  const defaultMessage = 'Hello LAX360 PVT LTD Support, I would like to inquire about...';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <aside
      aria-label="WhatsApp Support"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2.5"
    >
      {/* Tooltip on hover / desktop */}
      <div
        className={`hidden sm:flex items-center bg-[#101820] text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg border border-white/10 transition-all duration-300 pointer-events-none ${
          isHovered
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        <span className="text-[11px] tracking-wide">Chat with Support</span>
      </div>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Chat with LAX360 PVT LTD on WhatsApp"
        className="relative group w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_26px_rgba(37,211,102,0.65)] hover:scale-105 active:scale-95 transition-all duration-300"
      >
        {/* Soft Animated Pulse Ring */}
        <span
          className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none"
          style={{ animationDuration: '3s' }}
        />

        {/* WhatsApp Icon */}
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 fill-current relative z-10 transition-transform duration-300 group-hover:scale-110"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.02.79.81-2.94-.19-.3A8.2 8.2 0 0 1 3.8 11.91c0-4.54 3.7-8.24 8.25-8.24zm4.8 11.66c-.26-.13-1.56-.77-1.8-.86-.24-.09-.42-.13-.6.13-.17.26-.68.86-.84 1.03-.15.17-.31.2-.57.07-.26-.13-1.1-.41-2.1-1.3-.78-.7-1.31-1.56-1.46-1.82-.15-.26-.02-.4.11-.53.12-.12.26-.31.39-.46.13-.15.17-.26.26-.43.09-.17.04-.33-.02-.46-.07-.13-.6-1.44-.82-1.97-.22-.52-.44-.45-.6-.46-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.26.27-.98.96-.98 2.34 0 1.38 1 2.72 1.14 2.91.14.19 1.97 3.01 4.78 4.22.67.29 1.19.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.56-.64 1.78-1.26.22-.61.22-1.14.15-1.26-.06-.11-.23-.18-.49-.31z" />
        </svg>
      </a>
    </aside>
  );
};
