const CHAR_CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

const toChar = (_, index) => String.fromCharCode(CHAR_CODES.A + index)

const getWidth = (state, index) => state[index] || DEFAULT_WIDTH

const getHeight = (state, index) => state[index] || DEFAULT_HEIGHT

const createRow = (content = '', index = '', state = {}) => {
  const resizeBlock = index ? `<div class="row-resize" data-resize="row-resize"></div>` : ''
  return (`
    <div class="row" data-type="resizable" data-index="${index}" style="height:${getHeight(state, index)}">
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
    const id = `${row}:${index}`
    const data = state.dataState[id] || ''
    return `<div
    class="cell"
    contenteditable
    spellcheck="false"
    data-type="cell"
    data-index="${index}"
    data-id="${id}"
    style="width:${getWidth(state.colSize, index)}"
    >
    ${data}
  </div>`
  }
}

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
        .map(createCell(row, state))
        .join('')

    rows.push(createRow(cells, row + 1, state.rowSize))
  }

  return rows.join('')
}
