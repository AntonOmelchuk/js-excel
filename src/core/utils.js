export const capitalizeFirstChar = string => !string ? '' : string[0].toUpperCase() + string.slice(1)

export const storage = (key, data) => {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }

  localStorage.setItem(key, JSON.stringify(data))
}
