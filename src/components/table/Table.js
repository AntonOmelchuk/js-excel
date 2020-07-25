import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {tableResize} from '@/components/table/table.resize';
import {findNextSelector, isCell, matrix, shouldResize} from './table.helpers';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';
import {setTableSize, changeText, changeStyles} from '../../redux/actions';
import {DEFAULT_STYLES} from '../../constants';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  prepare() {
    this.selection = new TableSelection()
  }

  toHtml() {
    return createTable(20, this.store.getState())
  }

  init() {
    super.init()

    this.selectCell(this.$root.find('[data-id="0:0"]'))

    this.$on('formula:input', text => {
      this.selection.currentCell.text(text)
      this.changeText(text)
    })
    this.$on('formula:pressEnter', () => this.selection.currentCell.focus())

    this.$on('toolbar:applyStyles', state => {
      this.selection.applyStyles(state)
    })
  }

  changeText(text) {
    this.$dispatch(changeText({
      value: text,
      id: this.selection.currentCell.id()
    }))
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)

    const styles = $cell.getStyles(Object.keys(DEFAULT_STYLES))
    console.log(styles)
    this.$dispatch(changeStyles(styles))
  }

  async handleTableResize(event) {
    const data = await tableResize(this.$root, event)
    this.$dispatch(setTableSize(data))
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.handleTableResize(event)
    } else if (isCell(event)) {
      const $cell = $(event.target)
      if (event.shiftKey) {
        const $selectedCells = matrix($cell, this.selection.currentCell).map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($selectedCells)
      } else {
        this.selectCell($cell)
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
      this.selectCell($nextSelector)
    }
  }

  onInput(event) {
    this.changeText($(event.target).text())
  }
}
