import { merge, assign } from "lodash/fp";
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
    { user: getCurrentUser },
    {
      USER_ADD: payload => state => ({
        currentUser: payload.login,
        userData: {
          ...state.userData,
          ...{ [payload.login]: merge(payload, initUser) }
        }
      }),

      USER_REPO_ADD: function(payload) {
        console.log(this);
        return assign(
          assign({ repos: [...this.user.repos, ...payload] }, this.user.repos)
        );
      },

      USER_SET_CURRENT: payload => assign({ currentUser: payload })
    }
  )(state);

export default users;
