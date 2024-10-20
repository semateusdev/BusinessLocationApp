/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'primary': '#020024',
        'primary-alter': '#050422',
        'secondary': '#009d55'
      },
      boxShadow: {
        'item': '0 0 20px 5px rgba(3, 3, 3, 0.3)',
      }
    },
    screens: {
      'tablet': '810px',
      'HD': '1280px',
      'FHD': '1920px'
    },
  }, 
  plugins: [],
}