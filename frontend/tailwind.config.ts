/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // important for next-themes
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#facc15', // yellow accent
        secondary: '#1f2937', // dark-gray
        accent: '#f97316', // orange accent
        backgroundLight: '#ffffff', // light theme BG
        backgroundDark: '#020617', // dark theme BG
      },
      boxShadow: {
        glow: '0 0 8px rgba(250, 204, 21, 0.5)',
      },
    },
  },
  plugins: [],
}