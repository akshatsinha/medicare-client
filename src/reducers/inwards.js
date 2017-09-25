import {
  OPEN_ADD_INWARD_MODAL,
  CLOSE_ADD_INWARD_MODAL
} from '../actions/types'

const defaultState = {
  all: {},
  add_inward_is_open: false,
  edit_inward_is_open: false,
  del_inward_is_open: false
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case OPEN_ADD_INWARD_MODAL:
      return { ...state, add_inward_is_open: true }
    case CLOSE_ADD_INWARD_MODAL:
      return { ...state, add_inward_is_open: false }
  }

  return state
}
