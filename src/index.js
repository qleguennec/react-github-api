import "./index.css";
import Linker from "./containers/Linker.js";
import React from "react";
import ReactDOM from "react-dom";
import store from "./redux/store";
import {Provider} from "react-redux";
import {BrowserRouter, Route, Switch} from "react-router-dom";

const Root = ({store}) =>
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route path="/:user" component={Linker} />
				<Route path="/" component={Linker} />
			</Switch>
		</BrowserRouter>
	</Provider>;

ReactDOM.render(
	<Root store={store} />,
	document.getElementById("root")
);
