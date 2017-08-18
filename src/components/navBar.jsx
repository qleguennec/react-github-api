import React from 'react'
import PropTypes from 'prop-types'

import './NavBar.css'

class NavBar extends React.Component {
  render() {
    const { title } = this.props
    return (
      <div className="navBar">
        <span className="title">{title}</span>
      </div>
    );
  }
}

NavBar.propTypes = {
  title: PropTypes.string.isRequired
}

export default NavBar;
