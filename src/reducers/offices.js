import {
  OFFICE_FETCH,
  CLOSE_ADD_OFFICE_MODAL,
  OPEN_ADD_OFFICE_MODAL,
  CLOSE_EDIT_OFFICE_MODAL,
  OPEN_EDIT_OFFICE_MODAL,
  OPEN_DEL_OFFICE_MODAL,
  CLOSE_DEL_OFFICE_MODAL
} from '../actions/types'

const defaultState = {
  all: {},
  add_office_is_open: false,
  edit_office_is_open: false,
  del_office_is_open: false
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case OFFICE_FETCH:
      return { ...state, all: action.payload }
    case OPEN_ADD_OFFICE_MODAL:
      return { ...state, add_office_is_open: true }
    case CLOSE_ADD_OFFICE_MODAL:
      return { ...state, add_office_is_open: false }
    case OPEN_EDIT_OFFICE_MODAL:
      return { ...state, edit_office_is_open: true }
    case CLOSE_EDIT_OFFICE_MODAL:
      return { ...state, edit_office_is_open: false }
    case OPEN_DEL_OFFICE_MODAL:
      return { ...state, del_office_is_open: true }
    case CLOSE_DEL_OFFICE_MODAL:
      return { ...state, del_office_is_open: false }
  }

  return state
}
