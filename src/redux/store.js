import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { users } from "./users";
import errors from "./errors";
import ui from "./ui";

const store = createStore(
  combineReducers({ users, errors, ui }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
