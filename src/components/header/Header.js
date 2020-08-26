import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {changeTitle} from '../../redux/actions';
import {debounce} from '../../core/utils';
import {ActiveRoute} from '../../core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor(root, options) {
    super(root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHtml() {
    const title = this.store.getState().title
    return `
      <input type="text" class="input" value="${title}" />
      <div>
          <div class="button" data-button="exit">
              <span class="material-icons">exit_to_app</span>
          </div>
          <div class="button">
              <span class="material-icons" data-button="remove">delete</span>
          </div>
      </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }

  onClick(event) {
    const $target = $(event.target)
    const child = event.target.firstChild.data
    if ($target.data.button === 'remove' || child === 'delete') {
      const decision = confirm('Do you want to delete this table?')

      if (decision) {
        console.log('excel:' + ActiveRoute.param)
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.button === 'exit' || child === 'exit_to_app') {
      ActiveRoute.navigate('')
    }
  }
}
