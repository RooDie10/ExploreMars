const cardInput = document.querySelector('[name=card]')
const cardPattern = '0000 / 0000 / 0000 / 0000'
const cardMask = IMask(cardInput, {
  mask: cardPattern,
  lazy: false,
  placeholderChar: ' '
})

const dateInput = document.querySelector('[name=date]')
const datePattern = '00 / 00'
const dateMask = IMask(cardInput, {
  mask: datePattern,
  lazy: false,
  placeholderChar: ' '
})