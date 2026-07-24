import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  fontFamily: {
    mono: ['"Space Mono"', 'monospace'],
    sans: ['Ubuntu', 'sans-serif'],
  },
  theme: {
    extend: {
      colors:{
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
      }
    },
  },
  plugins: [],
}