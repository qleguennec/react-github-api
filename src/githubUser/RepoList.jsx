
import React from 'react'
import PropTypes from 'prop-types'

class RepoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
    <div>
      <h2>Found {userInfo.public_repos} repositories </h2>
      <FetchList
        userInfo={userInfo}
        request={(user) => "https://api.github.com/users/" + user.login + "/repos"}
        requestAttributes={{page}}
        />
    </div>
    )
  }
}

RepoList.propTypes = {
  userData: PropTypes.object.isRequired
}
