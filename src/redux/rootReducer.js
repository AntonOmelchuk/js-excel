import {TABLE_RESIZE, CHANGE_TEXT, CHANGE_STYLES, APPLY_STYLE, CHANGE_TITLE} from './types'

export function rootReducer(state, action) {
  let field
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'row-resize' ? 'rowSize' : 'colSize'
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
    case APPLY_STYLE:
      field = 'stylesState'
      const value = state[field] || {}
      action.data.ids.forEach(id => {
        value[id] = {...value[id], ...action.data.value}
      })
      return {
        ...state,
        [field]: value,
        currentStyles: {...state.currentStyles, ...action.data.value}
      }
    case CHANGE_TITLE:
      return {
        ...state,
        title: action.data
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
