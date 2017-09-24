import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'
import auth from './auth'
import agencies from './agencies'

const rootReducer = combineReducers({
  form,
  auth,
  agencies
});

export default rootReducer;
