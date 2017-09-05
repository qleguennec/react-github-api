import {bind} from "../util/util.js";
import GithubUser from "../githubUser/GithubUser.jsx";
import fp from "lodash/fp";

export default bind({frame: fp.get("ui.frame")})(GithubUser);
