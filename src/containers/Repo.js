import {bind, getSelected} from "../util/util.js";
import fp from "lodash/fp";
import Repo from "../githubUser/Repo.jsx";

export default bind({
	repo: getSelected("repos"),
	issues: fp.get("issues")
})(Repo);
