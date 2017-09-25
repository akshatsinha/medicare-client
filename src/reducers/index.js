import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'
import auth from './auth'
import agencies from './agencies'
import offices from './offices'
import inwards from './inwards'

const rootReducer = combineReducers({
  form,
  auth,
  agencies,
  offices,
  inwards
});

export default rootReducer;
