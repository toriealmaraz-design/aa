/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        'primary-dark': '#1D4ED8',
        dark: '#0F172A',
        'dark-lighter': '#1E293B',
      },
    },
  },
  plugins: [],
}
