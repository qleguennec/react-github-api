import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RepoList from './RepoList';
import _ from "lodash";
import fp from "lodash/fp";

import './GithubUser.css';

class GithubUser extends React.Component {
  frameToDisplay () {
    switch (this.props.frame) {
    case 'repo_list':
      return (<RepoList user={this.props.user}/>);
    default:
      return (<div></div>);
    }
  }

  render () {
    console.log(this.props.user);
    return (
      <div>
        <div>
          {this.frameToDisplay()}
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  frame: state.ui.frame,
  user: _.get(state.users.userCache, state.users.currentUser)
});

GithubUser.propTypes = {
  frame: PropTypes.string,
  user: PropTypes.string
};

export default connect(mapState)(GithubUser);
