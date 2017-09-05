import React from "react";
import PropTypes from "prop-types";

import "./NavBar.css";

class NavBar extends React.Component {
	render() {
		const {user, title} = this.props;
		return (
			<div className="NavBar">
				<div className="title">
					{title}
				</div>
				{user &&
					<div className="title">
						{user.login}
					</div>}
			</div>
		);
	}
}

NavBar.propTypes = {
	title: PropTypes.string.isRequired,
	user: PropTypes.object
};

export default NavBar;
