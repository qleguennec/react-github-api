import fp from "lodash/fp";

const initialState = {
  frame: "repo_list",
  page: 0
};

const ui = (state = initialState, action = {}) => {
  switch (action.type) {
    case "UI_CHANGE_ROUTE":
      return fp.extend(state, { frame: action.payload });
    case "UI_CHANGE_PAGE":
      return fp.extend(state, { page: action.payload });
    default:
      return state;
  }
};

export default ui;
