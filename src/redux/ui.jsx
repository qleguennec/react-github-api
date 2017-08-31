import fp from "lodash/fp";
import RepoList from "../githubUser/RepoList.jsx";
import React from "react";

const initialState = {
  frame: <RepoList />,
  page: 1,
  selected: {}
};

const ui = (state = initialState, action = {}) => {
  const arg = action.payload;
  switch (action.type) {
    case "UI_CHANGE_PAGE":
      return { ...state, page: arg };
    case "UI_CHANGE_FRAME":
      return { ...state, frame: arg, page: 1 };
    case "USERS_ADD":
      return { ...state, selected: { ...state.selected, users: arg.id } };
    case "USERS_CACHED":
      return { ...state, selected: { ...state.selected, users: arg.id } };
    case "UI_SELECT":
      return { ...state, selected: { ...state.selected, ...arg } };
    default:
      return state;
  }
};

export default ui;
