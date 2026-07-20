/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F5132',
          50: '#F3F8F4',
          100: '#E3F1E8',
          200: '#BFDFC9',
          300: '#8FC79E',
          400: '#4FA36C',
          500: '#1B7A4D',
          600: '#146B41',
          700: '#0F5132',
          800: '#0B3B27',
          900: '#08281B',
        },
        gold: {
          DEFAULT: '#E0A81C',
          50: '#FBF0D9',
          100: '#F6DFA9',
          200: '#EFC24C',
          300: '#E5B32C',
          400: '#E0A81C',
          500: '#C08A15',
          600: '#9C6E0B',
          700: '#684F0A',
        },
        maroon: {
          DEFAULT: '#A62C2C',
          50: '#F7E3E1',
          100: '#EFC3C0',
          400: '#C1403D',
          600: '#A62C2C',
          700: '#8F2323',
          800: '#7A1B1B',
        },
        canvas: '#FBFAF6',
        ink: '#182119',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'ukir-pattern': "url('/pattern-ukir.svg')",
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(16, 56, 35, 0.12)',
        card: '0 2px 12px -2px rgba(16, 56, 35, 0.08)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}
