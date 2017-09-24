import {
  AGENCY_FETCH,
  CLOSE_ADD_AGENCY_MODAL,
  OPEN_ADD_AGENCY_MODAL,
  CLOSE_EDIT_AGENCY_MODAL,
  OPEN_EDIT_AGENCY_MODAL,
  OPEN_DEL_AGENCY_MODAL,
  CLOSE_DEL_AGENCY_MODAL
} from '../actions/types'

const defaultState = {
  all: {},
  add_agency_is_open: false,
  edit_agency_is_open: false,
  del_agency_is_open: false
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case AGENCY_FETCH:
      return { ...state, all: action.payload }
    case OPEN_ADD_AGENCY_MODAL:
      return { ...state, add_agency_is_open: true }
    case CLOSE_ADD_AGENCY_MODAL:
      return { ...state, add_agency_is_open: false }
    case OPEN_EDIT_AGENCY_MODAL:
      return { ...state, edit_agency_is_open: true }
    case CLOSE_EDIT_AGENCY_MODAL:
      return { ...state, edit_agency_is_open: false }
    case OPEN_DEL_AGENCY_MODAL:
      return { ...state, del_agency_is_open: true }
    case CLOSE_DEL_AGENCY_MODAL:
      return { ...state, del_agency_is_open: false }
  }

  return state
}
