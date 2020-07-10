import {$} from '@core/dom';

export class Excel {
  constructor(selector, options) {
    this.el = $(selector)
    this.components = options.components || []
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    this.components.forEach(Component => {
      const component = new Component();
      const $el = $.create('div', Component.className)
      $el.html(component.toHtml())
      $root.append($el)
    })
    return $root
  }

  render() {
    this.el.append(this.getRoot())
  }
}
