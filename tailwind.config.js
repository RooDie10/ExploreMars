/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/**/**/*.{pug,css}', './public/**/*.{html,js,css}'],
  theme: {
    extend: {
      colors: {
        bgColor: '#121212',
        altBgColor: '#bfbdbd',
        altFontColor: '#121212',
        fontColor: '#bfbdbd',
        actionColor: '#ff2c1b'
      }
    }
  },
  plugins: []
}
