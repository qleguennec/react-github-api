import extend from "lodash/fp";
import _ from "lodash";
import getCurrentUser from "../util/users";
import { bindReducer } from "../util/util";

const initialState = {
  currentUser: undefined,
  userData: {}
};

const initUser = {
  repos: []
};

const users = (state = initialState, action) =>
  bindReducer(
    action,
    { user: getCurrentUser, logState: console.log },
    {
      USER_ADD: payload => state => ({
        currentUser: payload.login,
        userData: {
          ...state.userData,
          ...{ [payload.login]: extend(payload.data, initUser) }
        }
      }),

      USER_REPO_ADD: payload =>
        extend(
          extend({ repos: [...this.user.repos, ...payload] }, this.user.repos)
        ),

      USER_SET_CURRENT: payload => extend({ currentUser: payload })
    }
  );

export default users;
