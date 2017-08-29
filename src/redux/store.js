import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import users from "./users";
import errors from "./errors";
import repos from "./repos";
import ui from "./ui.jsx";

const store = createStore(
  combineReducers({ repos, users, errors, ui }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
