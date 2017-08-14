import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import './inputBar.css'

class InputBar extends React.Component {
  constructor(props) {
    super(props);
    this.input = "";
  }

  handleChange(ev) {
    this.input = ev.target.value;
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.validationFunc(this.input)
        .then(_.partial(this.props.mainScreenCallback, this.props.updateFunc))
        .catch(_.partial(this.props.errorFunc, this.props.updateFunc));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            Enter github username:
            <input type="text" name="username" onChange={this.handleChange.bind(this)} />
          </label>
          <input type="submit" value="go" />
        </form>
    </div>
    );
  }
}

export default InputBar;

InputBar.propTypes = {
  updateFunc: PropTypes.func.isRequired,
  mainScreenCallback: PropTypes.func.isRequired,
  errorFunc: PropTypes.func.isRequired,
  validationFunc: PropTypes.func.isRequired
}
