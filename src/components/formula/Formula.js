import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor(root, options) {
    super(root, {
      name: 'Formula',
      listeners: ['input'],
      ...options
    });
  }

  toHtml() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `
  }

  onInput(event) {
    this.emitter.emit('formula', event.target.textContent)
  }
}
