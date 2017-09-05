import "./App.css";
import MainScreen from "./screens/MainScreen";
import NavBar from "./containers/NavBar";
import React from "react";
import PropTypes from "prop-types";

class App extends React.Component {
	componentWillMount() {
		const {match} = this.props;
		if (match.isExact && match.path === "/:user")
			this.props.fetchUser(match.params.user);
	}

	render() {
		return (
			<div className="App">
				<NavBar title="github-test-api" />
				<MainScreen />
			</div>
		);
	}
}

App.propTypes = {
	fetchUser: PropTypes.func.isRequired
};

export default App;
