/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        clifford: '#da373d',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [require('tailwindcss-safe-area')],
}
