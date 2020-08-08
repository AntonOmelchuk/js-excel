import {toolbarTamplate} from './toolbar.template';
import {$} from '@core/dom';
import {ExcelStateComponent} from '../../core/ExcelStateComponent';
import {DEFAULT_STYLES} from '../../constants';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor(root, options) {
    super(root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    });
  }

  prepare() {
    this.initState(DEFAULT_STYLES)
  }

  get template() {
    return toolbarTamplate(this.state)
  }

  toHtml() {
    return this.template
  }

  storeChange(changes) {
    this.setState(changes.currentStyles)
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      this.$emit('toolbar:applyStyles', value)
    }
  }
}
