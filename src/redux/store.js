import { createStore, combineReducers } from 'redux'

import list from './list'

const store = createStore(
  combineReducers({ list })
    , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;
