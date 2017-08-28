import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUser } from "../redux/users.api";
import { bindProps, withDispatch } from "../util/util.js";
import _ from "lodash";

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

const mapDispatch = bindProps({
  onClick: withDispatch(fetchUser)
});

InputBar.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default connect(undefined, mapDispatch)(InputBar);
