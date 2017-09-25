import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import thunk from 'redux-thunk'

import App from './containers/App'
import Admin from './containers/admin'
import Profile from './containers/Profile'
import Welcome from './components/Welcome'
import Inwards from './containers/inwards/index'
import Signin from './containers/auth/Signin'
import Signup from './containers/auth/Signup'
import Signout from './containers/auth/Signout'
import RequireAuth from './containers/auth/RequireAuth'

import reducers from './reducers'
import { AUTH_USER } from './actions/types'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const store = createStoreWithMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
const token = localStorage.getItem('token')
if (token) {
  store.dispatch({ type: AUTH_USER })
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <IndexRoute component={Welcome} />
        <Route path="sign-in" component={Signin} />
        <Route path="sign-up" component={Signup} />
        <Route path="sign-out" component={Signout} />
        <Route path="admin" component={RequireAuth(Admin)} />
        <Route path="inwards" component={RequireAuth(Inwards)} />
        <Route path="profile" component={RequireAuth(Profile)} />
      </Route>
      <App />
    </Router>
  </Provider>
  , document.querySelector('.main-container'));
