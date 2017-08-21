import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RepoList from "./RepoList";
import { getCurrentUser } from "../redux/users.js";

import "./GithubUser.css";

class GithubUser extends React.Component {
  frameToDisplay() {
    switch (this.props.frame) {
      case "repo_list": {
        if (this.props.user) {
          return <RepoList user={this.props.user} />;
        }
      }
      default:
        return <div />;
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.frameToDisplay()}
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  user: getCurrentUser(state.users),
  frame: state.ui.frame
});

GithubUser.propTypes = {
  user: PropTypes.object,
  frame: PropTypes.string
};

export default connect(mapState)(GithubUser);
