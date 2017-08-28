import React from "react";
import PropTypes from "prop-types";
import { getCurrentUserState } from "../util/users";
import { connect } from "react-redux";

import "./NavBar.css";

class NavBar extends React.Component {
  render() {
    const { user, title } = this.props;
    return (
      <div className="navBar">
        <div className="title">
          {title}
        </div>
        {user &&
          <div className="title">
            {user.login}
          </div>}
      </div>
    );
  }
}

const mapState = state => ({
  user: getCurrentUserState(state)
});

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.object
};

export default connect(mapState)(NavBar);
