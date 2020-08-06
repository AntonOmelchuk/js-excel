import {storage} from '../core/utils'
import {DEFAULT_STYLES, DEFAULT_TITLE} from '../constants'

const defaultState = {
  title: DEFAULT_TITLE,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: DEFAULT_STYLES
}

export const initialState = storage('excel-state') ? storage('excel-state') : defaultState
