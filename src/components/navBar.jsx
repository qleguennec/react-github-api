import React from 'react'
import PropTypes from 'prop-types'

import './navBar.css'

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

export default NavBar;

NavBar.propTypes = {
  title: PropTypes.string.isRequired
}
