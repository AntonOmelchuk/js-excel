import {capitalizeFirstChar} from '@core/utils';

export class DomListener {
  constructor(root, listeners = []) {
    if (!root) {
      throw new Error('No root element provided for DomListener')
    }
    this.$root = root
    this.listeners = listeners
  }

  onInitDomListener() {
    this.listeners.forEach(listener => {
      const method = makeMethodName(listener)

      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented in ${this.name} Component`)
      }
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method])
    })
  }

  removeDomListeners() {
    this.listeners.forEach(listener => {
      const method = makeMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

const makeMethodName = name => 'on' + capitalizeFirstChar(name)
