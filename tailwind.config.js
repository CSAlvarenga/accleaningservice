/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B2545',
          dark: '#071A33',
        },
        teal: {
          DEFAULT: '#17A8A8',
          dark: '#0E8F8F',
        },
        steel: '#1A5FA8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
