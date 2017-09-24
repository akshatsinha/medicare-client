import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'
import auth from './auth'
import agencies from './agencies'
import offices from './offices'

const rootReducer = combineReducers({
  form,
  auth,
  agencies,
  offices
});

export default rootReducer;
