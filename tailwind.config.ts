/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#6366F1',
          50:  '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
        },
        ink: {
          DEFAULT: '#0A0A0F',
          50:  '#18181F',
          100: '#13131A',
          200: '#0F0F16',
          300: '#0A0A0F',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'accent-gradient': 'linear-gradient(135deg, #6366F1, #8B5CF6)',
      },
      animation: {
        'fade-in':    'fadeIn 0.5s ease-out both',
        'slide-up':   'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in':   'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
        'shimmer':    'shimmer 1.6s linear infinite',
        'pulse-ring': 'pulseRing 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient':   'gradientShift 8s ease infinite',
        'float-1':    'meshFloat1 18s ease-in-out infinite',
        'float-2':    'meshFloat2 22s ease-in-out infinite',
        'float-3':    'meshFloat3 26s ease-in-out infinite',
        'border-glow':'borderGlow 3s ease-in-out infinite',
        'ticker':     'ticker 20s linear infinite',
      },
      keyframes: {
        fadeIn:   { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:  { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        scaleIn:  { from: { opacity: '0', transform: 'scale(0.95)' }, to: { opacity: '1', transform: 'scale(1)' } },
        shimmer:  { '0%': { backgroundPosition: '-1000px 0' }, '100%': { backgroundPosition: '1000px 0' } },
        pulseRing: {
          '0%':   { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(99,102,241,0.5)' },
          '70%':  { transform: 'scale(1)',    boxShadow: '0 0 0 14px rgba(99,102,241,0)' },
          '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(99,102,241,0)'   },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        meshFloat1: {
          '0%, 100%': { transform: 'translate(0px, 0px)' },
          '25%':      { transform: 'translate(40px, -60px)' },
          '50%':      { transform: 'translate(-30px, 40px)' },
          '75%':      { transform: 'translate(60px, 30px)' },
        },
        meshFloat2: {
          '0%, 100%': { transform: 'translate(0px, 0px)' },
          '25%':      { transform: 'translate(-50px, 40px)' },
          '50%':      { transform: 'translate(40px, -30px)' },
          '75%':      { transform: 'translate(-30px, -50px)' },
        },
        meshFloat3: {
          '0%, 100%': { transform: 'translate(0px, 0px)' },
          '33%':      { transform: 'translate(30px, 50px)' },
          '66%':      { transform: 'translate(-40px, -20px)' },
        },
        borderGlow: {
          '0%, 100%': { opacity: '0.5' },
          '50%':      { opacity: '1' },
        },
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'accent':    '0 0 40px rgba(99,102,241,0.15)',
        'accent-lg': '0 0 80px rgba(99,102,241,0.2)',
        'glow':      '0 0 20px rgba(99,102,241,0.4)',
      },
    },
  },
  plugins: [],
}
