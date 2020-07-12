import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    });
  }

  toHtml() {
    return createTable(20)
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target)
      $resizer.$el.classList.add('active')
      const $parent = $resizer.closest('[data-type="resizable"]')
      const index = $parent.data.index // active column for resizing
      const cells = this.$root.findAll(`.cell[data-index="${index}"]`)
      const coords = $parent.getCoords()
      const type = $resizer.data.resize

      document.onmousemove = e => {
        if (type === 'column-resize') {
          const delta = e.pageX - coords.right
          const width = coords.width + delta + 'px'

          $parent.css({width})

          cells.forEach(cell => {
            cell.classList.add('active')
            cell.style.width = width
          })
        } else {
          const delta = e.pageY - coords.bottom
          const height = coords.height + delta + 'px'

          $parent.css({height})
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
        cells.forEach(cell => cell.classList.remove('active'))
      }
    }
  }
}
