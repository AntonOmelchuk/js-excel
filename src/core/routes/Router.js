import {$} from '../dom'
import {ActiveRoute} from './ActiveRoute'
import {Loader} from '../../components/Loader/Loader'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router')
    }

    this.$placeholder = $(selector)
    this.routes = routes
    this.page = null
    this.loader = new Loader()

    this.changePageHandler = this.changePageHandler.bind(this)
    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }

  async changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }

    this.$placeholder.clear().append(this.loader)
    const Page = ActiveRoute.path.includes('excel') ? this.routes.excel : this.routes.dashboard
    const page = new Page(ActiveRoute.param)

    const $root = await page.getRoot()

    this.$placeholder.clear().append($root)

    page.afterRender()
  }
}
