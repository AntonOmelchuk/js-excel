export class ActiveRoute {
  static get path() {
    return window.location.hash.slice(1)
  }

  static get param() {
    console.log('path: ', ActiveRoute.path.split('/'))
    return ActiveRoute.path.split('/')
  }
}
