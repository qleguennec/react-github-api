import { createStore, combineReducers } from 'redux'

import githubUser from './githubUser'

const store = createStore(
  combineReducers( {githubUser })
  , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;
