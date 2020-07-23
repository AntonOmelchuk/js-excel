import {ExcelComponent} from '@core/ExcelComponent';
import {toolbarTamplate} from './toolbar.template';
import {$} from '@core/dom';

export class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar'

  constructor(root, options) {
    super(root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options
    });
  }

  toHtml() {
    toolbarTamplate
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      console.log('work')
    }
  }
}
