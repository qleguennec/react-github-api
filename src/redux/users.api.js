import fp from "lodash/fp";
import _ from "lodash";
import { getCurrentUserState } from "../util/users.js";
import { repoListState } from "../util/repos.js";
import { getRepoPage } from "../util/repos";
import { bindDispatch } from "../util/util.js";

const fetchApi = args => dispatch => {
  const log_active = true;
  const log = (str, func) => x => {
    if (log_active) console.log("fetchApi/", str, x);
    func(x);
  };

  return args.cached()
    ? bindDispatch(args.cached_type)(dispatch)(args.input)
    : fetch(args.request())
        .then(fp.invoke("json"))
        .then(
          result =>
            result.message === "Not Found"
              ? Promise.reject({ type: "ERROR_FETCH_NOT_FOUND", error: result })
              : Promise.resolve(result)
        )
        .then(log("okDispatch called", args.dispatch));
  //        .catch(bindDispatch("ERROR_ADD")(dispatch));
};

const fetchUser = input => (dispatch, getState) =>
  dispatch(
    fetchApi({
      input,
      cached_type: "USER_CACHED",
      cached: () => _.get(getState().users.userData, input),
      request: () => "http://api.github.com/users/" + input,
      dispatch: bindDispatch("USER_ADD")(dispatch)
    })
  );

const fetchRepo = page => (dispatch, getState) => {
  const user = getCurrentUserState(getState());
  const repoList = getRepoPage(page, user);
  return dispatch(
    fetchApi({
      input: page,
      cached_type: "REPO_CACHED",
      cached: () => repoList !== undefined,
      request: () => user.repos_url + "?page=" + page,
      dispatch: _.flow(
        x => ({ [page]: x }),
        bindDispatch("USER_REPO_ADD")(dispatch)
      )
    })
  );
};

export { fetchRepo, fetchUser };
