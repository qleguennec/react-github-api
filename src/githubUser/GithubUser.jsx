import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import fp from 'lodash/fp'

import FetchList from '../components/FetchList'

import './GithubUser.css'

const frame_types = {
  'repo_list': function () {
    const { page } = this.state;
    const { userInfo } = this.props;

    return (
    )},
}

class GithubUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFrame: this.props.currentFrame
      userData: undefined;
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

  componentWillMount () {
    getUserRepoList()
  }

  render () {
    switch (this.state.currentFrame) {
      'repo_list':
        return (<RepoList userData />);
    }
    return (
      <div>{frame_types[this.state.currentFrame].call(this)}</div>
    );
  }
}

export default GithubUser;

GithubUser.propTypes = {
  currentFrame: PropTypes.string.isRequired,
  userInfo: PropTypes.object.isRequired
}
