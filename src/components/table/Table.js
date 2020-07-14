import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {tableResize} from '@/components/table/table.resize';
import {findNextSelector, isCell, matrix, shouldResize} from './table.helpers';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'keydown']
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
      if (event.shiftKey) {
        const $selectedCells = matrix($cell, this.selection.currentCell).map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($selectedCells)
      } else {
        this.selection.select($cell)
      }
    }
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft']
    const {key} = event

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const currentId = this.selection.currentCell.id('parse')
      const $nextSelector = this.$root.find(findNextSelector(key, currentId))
      this.selection.select($nextSelector)
    }
  }
}
