import {bind, getSelected} from "../util/util.js";
import NavBar from "../components/NavBar.jsx";

export default bind({user: getSelected("user")})(NavBar);
