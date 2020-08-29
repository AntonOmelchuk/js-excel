export const capitalizeFirstChar = string => !string ? '' : string[0].toUpperCase() + string.slice(1)

export const storage = (key, data = null) => {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }

  localStorage.setItem(key, JSON.stringify(data))
}

export const isEqual = (a, b) => {
  if (a === b) {
    return true
  } else if ((typeof a === 'object' && a != null) && (typeof b === 'object' && b != null)) {
    if (Object.keys(a).length !== Object.keys(b).length) {
      return false
    }

    for (const prop in a) {
      if (b.hasOwnProperty(prop)) {
        if (! isEqual(a[prop], b[prop])) {
          return false
        }
      } else {
        return false
      }
    }

    return true
  } else {
    return false
  }
}

export const camelToDashCase = str => str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)

export const toInlineStyles = (styles = {}) => {
  return Object.keys(styles)
      .map(key => `${camelToDashCase(key)}: ${styles[key]}`)
      .join(';')
}

export const debounce = (fn, delay) => {
  let timeout
  return function(...args) {
    const later = () => {
      clearInterval(timeout)
      // eslint-disable-next-line
      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, delay)
  }
}
