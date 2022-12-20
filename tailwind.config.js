/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'sgnr-blue': '#3b82f6',
      },
      width: {
        '136': '34rem',
      }
    },
  },
  plugins: [],
}
