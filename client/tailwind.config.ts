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
          lightYellow: '#FFB300',
          darkYellow: '#FB8500',
          lightest: '#F0FAFF',
          light: '#8ECAE6',
          medium: '#65CEFF',
          dark: '#29B6F6',
          darker: '#1E88E5',
          moreDarker: '#045eac',
          darkest: '#1A237E',
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