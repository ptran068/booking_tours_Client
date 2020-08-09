export default function directive (el, binding) {
  if (binding.value !== binding.oldValue) { // change debounce only if interval has changed
    el.oninput = directive.debounce(evt => {
      el.dispatchEvent(new Event('debounce-change'))
    }, parseInt(binding.value) || 500)
  }
}

function debounce (fn, delay) {
  let timeoutID = null
  return () => {
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

directive.debounce = debounce

function create (data) {
  const infor = {
    name: data.name,
    email: data.email
  }
}

const phong = {
  name: 'ssss',
  email: 'aaaaa'
}

create(phong)
