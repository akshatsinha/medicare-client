import axios from 'axios'
import config from '../../config'
import {
  OFFICE_FETCH,
  CLOSE_ADD_OFFICE_MODAL,
  CLOSE_EDIT_OFFICE_MODAL,
  CLOSE_DEL_OFFICE_MODAL
} from '../actions/types'

export function fetchOffices() {
  return function(dispatch) {
    return axios.get(`${config.API_URL}/office/list`, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(officeList => {
      dispatch({ type: OFFICE_FETCH, payload: officeList.data })
    })
  }
}

export function createOffice(officeObj) {
  return function(dispatch) {
    return axios.post(`${config.API_URL}/office/add`, officeObj, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(officeList => {
      dispatch({ type: OFFICE_FETCH, payload: officeList.data })
      dispatch({ type: CLOSE_ADD_OFFICE_MODAL })
    })
  }
}

export function updateOffice(officeObj) {
  const { name, address, phone, id } = officeObj
  return function(dispatch) {
    return axios.post(`${config.API_URL}/office/update/${id}`, { name, address, phone }, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(officeList => {
      dispatch({ type: OFFICE_FETCH, payload: officeList.data })
      dispatch({ type: CLOSE_EDIT_OFFICE_MODAL })
    })
  }
}

export function deleteOffice(officeObj) {
  return function(dispatch) {
    return axios.delete(`${config.API_URL}/office/delete/${officeObj}`, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(officeList => {
      dispatch({ type: OFFICE_FETCH, payload: officeList.data })
      dispatch({ type: CLOSE_DEL_OFFICE_MODAL })
    })
  }
}
