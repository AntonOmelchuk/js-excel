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

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      const key = Object.keys(value)[0]
      this.$emit('toolbar:applyStyles', value)
      this.setState({[key]: value[key]})
    }
  }
}
