/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/**/**/*.{pug,css}', './public/**/*.{html,js,css}'],
  theme: {
    extend: {
      colors: {
        bgColor: '#121212',
        altBgColor: '#f9f8fd',
        altFontColor: '#121212',
        fontColor: '#f9f8fd',
        actionColor: '#ff2c1b'
      }
    }
  },
  plugins: []
}
