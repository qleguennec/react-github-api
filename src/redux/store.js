import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import users from "./users";
import errors from "./errors";
import repo from "./repo";
import ui from "./ui.jsx";

const store = createStore(
  combineReducers({ repo, users, errors, ui }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
