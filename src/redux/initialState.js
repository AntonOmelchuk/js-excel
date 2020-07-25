import {storage} from '../core/utils'
import {DEFAULT_STYLES} from '../constants'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: '',
  currentStyles: DEFAULT_STYLES
}

export const initialState = storage('excel-state') ? storage('excel-state') : defaultState
