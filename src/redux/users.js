import _ from "lodash";
import fp from "lodash/fp";

import getCurrentUser from "../util/users";

const initialState = {
  currentUser: undefined,
  userData: {}
};

const users = (state = initialState, action = {}) => {
  const user = getCurrentUser(state);

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
      return {
        ...state,
        ...{
          [user.login]: {
            ...user,
            repos: [...user.repos, action.payload.result]
          }
        }
      };
    case "USER_SET_CURRENT":
      return fp.assign({ currentUser: action.payload }, state);
    default:
      return state;
  }
};

export { users, getCurrentUser };
