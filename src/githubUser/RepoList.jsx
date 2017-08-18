
import React from 'react'
import PropTypes from 'prop-types'
import fp from 'lodash/fp'
import { connect } from 'react-redux'

import FetchList from '../components/FetchList'

class RepoList extends React.Component {

  render () {
    const { userData } = this.props;
    /* return (
     *   <div>
     *     <h2>Found {userData.public_repos} repositories </h2>
     *     <FetchList
     *       userData={userData}
     *       request={(user) => "https://api.github.com/users/" + user.login + "/repos"}
     *       requestAttributes={{}}
     *       cacheKey={fp.get('login')}
     *       pageCount={fp.get('public_repos')}
     *       />
     *   </div>*/
    if (!userData)
      return (<div></div>)
    return (
      <div>
        <h2>Found {userData.public_repos} repos</h2>
          <FetchList
            request={(user) => "https://api.github.com/users/" + user.login + "/repos"}
            requestAttributes={{}}
            cacheKey={fp.get('login')}
            pageCount={fp.get('public_repos')}
          />
      </div>
    );
  }
}

const mapState = (state) => ({userData: state.users.userCache[state.users.currentUser]})

RepoList.propTypes = {
  userData: PropTypes.object
}

export default connect(mapState)(RepoList);
