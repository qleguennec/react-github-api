import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { connect } from 'react-redux'

import fetchUser from '../redux/users.api'

import './InputBar.css'

class InputBar extends React.Component {

  render() {
    return (
      <div>
        <label>
          Enter github username:
          <input ref={(e) => this.input = e} type="text" name="username" />
        </label>
        <input type="submit" value="go" onClick={() => this.props.onClick(this.input.value)} />
      </div>
    );
  }
}

const mapDispatch = (dispatch) =>
  ({onClick: (input) => dispatch(fetchUser(input))})

export default connect(undefined, mapDispatch)(InputBar);

InputBar.propTypes = {
  onClick: PropTypes.func.isRequired
}
