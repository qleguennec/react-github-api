import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RepoList from "./RepoList";
import _ from "lodash";
import fp from "lodash/fp";

import "./GithubUser.css";

class GithubUser extends React.Component {
  render() {
    return (
      <div>
        {this.props.frame}
      </div>
    );
  }
}

const mapState = state => ({
  frame: state.ui.frame
});

GithubUser.propTypes = {
  frame: PropTypes.object.isRequired
};

export default connect(mapState)(GithubUser);
