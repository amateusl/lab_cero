/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'color-1': '#694BFC',
          'color-2': '#5E5EED',
          'color-3': '#88AFF0',
          'color-4': '#EFEFEF',
          'color-5': '#FFFFFF'
        },
        fontFamily: {
          'lexend': ['Lexend', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }