/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend:  {
      fontFamily: {
        'figtree': ['Figtree', 'sans-serif'],
        'satoshi':['Satoshi', 'sans-serif'],
        'inter':['Inter','sans-serif'],
        'poppins':['Poppins','sans-serif']
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
