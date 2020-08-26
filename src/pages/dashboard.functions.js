import {storage} from '../core/utils'

const toHTML = (key) => {
  const model = storage(key)
  const id = key.split(':')[1]

  return `<li class="db__record">
  <a href="#excel/${id}">${model.title}</a>
  <strong>7/8/2020</strong>
</li>`
}

const getAllKeys = () => {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }

    keys.push(key)
  }

  return keys
}

export const createRecordsTable = () => {
  const keys = getAllKeys()

  if (!keys.length) {
    return `<h2>No tables created</h2>`
  }

  return `<div class="db__list-header">
      <span>Table name</span>
      <span>Data open</span>
    </div>

    <ul class="db__list">
      ${keys.map(toHTML).join('')}
    </ul>`
}
