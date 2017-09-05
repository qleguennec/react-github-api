import {bind, withDispatch as withD} from "../util/util.js";
import {fetchUser} from "../redux/users.api.js";
import InputBar from "../components/InputBar.jsx";

export default bind(undefined, {onClick: withD(fetchUser)})(InputBar);
