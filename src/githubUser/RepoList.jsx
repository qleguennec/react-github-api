import React from "react";
import PropTypes from "prop-types";

class RepoList extends React.Component {
  render() {
    return <h2>{this.props.user.login}</h2>;
  }
}

RepoList.propTypes = {
  user: PropTypes.object.isRequired
};

export default RepoList;
