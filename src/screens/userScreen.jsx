import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import fp from 'lodash/fp'

import List from '../components/list'

import './userScreen.css'

const frame_types = {
  'repo_list': function () {
    const { page } = this.state;
    const { userInfo } = this.props;

    return (
      <div>
        <h2>Found {userInfo.public_repos} repositories</h2>
        <List
          userInfo={userInfo}
          request={(user) => "https://api.github.com/users/" + user.login + "/repos"}
          requestAttributes={{}}
          cacheKey={fp.get('login')}
          pageCount={fp.get('public_repos')}
        />
      </div>
    )},
}

class UserScreen extends React.Component {
  constructor(props) {
    super(props);
    this.userRepoList = undefined;
    this.state = {
      page: 1,
      currentFrame: this.props.currentFrame
    };
  }

  getUserRepoList(page) {
    fetch(`https://api.github.com/users/${this.props.userInfo.login}/repos`)
      .then(fp.invoke('json'))
      .then((repoList) => this.userRepoList[page] = repoList);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({currentFrame: nextProps.currentFrame});
  }

  render () {
    return (
      <div>{frame_types[this.state.currentFrame].call(this)}</div>
    );
  }
}

export default UserScreen;

UserScreen.propTypes = {
  currentFrame: PropTypes.string.isRequired,
  userInfo: PropTypes.object.isRequired
}
