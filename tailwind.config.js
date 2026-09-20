/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Nuvella brand palette — warm neutrals + soft pastels
        cream: {
          50: '#FDFBF9',
          100: '#FAF6F1',
          200: '#F4EDE6',
          300: '#EBE1D7',
        },
        clay: {
          300: '#E0B9A8',
          400: '#CE9A85',
          500: '#B87F68', // primary accent — muted clay rose
          600: '#9E6753',
          700: '#7E5142',
        },
        sage: {
          100: '#EAF0E8',
          200: '#D8E3D4',
          300: '#BCCDB6',
          400: '#9BB294',
          500: '#7E9A78', // secondary accent
          600: '#637D5E',
        },
        ink: {
          400: '#8C8177',
          500: '#6B6157',
          600: '#4C453D',
          700: '#3A342E', // primary text — warm charcoal
          900: '#241F1B',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(58, 52, 46, 0.14)',
        lift: '0 24px 60px -24px rgba(58, 52, 46, 0.28)',
        glow: '0 20px 50px -18px rgba(184, 127, 104, 0.45)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(-1.2deg)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(0,-18px,0) scale(1.03)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideIn: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        floaty: 'floaty 7s ease-in-out infinite',
        drift: 'drift 11s ease-in-out infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        slideIn: 'slideIn 320ms cubic-bezier(0.22, 1, 0.36, 1)',
        fadeUp: 'fadeUp 420ms cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
