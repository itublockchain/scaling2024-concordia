/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      "ft": "900px",
      'ss': '384px',
      "hh": '486px',
      "lt": "569px",

      ...defaultTheme.screens,
    },
    extend: {
      opacity:["disabled"],
      cursor: ["disabled"],
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      title: ['Lilita One', "cursive"],
      // logo: ['Rampart One', "cursive"]
      logo: ['Germania One', 'cursive']
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
