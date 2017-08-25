import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RepoList from "./RepoList";
import _ from "lodash";
import fp from "lodash/fp";

import "./GithubUser.css";

class GithubUser extends React.Component {
  frameToDisplay() {
    switch (this.props.frame) {
      case "repo_list": {
        return <RepoList />;
      }
      default:
        return <div />;
    }
  }

  render() {
    return (
      <div>
        {this.frameToDisplay()}
      </div>
    );
  }
}

const mapState = state => ({
  frame: state.ui.frame
});

GithubUser.propTypes = {
  frame: PropTypes.string
};

export default connect(mapState)(GithubUser);
