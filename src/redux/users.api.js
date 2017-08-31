import fp from "lodash/fp";
import _ from "lodash";
import { getSelected, userCache, bindDispatch } from "../util/util.js";
import config from "../util/config.js";

const fetchApi = (request, prop, result) => (dispatch, getState) => {
  const cache = getState().cache;
  const cached = cache ? cache.find(x => x.request === request) : undefined;
  if (cached) return dispatch({ type: prop + "_CACHED", payload: cached });
  return fetch(request)
    .then(fp.invoke("json"))
    .then(
      result =>
        result.message === "Not Found"
          ? Promise.reject(
              dispatch({ type: "ERROR_FETCH_NOT_FOUND", error: result })
            )
          : Promise.resolve(result)
    )
    .then(x => dispatch({ type: prop + "_ADD", payload: result(x), request }));
};

const fetchUser = input => (dispatch, getState) =>
  dispatch(
    fetchApi("http://api.github.com/users/" + input, "USERS", _.identity)
  );

const fetchRepo = page => (dispatch, getState) => {
  const user = getSelected("users")(getState());
  const request = `${user.repos_url}?page=${page}&per_page=${config.repos
    .per_page}`;
  return dispatch(fetchApi(request, "REPOS", fp.map(x => ({ ...x, page }))));
};

const fetchIssues = page => (dispatch, getState) => {
  const user = getSelected("users")(getState());
  const repo = getSelected("repos")(getState());
  console.log(getState());
  const request = `http://api.github.com/repos/${user.login}/${repo.name}/issues?page=${page}&per_page=${config
    .issues.per_page}`;
  return dispatch(fetchApi(request, "ISSUES", fp.map(x => ({ ...x, page }))));
};

export { fetchIssues, fetchUser, fetchRepo };
