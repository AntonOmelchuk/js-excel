import {TABLE_RESIZE, CHANGE_TEXT} from './types';

export const setTableSize = data => ({type: TABLE_RESIZE, data})

export const changeText = data => ({type: CHANGE_TEXT, data})
