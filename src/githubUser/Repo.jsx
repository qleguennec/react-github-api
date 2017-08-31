import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withDispatch as withD, bindProps, getSelected } from "../util/util.js";
import { fetchIssues } from "../redux/users.api.js";
import fp from "lodash/fp";

class Repo extends React.Component {
  render() {
    const { repo } = this.props;
    return (
      repo &&
      <div>
        {repo.name}
      </div>
    );
  }
}

const mapState = bindProps({
  repo: getSelected("repos")
});

const mapDispatch = bindProps({
  getIssues: withD(fetchIssues)
});

Repo.propTypes = {
  repo: PropTypes.object,
  getIssues: PropTypes.func.isRequired
};

export default connect(mapState, mapDispatch)(Repo);
