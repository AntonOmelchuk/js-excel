const CHAR_CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120

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

const createColumn = ({content, index, width}) => {
  const resizeBlock = content === 'Z' ? '' : `<div class="column-resize" data-resize="column-resize"></div>`
  return (`
    <div class="column" data-type="resizable" data-index="${index}" style="width:${width}">
      ${content}
      ${resizeBlock}
    </div>
  `)
}

const createCell = (row, state) => {
  return function(_, index) {
    return `<div
    class="cell"
    contenteditable
    spellcheck="false"
    data-type="cell"
    data-index="${index}"
    data-id="${row}:${index}"
    style="width:${getWidth(state, index)}"
    >
  </div>`
  }
}

const getWidth = (state, index) => state[index] || DEFAULT_WIDTH

const widthFromState = (state) => (content, index) => ({content, index, width: getWidth(state, index)})

export const createTable = (rowsCount = 15, state) => {
  const colsCount = CHAR_CODES.Z - CHAR_CODES.A + 1
  const rows = []

  // first row with letters
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(widthFromState(state.colSize))
      .map(createColumn)
      .join('')

  rows.push(createRow(cols))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell(row, state.colSize))
        .join('')

    rows.push(createRow(cells, row + 1))
  }

  return rows.join('')
}
