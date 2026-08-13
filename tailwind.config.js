/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0D1117',
          surface: '#111827',
          surfaceLight: '#1F2937',
          border: '#1E3A5F',
          blue: '#1E6FBA',
          cyan: '#29ABE2',
          cyanGlow: 'rgba(41, 171, 226, 0.15)',
          muted: '#64748B',
          textMuted: '#94A3B8',
        }
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
