import fp from "lodash/fp";
import _ from "lodash";
import { getCurrent, userCache, bindDispatch } from "../util/util.js";

const fetchApi = args => dispatch => {
  const log_active = true;
  const log = (str, func) => x => {
    if (log_active) console.log("fetchApi/", str, x);
    func(x);
  };

  console.log(args.request());

  return args.cached()
    ? bindDispatch(args.cached_type)(dispatch)()
    : fetch(args.request())
        .then(fp.invoke("json"))
        .then(
          result =>
            result.message === "Not Found"
              ? Promise.reject({ type: "ERROR_FETCH_NOT_FOUND", error: result })
              : Promise.resolve(result)
        )
        .then(log("okDispatch called", args.dispatch));
};

const fetchUser = input => (dispatch, getState) =>
  dispatch(
    fetchApi({
      input,
      cached_type: "USERS_CACHED",
      cached: () => _.get(getState().users.data, input),
      request: () => "http://api.github.com/users/" + input,
      dispatch: bindDispatch("USERS_ADD")(dispatch)
    })
  );

const fetchPage = (name, request, isCached) => page => (dispatch, getState) =>
  dispatch(
    fetchApi({
      input: page,
      cached_type: name + "_CACHED",
      cached: () => isCached(getState()),
      request: () => request(getState()) + "?page=" + page,
      dispatch: _.flow(
        x => ({ [page]: x }),
        bindDispatch(name + "_ADD")(dispatch)
      )
    })
  );

const fetchRepo = page =>
  fetchPage(
    "REPOS",
    _.flow(getCurrent("users"), fp.get("repos_url")),
    _.flow(getCurrent("users"), fp.get("repos." + page))
  )(page);

const fetchIssues = page =>
  fetchPage(
    "ISSUES",
    fp.get("repos.current.issues_url"),
    _.flow(getCurrent("users"), fp.get("issues." + page))
  )(page);

export { fetchRepo, fetchUser, fetchIssues };
