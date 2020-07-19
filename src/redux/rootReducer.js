import {TABLE_RESIZE} from './types'

export function rootReducer(state, action) {
  let prevState
  switch (action.type) {
    case TABLE_RESIZE:
      prevState = state.colSize || {}
      prevState[action.data.id] = action.data.value
      return {
        ...state,
        colSize: prevState
      }
    default:
      return state
  }
}
