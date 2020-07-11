const CHAR_CODES = {
  A: 65,
  Z: 90
}

const toChar = (_, index) => String.fromCharCode(CHAR_CODES.A + index)

const createRow = (content = '', index = '') => {
  const resizeBlock = index ? `<div class="row-resize"></div>` : ''
  return (`
    <div class="row">
        <div class="row-info">
            ${index}
            ${resizeBlock}
        </div>
        <div class="row-data">${content}</div>
    </div>
   `)
}

const createColumn = content => {
  const resizeBlock = content === 'Z' ? '' : `<div class="column-resize"></div>`
  return (`
    <div class="column">
      ${content}
      ${resizeBlock}
    </div>
  `)
}

const createCell = () => `<div class="cell" contenteditable spellcheck="false"></div>`

export const createTable = (rowsCount = 15) => {
  const colsCount = CHAR_CODES.Z - CHAR_CODES.A + 1
  const rows = []

  // first row with letters
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(createColumn)
      .join('')

  rows.push(createRow(cols))

  const cells = new Array(colsCount)
      .fill('')
      .map(createCell)
      .join('')

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(cells, i + 1))
  }

  return rows.join('')
}
