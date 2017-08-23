import fp from "lodash/fp";

import getCurrentUser from "../util/users";

const initialState = {
  currentUser: undefined,
  userData: {}
};

const users = (state = initialState, action = {}) => {
  const user = getCurrentUser(state);
  console.log(action);
  switch (action.type) {
    case "USER_ADD":
      return {
        currentUser: action.payload.login,
        userData: {
          ...state.userData,
          ...{ [action.payload.login]: action.payload.data }
        }
      };
    case "USER_REPO_ADD":
      return fp.extend(
        { repos: [...user.repos, ...action.payload] },
        user.repos
      );
    case "USER_SET_CURRENT":
      return fp.extend({ currentUser: action.payload }, state);
    default:
      return state;
  }
};

export { users, getCurrentUser };
