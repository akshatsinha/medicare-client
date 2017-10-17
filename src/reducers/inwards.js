import {
  OPEN_ADD_INWARD_MODAL,
  CLOSE_ADD_INWARD_MODAL,
  FETCH_VIEW_BY_AGENCIES,
  FETCH_VIEW_BY_OFFICES,
  SHOW_EDIT_INWARD_MODAL,
  HIDE_EDIT_INWARD_MODAL
} from '../actions/types'

const defaultState = {
  all: {},
  add_inward_is_open: false,
  edit_inward_is_open: false,
  del_inward_is_open: false,
  agency_periods: [],
  office_periods: []
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case OPEN_ADD_INWARD_MODAL:
      return { ...state, add_inward_is_open: true }
    case CLOSE_ADD_INWARD_MODAL:
      return { ...state, add_inward_is_open: false }
    case FETCH_VIEW_BY_AGENCIES:
      return { ...state, agency_periods: action.payload }
    case FETCH_VIEW_BY_OFFICES:
      return { ...state, office_periods: action.payload }
    case SHOW_EDIT_INWARD_MODAL:
      return { ...state, edit_inward_is_open: true }
    case HIDE_EDIT_INWARD_MODAL:
      return { ...state, edit_inward_is_open: false }
  }

  return state
}
