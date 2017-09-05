import GithubUser from "../containers/GithubUser";
import InputBar from "../containers/InputBar";
import React from "react";

class MainScreen extends React.Component {
	render() {
		return (
			<div>
				<InputBar />
				<GithubUser />
			</div>
		);
	}
}

export default MainScreen;
