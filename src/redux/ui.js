import fp from "lodash/fp";

const initialState = {
  frame: "repo_list",
  page: 0
};

const ui = (state = initialState, action = {}) => {
  switch (action.type) {
    case "UI_CHANGE_ROUTE":
      return fp.assign({ frame: action.payload }, state);
    case "UI_CHANGE_PAGE":
      return fp.assign({ page: action.payload }, state);
    default:
      return state;
  }
};

export default ui;
