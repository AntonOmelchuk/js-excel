import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {tableResize} from '@/components/table/table.resize';
import {shouldResize} from '@/components/table/table.helpers';
import {TableSelection} from '@/components/table/TableSelection';

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

  init() {
    super.init()

    this.selection = new TableSelection()
    const $el = this.$root.find('[data-id="0:0"]')
    $el.addClass('selected')
    this.selection.select($el)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      tableResize(this.$root, event)
    }
  }
}
