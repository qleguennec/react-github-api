import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import fp from 'lodash/fp'
import { connect } from 'react-redux'
import FetchList from '../components/FetchList'
import RepoList from './RepoList'

import './GithubUser.css'

class GithubUser extends React.Component {

  render () {
    switch (this.props.currentFrame) {
      case 'repo_list':
        return (<RepoList />);
      default:
        return (false);
    }
  }
}

const mapState = (state) =>
  ({currentFrame: state.ui.currentFrame})

GithubUser.propTypes = {
  currentFrame: PropTypes.string.isRequired,
}

export default connect(mapState)(GithubUser);
