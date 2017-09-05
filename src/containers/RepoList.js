import {
	bind,
	getSelected,
	withDispatch as withD,
	bindDispatch as bindD
} from "../util/util.js";
import RepoList from "../githubUser/RepoList.jsx";
import fp from "lodash/fp";
import {fetchIssues, fetchRepo} from "../redux/users.api";

export default bind(
	{
		user: getSelected("users"),
		page: fp.get("ui.page"),
		repos: fp.get("repos")
	},
	{
		changePage: bindD("UI_CHANGE_PAGE"),
		changeFrame: bindD("UI_CHANGE_FRAME"),
		changeRepo: bindD("UI_SELECT"),
		getIssues: withD(fetchIssues),
		fetchPage: withD(fetchRepo)
	}
)(RepoList);
