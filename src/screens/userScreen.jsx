import React from 'react'
import PropTypes from 'prop-types'

import RepoList from '../components/repoList'

const frame_types = {
  'repo_list': function () {return <RepoList />}
  'none': function () {return ;}
}

class UserScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentFrame: this.props.currentFrame};
  }

  render () {
    return (
      <div>
        {frame_types[this.state.currentFrame].call(this)}
      </div>
);
  }
}

export default UserScreen;

UserScreen.propTypes = {
  currentFrame: PropTypes.string.isRequired
}
