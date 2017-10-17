import axios from 'axios'
import orderBy from 'lodash/orderBy'
import config from '../../config'
import {
  OPEN_ADD_INWARD_MODAL,
  CLOSE_ADD_INWARD_MODAL,
  FETCH_VIEW_BY_AGENCIES,
  FETCH_VIEW_BY_OFFICES,
  HIDE_EDIT_INWARD_MODAL
} from '../actions/types'

export function createInward(inwardObj) {
  return function(dispatch) {
    return axios.post(`${config.API_URL}/inward/add`, inwardObj, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(response => {
      dispatch({ type: CLOSE_ADD_INWARD_MODAL })
    })
  }
}

export function viewByAgencies() {
  return function(dispatch) {
    return axios.get(`${config.API_URL}/inward/view-by-agencies`, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(agencyPeriods => {
      let sortedPeriodKeys = orderBy(Object.keys(agencyPeriods.data), ['desc'])
      let sortedPeriodData = []
      sortedPeriodKeys.forEach(periodKey => sortedPeriodData.push(agencyPeriods.data[periodKey]))
      dispatch({ type: FETCH_VIEW_BY_AGENCIES, payload: sortedPeriodData })
    })
  }
}

export function viewByOffices() {
  return function(dispatch) {
    return axios.get(`${config.API_URL}/inward/view-by-offices`, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(officesPeriods => {
      let sortedPeriodKeys = orderBy(Object.keys(officesPeriods.data), ['desc'])
      let sortedPeriodData = []
      sortedPeriodKeys.forEach(periodKey => sortedPeriodData.push(officesPeriods.data[periodKey]))
      dispatch({ type: FETCH_VIEW_BY_OFFICES, payload: sortedPeriodData })
    })
  }
}

export function updateInward(inwardObj, src) {
  return function(dispatch) {
    return axios.post(`${config.API_URL}/inward/update/${inwardObj._id}`, {inwardObj, src}, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(response => {
      let sortedPeriodKeys = orderBy(Object.keys(response.data), ['desc'])
      let sortedPeriodData = []
      sortedPeriodKeys.forEach(periodKey => sortedPeriodData.push(response.data[periodKey]))
      dispatch({ type: HIDE_EDIT_INWARD_MODAL })
      dispatch({ type: src === 'agency' ? FETCH_VIEW_BY_AGENCIES : FETCH_VIEW_BY_OFFICES, payload: sortedPeriodData })
    })
  }
}
