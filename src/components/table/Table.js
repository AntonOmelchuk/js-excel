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

      document.onmousemove = e => {
        const delta = e.pageX - coords.right
        const value = coords.width + delta

        $parent.$el.style.width = `${value}px`
        cells.forEach(cell => {
          cell.classList.add('active')
          cell.style.width = `${value}px`
        })
      }

      document.onmouseup = () => {
        document.onmousemove = null
        cells.forEach(cell => cell.classList.remove('active'))
      }
    }
  }
}
