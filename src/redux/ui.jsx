import fp from "lodash/fp";
import RepoList from "../githubUser/RepoList.jsx";
import React from "react";

const initialState = {
  frame: <RepoList />,
  page: 1
};

const ui = (state = initialState, action = {}) => {
  switch (action.type) {
    case "UI_CHANGE_PAGE":
      return { ...state, page: action.payload };
    case "UI_CHANGE_FRAME":
      return { ...state, frame: action.payload };
    case "USER_CACHED":
      return { ...state, frame: <RepoList /> };
    case "USER_ADD":
      return { ...state, page: 1 };
    default:
      return state;
  }
};

export default ui;
