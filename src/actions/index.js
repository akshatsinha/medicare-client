import axios from 'axios'
import { browserHistory } from 'react-router'
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  FETCH_MESSAGE
} from '../actions/types'
import config from '../../config'

export function signinUser({  email, password }) {
  return function(dispatch) {
    return axios.post(`${config.API_URL}/signin`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER })
        localStorage.setItem('token', response.data.token)
        browserHistory.push('/profile')
      })
      .catch(() => dispatch(authError('Bad Login Info')))
  }
}

export function signupUser(formProps) {
  return function(dispatch) {
    return axios.post(`${config.API_URL}/signup`, formProps)
      .then(response => {
        dispatch({ type: AUTH_USER })
        localStorage.setItem('token', response.data.token)
        browserHistory.push('/')
      })
      .catch()
  }
}

export function signoutUser() {
  localStorage.removeItem('token')
  browserHistory.push('/')
  return { type: UNAUTH_USER }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function fetchMessage() {
  return function(dispatch) {
    return axios.get(config.API_URL, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(response => {
      dispatch({ type: FETCH_MESSAGE, payload: response.data.message })
    })
  }
}
