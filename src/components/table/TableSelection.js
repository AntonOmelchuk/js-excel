export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.currentCell = null
  }

  select($el) {
    this.clear()
    this.currentCell = $el
    this.group.push($el)
    $el.focus().addClass(TableSelection.className)
  }

  selectGroup($elements = []) {
    this.clear()
    this.group = $elements
    this.group.forEach(el => el.addClass(TableSelection.className))
  }

  clear() {
    this.group.forEach(cell => cell.removeClass(TableSelection.className))
    this.group = []
  }
}
