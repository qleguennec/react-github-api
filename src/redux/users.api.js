import fp from "lodash/fp";
import _ from "lodash";
import {getSelected} from "../util/util.js";
import config from "../util/config.js";

const fetchApi = (request, prop, result) => (dispatch, getState) => {
	const cache = getState().cache;
	const cached = cache
		? cache.find(x => x.request === request)
		: undefined;
	if (cached)
		return dispatch({type: prop + "_CACHED", payload: cached});

	return fetch(request)
		.then(fp.invoke("json"))
		.then(x =>
			dispatch(
				x.message === "Not Found"
					? {type: "ERROR_FETCH_NOT_FOUND", error: x}
					: {type: prop + "_ADD", payload: result(x), request}
			)
		);
};

const fetchUser = input => (dispatch, getState) =>
	dispatch(
		fetchApi(config.users.request(input), "USERS", _.identity)
	);

const fetchRepo = page => (dispatch, getState) =>
	dispatch(
		fetchApi(
			config.repos.request(page, getSelected("users")(getState())),
			"REPOS",
			fp.map(x => ({...x, page}))
		)
	);

const fetchIssues = page => (dispatch, getState) =>
	dispatch(
		fetchApi(
			config.issues.request(
				page,
				getSelected("users")(getState()),
				getSelected("repos")(getState())
			),
			"ISSUES",
			fp.map(x => ({...x, page}))
		)
	);

export {fetchIssues, fetchUser, fetchRepo};
