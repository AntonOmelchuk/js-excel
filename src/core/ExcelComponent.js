import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor(root, options = {}) {
    super(root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.store = options.store
    this.subscribe = options.subscribe || []
    this.unsubscribers = []

    this.prepare()
  }

  prepare() {}

  toHtml() {
    return ``
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  storeChange({currentText}) {
    this.$formula.text(currentText)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  init() {
    this.onInitDomListener()
  }

  destroy() {
    this.removeDomListeners()
    this.unsubscribers.forEach(unsub => unsub())
    this.storeSub.unsubscribe()
  }
}
