const CHAR_CODES = {
  A: 65,
  Z: 90
}

const toChar = (_, index) => String.fromCharCode(CHAR_CODES.A + index)

const createRow = (content = '', index = '') => {
  const resizeBlock = index ? `<div class="row-resize" data-resize="row-resize"></div>` : ''
  return (`
    <div class="row" data-type="resizable" data-index="${index}">
        <div class="row-info">
            ${index}
            ${resizeBlock}
        </div>
        <div class="row-data">${content}</div>
    </div>
   `)
}

const createColumn = (content, index) => {
  const resizeBlock = content === 'Z' ? '' : `<div class="column-resize" data-resize="column-resize"></div>`
  return (`
    <div class="column" data-type="resizable" data-index="${index}">
      ${content}
      ${resizeBlock}
    </div>
  `)
}

const createCell = (row) => {
  return function(_, index) {
    return `<div
    class="cell"
    contenteditable
    spellcheck="false"
    data-index="${index}"
    data-id="${row}:${index}">
  </div>`
  }
}


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

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell(row))
        .join('')

    rows.push(createRow(cells, row + 1))
  }

  return rows.join('')
}
