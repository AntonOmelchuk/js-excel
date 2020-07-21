import {TABLE_RESIZE, CHANGE_TEXT} from './types'

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
    case CHANGE_TEXT:
      prevState = state['dataState'] || {}
      prevState[action.data.id] = action.data.value
      return {
        ...state,
        currentText: action.data.value,
        dataState: prevState
      }
    default:
      return state
  }
}
