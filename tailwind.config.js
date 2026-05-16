/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        surface: {
          900: '#080C10',
          800: '#0D1117',
          700: '#161B22',
          600: '#1C2128',
          500: '#21262D',
          400: '#30363D',
          300: '#484F58',
        },
        accent: {
          DEFAULT: '#00D4FF',
          dim: '#0099BB',
          glow: 'rgba(0,212,255,0.15)',
        },
        success: '#00E5A0',
        warning: '#FFB020',
        danger:  '#FF4560',
        muted:   '#8B949E',
        primary: '#E6EDF3',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'fade-in':    'fadeIn 0.4s ease forwards',
        'slide-up':   'slideUp 0.4s ease forwards',
        'tick':       'tick 0.15s ease',
      },
      keyframes: {
        fadeIn:  { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        tick:    { '0%,100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.04)' } },
      },
    },
  },
  plugins: [],
}
