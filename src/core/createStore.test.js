import {createStore} from './createStore'

describe('TEST', () => {
  test('createStore', () => {
    const store = createStore(() => {}, {})
    expect(store).toBeDefined()
  })
})
