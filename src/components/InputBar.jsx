import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUser } from "../redux/users.api";

import "./inputBar.css";

class InputBar extends React.Component {
  render() {
    return (
      <div>
        <label>
          Enter github username:
          <input ref={e => (this.input = e)} type="text" name="username" />
        </label>
        <input
          type="submit"
          value="go"
          onClick={() => this.props.onClick(this.input.value)}
        />
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  onClick: input => dispatch(fetchUser(input))
});

InputBar.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default connect(undefined, mapDispatch)(InputBar);
