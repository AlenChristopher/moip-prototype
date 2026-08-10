/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Fira Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Fira Code', 'Consolas', 'ui-monospace', 'monospace'],
      },
      colors: {
        bg:      '#0B1120',
        surface: '#111827',
        raised:  '#1C2537',
        overlay: '#243044',
        border:  '#1E2D44',
        border2: '#334155',
        muted:   '#94A3B8',
        dim:     '#64748B',
        ink:     '#E2E8F0',
        green:   '#22C55E',
        amber:   '#F59E0B',
        danger:  '#EF4444',
        info:    '#60A5FA',
      },
    },
  },
  plugins: [],
}
