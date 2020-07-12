export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
  }

  select($el) {
    this.clear()
    this.group.push($el)
    $el.addClass(TableSelection.className)
  }

  selectGroup() {

  }

  clear() {
    this.group.forEach(cell => console.log(cell))
    this.group.forEach(cell => cell.removeClass(TableSelection.className))
    this.group = []
  }
}
