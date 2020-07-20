import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor(root, options = {}) {
    super(root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.store = options.store
    this.storeSub = null
    this.unsubscribers = []

    this.prepare()
  }
  // configure component before init
  prepare() {}

  toHtml() {
    return ``
  }
  // notify subscribers about new event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  // subscribe on event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn)
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
