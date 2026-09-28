import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // DISHA Brand — Navy/Blue Government
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#1e40af',
          600: '#1e3a8a',
          700: '#172554',
          800: '#0f172a',
          900: '#0c1324',
          // Maharashtra Government specific palette
          navy: '#123B6D',
          navyDark: '#0D2F5B',
          navyMid: '#163F73',
          accent: '#2F80ED',
          accentLight: '#5AA9FF',
        },
        // Semantic status colors — restrained
        status: {
          success: '#15803d',
          'success-bg': '#f0fdf4',
          warning: '#b45309',
          'warning-bg': '#fffbeb',
          error: '#b91c1c',
          'error-bg': '#fef2f2',
          info: '#0369a1',
          'info-bg': '#f0f9ff',
        },
        // Page background
        page: '#f8fafc',
        // Card / surface
        surface: '#ffffff',
        // Borders
        border: {
          DEFAULT: '#e2e8f0',
          light: '#f1f5f9',
        },
        // Text
        text: {
          primary: '#0f172a',
          secondary: '#475569',
          tertiary: '#94a3b8',
          inverse: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display': ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }],
        'heading': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
        'subheading': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        'body': ['0.875rem', { lineHeight: '1.375rem' }],
        'caption': ['0.75rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.06)',
        'dropdown': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'card': '0.5rem',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
