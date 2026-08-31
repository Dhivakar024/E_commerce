/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          navbar: '#0B1117',           // Deep Midnight Navy Navbar
          primary: '#101820',          // Midnight Navy Page Background
          section: '#151F28',          // Section Background
          surface: '#1B2630',          // Card / Surface
          footer: '#080D12',           // Deepest Navy Footer
          secondary: '#F7F3EA',        // Ivory
          accent: '#C9A45C',           // Champagne Gold
          'accent-hover': '#D8B872',   // Lighter Gold
          'accent-dark': '#B08B43',    // Darker Gold
          'surface-light': '#22303D',  // Subtle Elevated Surface
          text: '#F7F3EA',             // Ivory Text
          'text-dark': '#101820',      // Midnight Navy Text
          muted: '#A9B0B5',            // Cool Gray
          subtle: '#6B767E',
          ivory: '#F7F3EA',
          navy: '#101820',
          gold: '#C9A45C',
        },
        luxury: {
          black: '#101820',            // Midnight Navy
          charcoal: '#1B2630',         // Deep Navy Surface
          dark: '#141E28',             // Deep Background
          card: '#1B2630',             // Deep Card Surface
          border: 'rgba(247, 243, 234, 0.08)',
          'border-light': 'rgba(247, 243, 234, 0.14)',
          gold: '#C9A45C',             // Champagne Gold
          'gold-light': '#D8B872',
          'gold-dark': '#B08B43',
          champagne: '#C9A45C',        // Champagne Gold
          cream: '#F7F3EA',            // Ivory
          ivory: '#F7F3EA',            // Ivory
          muted: '#A9B0B5',            // Cool Gray
          subtle: '#6B767E'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        cinzel: ['"Cinzel"', 'serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        ultra: '0.35em',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'mega-menu-enter': {
          '0%': { opacity: '0', transform: 'translateY(-8px) scale(0.985)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(2deg)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(8px) rotate(-2deg)' },
        },
        'cart-bounce': {
          '0%, 100%': { transform: 'scale(1)' },
          '35%': { transform: 'scale(1.28) rotate(-4deg)' },
          '65%': { transform: 'scale(0.92) rotate(2deg)' },
          '85%': { transform: 'scale(1.08)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.98)' },
        },
        'shimmer': {
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-slow': 'fade-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-down': 'fade-in-down 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'mega-menu': 'mega-menu-enter 240ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'float-reverse': 'float-reverse 7s ease-in-out infinite',
        'cart-bounce': 'cart-bounce 0.5s ease-out',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
