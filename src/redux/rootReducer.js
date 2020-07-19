export function rootReducer(state, action) {
  switch (action.type) {
    case 'TABLE_RESIZE':
      const prevState = state.tableSize || {}
      prevState[action.data.id] = action.data.value
      return {
        ...state,
        tableSize: prevState
      }
    default:
      return state
  }
}
