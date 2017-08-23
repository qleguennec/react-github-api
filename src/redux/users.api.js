import fp from "lodash/fp";
import _ from "lodash";
import { getCurrentUser } from "../redux/users.js";
import { n_repos_per_page, repoListState } from "../util/repos.js";
import { bindDispatch } from "../util/util.js";

const fetchUserApi = args => dispatch => {
  const log_active = true;
  const log = (str, func) => x => {
    if (log_active) console.log("fetchUserApi/", str, x);
    func(x);
  };

  return args.checkout()
    ? log("checkoutDispatch called", args.checkoutDispatch)
    : fetch(args.request())
        .then(fp.invoke("json"))
        .then(
          result =>
            result.message && result.message === "Not Found"
              ? Promise.reject("user not found")
              : Promise.resolve(result)
        )
        .catch(err => ({ type: "ERROR_ADD", payload: err }))
        .then(log("okDispatch called", args.okDispatch));
};

const fetchUser = input => (dispatch, getState) =>
  dispatch(
    fetchUserApi({
      checkout: _.constant(
        _.get(getState().users.userData, input) !== undefined
      ),
      checkoutDispatch: bindDispatch(dispatch, "USER_SET_CURRENT")(input),
      request: _.constant("http://api.github.com/users/" + input),
      okDispatch: _.flow(
        x => ({ login: x.login, data: x }),
        bindDispatch(dispatch, "USER_ADD")
      )
    })
  );

const fetchRepo = page => (dispatch, getState) => {
  const user = getCurrentUser(getState().users);
  const repoList = repoListState(getState());
  console.log(repoList);
  return dispatch(
    fetchUserApi({
      checkout: _.constant(!user || repoList.length === n_repos_per_page),
      request: _.constant(user.repos_url + "?page=" + page),
      checkoutDispatch: bindDispatch(dispatch, "USER_REPO_CACHED"),
      okDispatch: bindDispatch(dispatch, "USER_REPO_ADD")
    })
  );
};

export { fetchRepo, fetchUser };
