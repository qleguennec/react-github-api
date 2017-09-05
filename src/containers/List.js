import {bind} from "../util/util.js";
import fp from "lodash/fp";
import List from "../components/List.jsx";

export default bind({
	page: fp.get("ui.page")
})(List);
