import fp from "lodash/fp";
import _ from "lodash";
import { getCurrentUser } from "../redux/users.js";
import { n_repos_per_page, repoListState } from "../util/repos.js";

const fetchUserApi = args => dispatch =>
  args.checkout()
    ? args.checkoutDispatch()
    : fetch(args.request())
        .then(fp.invoke("json"))
        .then(
          result =>
            result.message && result.message === "Not Found"
              ? Promise.reject("user not found")
              : Promise.resolve(result)
        )
        .catch(err => {
          dispatch({ type: "ERROR_ADD", payload: err });
        })
        .then(args.okDispatch);

const fetchUser = input => (dispatch, getState) =>
  dispatch(
    fetchUserApi({
      checkout: () => _.get(getState().users.userData, input) !== undefined,
      checkoutDispatch: () =>
        dispatch({
          type: "USER_SET_CURRENT",
          payload: input
        }),
      request: () => "http://api.github.com/users/" + input,
      okDispatch: result =>
        dispatch({
          type: "USER_ADD",
          payload: { login: result.login, data: result }
        })
    })
  );

const fetchRepo = page => (dispatch, getState) => {
  const user = getCurrentUser(getState().users);
  return dispatch(
    fetchUserApi({
      checkout: () =>
        !user || repoListState(getState()).length !== n_repos_per_page,
      checkoutDispatch: () => {},
      request: () => user.repos_url + "?page=" + page,
      okDispatch: result => dispatch({ type: "USER_REPO_ADD", payload: result })
    })
  );
};

export { fetchRepo, fetchUser };
