export const shouldResize = event => event.target.dataset.resize

export const isCell = event => event.target.dataset.type === 'cell'

export const range = (start, end) => {
  if (start > end) {
    [start, end] = [end, start]
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, i) => start + i)
}

export const matrix = ($current, $selected) => {
  const current = $current.id('parse')
  const selected = $selected.id('parse')

  const cols = range(current.col, selected.col)
  const rows = range(current.row, selected.row)

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

export const findNextSelector = (key, {row, col}) => {
  console.log(col)
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowUp':
      row = (row - 1) < 0 ? row : row - 1
      break
    case 'ArrowLeft':
      col = (col - 1) < 0 ? col : col - 1
      break
  }

  return `[data-id="${row}:${col}"]`
}
