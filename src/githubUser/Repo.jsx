import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withDispatch as withD, bindProps, getCurrent } from "../util/util.js";
import { fetchIssues } from "../redux/users.api.js";

class Repo extends React.Component {
  componentWillMount() {
    this.props.getIssues(1);
  }
  render() {
    const { repo } = this.props;
    console.log(repo);
    return (
      repo &&
      <div>
        {repo.name}
      </div>
    );
  }
}

const mapState = bindProps({
  repo: getCurrent("repos")
});

const mapDispatch = bindProps({
  getIssues: withD(fetchIssues)
});

Repo.propTypes = {
  repo: PropTypes.object,
  getIssues: PropTypes.func.isRequired
};

export default connect(mapState, mapDispatch)(Repo);
