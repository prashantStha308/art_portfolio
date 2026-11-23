import colors from 'tailwindcss/colors';
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Space Mono"', 'monospace'],
        sans: ['"Nunito"','Ubuntu', 'sans-serif'],
      },
      colors:{
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
      }
    },
  },
  plugins: [
    typography
  ],
}