/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/**/**/*.{pug,css}', './public/**/*.{html,js,css}'],
  theme: {
    extend: {
      colors: {
        bgColor: '#121212',
        altBgColor: '#e8e8e8',
        altFontColor: '#121212',
        fontColor: '#e8e8e8',
        actionColor: '#ff2c1b'
      }
    }
  },
  plugins: []
}
