import {DEFAULT_STYLES, DEFAULT_TITLE} from '../constants'

const defaultState = {
  title: DEFAULT_TITLE,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: DEFAULT_STYLES,
  openDate: new Date().toJSON()
}

const normalize = state => ({
  ...state,
  currentStyles: defaultState,
  currentText: ''
})

export const normalizeInitState = state => state ? normalize(state) : {...defaultState}
