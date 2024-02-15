const cardInput = document.querySelector('[name=card]')
const cardPattern = '0 0 0 0 / 0 0 0 0 / 0 0 0 0 / 0 0 0 0'
const cardMask = IMask(cardInput, {
  mask: cardPattern,
  lazy: false,
  placeholderChar: ' 0 '
})

const dateInput = document.querySelector('[name=date]')
const datePattern = '0 0 / 0 0'
const dateMask = IMask(dateInput, {
  mask: datePattern,
  lazy: false,
  placeholderChar: ' 0 '
})

const securityInput = document.querySelector('[name=security]')
const securityPattern = '0 0 0'
const securityMask = IMask(securityInput, {
  mask: securityPattern,
  lazy: false,
  placeholderChar: ' 0 '
})