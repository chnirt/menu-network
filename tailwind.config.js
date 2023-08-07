/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--adm-color-primary)',
        clifford: '#da373d',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
    require('tailwindcss-safe-area'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}
