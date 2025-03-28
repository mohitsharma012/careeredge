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
  			roboto: [
  				'var(--font-roboto)',
  				'sans-serif'
  			]
  		},
  		colors: {
  			primary: {
  				'50': '#f1f7fe',
  				'100': '#e2eefc',
  				'200': '#bedcf9',
  				'300': '#84bff5',
  				'400': '#429eee',
  				'500': '#1e88e5',
  				'600': '#0c65bd',
  				'700': '#0b5199',
  				'800': '#0e457e',
  				'900': '#113b69',
  				'950': '#0b2546'
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
  				darkest: '#1A237E'
  			}
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			marquee: 'marquee var(--duration) linear infinite',
  			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite'
  		},
  		keyframes: {
  			marquee: {
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(calc(-100% - var(--gap)))'
  				}
  			},
  			'marquee-vertical': {
  				from: {
  					transform: 'translateY(0)'
  				},
  				to: {
  					transform: 'translateY(calc(-100% - var(--gap)))'
  				}
  			}
  		}
  	}
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;