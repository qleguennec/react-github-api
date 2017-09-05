import {bind, withDispatch as withD} from "../util/util.js";
import {fetchUser} from "../redux/users.api.js";
import App from "../App.jsx";

export default bind(undefined, {fetchUser: withD(fetchUser)})(App);
