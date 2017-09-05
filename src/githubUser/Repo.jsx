import React from "react";
import PropTypes from "prop-types";
import fp from "lodash/fp";

class Repo extends React.Component {
	render() {
		const {repo} = this.props;
		return (
			repo &&
			<div>
				{repo.name}
			</div>
		);
	}
}

Repo.propTypes = {
	repo: PropTypes.object,
	issues: PropTypes.array.isRequired
};

export default Repo;
