/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0F1712',
        surface: '#1C2B22',
        border: '#2E3F34',
        accent: '#8FC49F',
        heading: '#EDE9E2',
        muted: '#A8B5A0',
        jscolors: {
          bg: '#0F1712',
          surface: '#1C2B22',
          border: '#2E3F34',
          accent: '#8FC49F',
          heading: '#EDE9E2',
          muted: '#A8B5A0',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
        jsfontFamily: {
          display: ['Cormorant Garamond', 'serif'],
          sans: ['DM Sans', 'sans-serif'],
        },
      },
    },
  },
  plugins: [],
}
