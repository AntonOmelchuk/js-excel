import {TABLE_RESIZE} from './types'

export function rootReducer(state, action) {
  let prevState
  switch (action.type) {
    case TABLE_RESIZE:
      const field = action.data.type === 'row-resize' ? 'rowSize' : 'colSize'
      prevState = state?.colSize || {}
      prevState[action.data.id] = action.data.value
      return {
        ...state,
        [field]: prevState
      }
    default:
      return state
  }
}
