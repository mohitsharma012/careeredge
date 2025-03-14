import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['var(--font-roboto)', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#F0F7FB',
          100: '#BFD7EA',
          200: '#91AEC1',
          300: '#508CA4',
          400: '#0A8754',
          500: '#004F2D',
          600: '#004526',
          700: '#003B1F',
          800: '#003118',
          900: '#002711',
        },
        custom: {
          lightest: '#BFD7EA',
          light: '#91AEC1',
          medium: '#508CA4',
          dark: '#0A8754',
          darker: '#07653F',
          darkest: '#004F2D',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;