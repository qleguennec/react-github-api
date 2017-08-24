import fp from "lodash/fp";
import _ from "lodash";
import getCurrentUser from "../redux/users.js";
import { repoListState } from "../util/repos.js";
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
        .catch(bindDispatch("ERROR_ADD", dispatch))
        .then(log("okDispatch called", args.okDispatch));
};

const fetchUser = input => (dispatch, getState) =>
  dispatch(
    fetchUserApi({
      checkout: () => _.get(getState().users.userData, input) !== undefined,
      checkoutDispatch: () => bindDispatch("USER_SET_CURRENT", dispatch)(input),
      request: () => "http://api.github.com/users/" + input,
      okDispatch: _.flow(
        x => ({ login: x.login, data: x }),
        bindDispatch("USER_ADD", dispatch)
      )
    })
  );

const fetchRepo = page => (dispatch, getState) => {
  const user = getCurrentUser(getState().users);
  const repoList = repoListState(getState());
  return dispatch(
    fetchUserApi({
      checkout: () => !user || repoList.length,
      request: () => user.repos_url + "?page=" + page,
      checkoutDispatch: bindDispatch("USER_REPO_CACHED", dispatch),
      okDispatch: bindDispatch("USER_REPO_ADD", dispatch)
    })
  );
};

export { fetchRepo, fetchUser };
