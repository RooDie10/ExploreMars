const openModal = (id) => {
  document.getElementById(id).showModal()
}
const closeModal = (id) => {
  document.getElementById(id).close()
}

const handleForm = (form) => {
  form.addEventListener('htmx:after-request', (event) => {
    const inputs = form.querySelectorAll('input')
    inputs.forEach((input) => htmx.removeClass(input, 'input-error'))
    const response = JSON.parse(event.detail.xhr.response)
    const p = form.querySelector('p')
    htmx.removeClass(p, '!opacity-100')

    if (response.error) {
      const field = form.querySelector(`[name=${response.field}]`)
      htmx.addClass(field, 'input-error')
      htmx.addClass(p, '!opacity-100')
      p.textContent = response.message
    } else {
      form.reset()
      p.textContent = 'Loading'
      htmx.removeClass(p, '!opacity-100')
      closeModal(form.parentElement.id)
    }
  })
}
