import fp from "lodash/fp";
import _ from "lodash";
import getCurrentUser from "../redux/users.js";
import { repoListState } from "../util/repos.js";
import { bindDispatch } from "../util/util.js";

const fetchApi = args => dispatch => {
  const log_active = true;
  const log = (str, func) => x => {
    if (log_active) console.log("fetchApi/", str, x);
    func(x);
  };

  return args.cached()
    ? bindDispatch("CACHED")(dispatch)(args.input)
    : fetch(args.request())
        .then(fp.invoke("json"))
        .then(
          result =>
            result.message === "Not Found"
              ? Promise.reject({ type: "ERROR_FETCH_NOT_FOUND", error: result })
              : Promise.resolve(result)
        )
        .catch(bindDispatch("ERROR_ADD")(dispatch))
        .then(log("okDispatch called", args.dispatch));
};

const fetchUser = input => (dispatch, getState) =>
  dispatch(
    fetchApi({
      input,
      cached: () => _.get(getState().users.userData, input),
      request: () => "http://api.github.com/users/" + input,
      dispatch: bindDispatch("USER_ADD")(dispatch)
    })
  );

const fetchRepo = page => (dispatch, getState) => {
  const user = getCurrentUser(getState().users);
  const repoList = repoListState(getState());
  return dispatch(
    fetchApi({
      input: page,
      cached: () => !user || repoList.length,
      request: () => user.repos_url + "?page=" + page,
      dispatch: bindDispatch("USER_REPO_ADD")(dispatch)
    })
  );
};

export { fetchRepo, fetchUser };
