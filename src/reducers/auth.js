import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  FETCH_MESSAGE
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true }
    case AUTH_ERROR:
      return { ...state, authenticated: false, error: action.payload }
    case UNAUTH_USER:
      return { ...state, authenticated: false }
    case FETCH_MESSAGE:
      return { ...state, message: action.payload }
  }

  return state
}
