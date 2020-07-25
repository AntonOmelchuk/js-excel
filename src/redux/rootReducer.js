import {TABLE_RESIZE, CHANGE_TEXT, CHANGE_STYLES} from './types'

export function rootReducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE:
      const field = action.data.type === 'row-resize' ? 'rowSize' : 'colSize'
      return {
        ...state,
        [field]: setValue(state, field, action)
      }
    case CHANGE_TEXT:
      return {
        ...state,
        currentText: action.data.value,
        dataState: setValue(state, 'dataState', action)
      }
    case CHANGE_STYLES:
      return {
        ...state,
        currentStyles: action.data
      }
    default:
      return state
  }
}

const setValue = (state, field, action) => {
  const value = state[field] || {}
  value[action.data.id] = action.data.value
  return value
}
