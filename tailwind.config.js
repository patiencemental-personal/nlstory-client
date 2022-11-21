/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'sgnr-blue': '#3b82f6',
      },
      width: {
        '144': '34rem',
      }
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
      '6xl': '3.6rem',
      '7xl': '4.2rem',
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
