const openModal = (id) => {
  document.getElementById(id).showModal()
}
const closeModal = (id) => {
  document.getElementById(id).close()
}

const handleForm = (form) => {
  form.addEventListener('htmx:after-request', formHandler = (event) => {
    const response = JSON.parse(event.detail.xhr.response)
    const messageField = form.querySelector('.message')
    const inputs = form.querySelectorAll('input')
    inputs.forEach((input) => input.classList.remove('input-error'))
    messageField.innerHTML = ''
    if (response.errors.length > 0) {
      response.errors.forEach((error) => {
        const field = form.querySelector(`[name=${error.field}]`)
        field.classList.toggle('input-error')
        let errorField = document.createElement('p')
        errorField.innerHTML = error.message
        form.querySelector('.message').append(errorField)
      })
    } else {
      form.reset()
      closeModal(form.parentElement.id)
    }
  })
}
