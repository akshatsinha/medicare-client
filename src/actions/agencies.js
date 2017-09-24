import axios from 'axios'
import config from '../../config'
import {
  AGENCY_FETCH,
  CLOSE_ADD_AGENCY_MODAL,
  CLOSE_EDIT_AGENCY_MODAL,
  CLOSE_DEL_AGENCY_MODAL
} from '../actions/types'

export function fetchAgencies() {
  return function(dispatch) {
    return axios.get(`${config.API_URL}/agency/list`, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(agencyList => {
      dispatch({ type: AGENCY_FETCH, payload: agencyList.data })
    })
  }
}

export function createAgency(agencyObj) {
  return function(dispatch) {
    return axios.post(`${config.API_URL}/agency/add`, agencyObj, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(agencyList => {
      dispatch({ type: AGENCY_FETCH, payload: agencyList.data })
      dispatch({ type: CLOSE_ADD_AGENCY_MODAL })
    })
  }
}

export function updateAgency(agencyObj) {
  const { name, address, phone, id } = agencyObj
  return function(dispatch) {
    return axios.post(`${config.API_URL}/agency/update/${id}`, { name, address, phone }, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(agencyList => {
      dispatch({ type: AGENCY_FETCH, payload: agencyList.data })
      dispatch({ type: CLOSE_EDIT_AGENCY_MODAL })
    })
  }
}

export function deleteAgency(agencyId) {
  return function(dispatch) {
    return axios.delete(`${config.API_URL}/agency/delete/${agencyId}`, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(agencyList => {
      dispatch({ type: AGENCY_FETCH, payload: agencyList.data })
      dispatch({ type: CLOSE_DEL_AGENCY_MODAL })
    })
  }
}
