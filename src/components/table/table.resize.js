import {$} from '@core/dom';

export const tableResize = (root, event) => {
  return new Promise(resolve => {
    const TABLE_HEIGHT = document.querySelector('.excel__table').clientHeight - 25
    const TABLE_WIDTH = document.querySelector('.excel__table').clientWidth
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const index = $parent.data.index
    const cells = root.findAll(`.cell[data-index="${index}"]`)
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    const sideProp = type === 'column-resize' ? 'bottom' : 'right'
    const sidePropValue = type === 'column-resize' ? TABLE_HEIGHT : TABLE_WIDTH
    let value

    $resizer.css({
      opacity: 1,
      [sideProp]: -sidePropValue + 'px'
    })

    document.onmousemove = e => {
      if (type === 'column-resize') {
        const delta = e.pageX - coords.right
        value = coords.width + delta + 'px'
        $resizer.css({right: -delta + 'px'})
      } else {
        const delta = e.pageY - coords.bottom
        value = coords.height + delta + 'px'
        $resizer.css({bottom: -delta + 'px'})
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null

      if (type === 'column-resize') {
        $parent.css({width: value})
        cells.forEach(cell => cell.style.width = value)
      } else {
        $parent.css({height: value})
      }

      resolve({
        id: index,
        value,
        type
      })

      $resizer.css({
        opacity: 0,
        right: 0,
        bottom: 0
      })
    }
  })
}
