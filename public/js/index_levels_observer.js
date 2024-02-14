const header = document.querySelector('header')
const obsElement = document.querySelector('.int')
const scrollWatcher = document.createElement('div')

scrollWatcher.setAttribute('data-scroll-watcher', '')

obsElement.before(scrollWatcher)

const navObserver = new IntersectionObserver((e) => {
  header.classList.toggle('intersect', !e[0].isIntersecting)
  header.classList.toggle('!bg-bgColor', !e[0].isIntersecting)
})

navObserver.observe(scrollWatcher)
