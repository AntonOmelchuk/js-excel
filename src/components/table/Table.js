import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {tableResize} from '@/components/table/table.resize';
import {isCell, shouldResize} from '@/components/table/table.helpers';
import {TableSelection} from '@/components/table/TableSelection';
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

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    const $el = this.$root.find('[data-id="0:0"]')
    this.selection.select($el)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      tableResize(this.$root, event)
    } else if (isCell(event)) {
      const $cell = $(event.target)
      console.log(this.selection)
      this.selection.select($cell)
    }
  }
}
