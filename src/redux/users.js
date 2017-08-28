import { merge, assign, get } from "lodash/fp";
import _ from "lodash";
import { getCurrentUser } from "../util/users";
import { logExec } from "../util/util";

const initialState = {
  currentUser: undefined,
  userData: {}
};
const users = (state = initialState, action) => {
  if (!action) return state;
  const arg = action.payload;
  const user = getCurrentUser(state);
  switch (action.type) {
    case "USER_ADD":
      return {
        currentUser: arg.login,
        userData: {
          ...state.userData,
          ...{
            [arg.login]: { ...arg, repos: {} }
          }
        }
      };
    case "USER_REPO_ADD":
      return {
        ...state,
        userData: {
          ...state.userData,
          [user.login]: { ...user, repos: merge(user.repos, arg) }
        }
      };
    case "USER_CACHED":
      return {
        ...state,
        currentUser: arg
      };
    default:
      return state;
  }
};

export default users;
