import "./GithubUser.css";
import PropTypes from "prop-types";
import React from "react";
import _ from "lodash";

class GithubUser extends React.Component {
	componentDidMount() {
		fetch(
			"https://api.github.com/users/whatever?client_id=96436dd651b42fcd7f28&client_secret=337520471b29782dad2f061e28fe938f2e874f3e"
		);
	}

	render() {
		return (
			<div>
				{this.props.frame}
			</div>
		);
	}
}

GithubUser.propTypes = {
	frame: PropTypes.object.isRequired
};

export default GithubUser;
