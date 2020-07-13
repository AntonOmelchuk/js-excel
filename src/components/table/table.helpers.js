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

export const matrix = (current, selected) => {
  const cols = range(current.col, selected.col)
  const rows = range(current.row, selected.row)

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}
