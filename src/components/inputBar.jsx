import React from 'react'
import PropTypes from 'prop-types'

import './inputBar.css'

class InputBar extends React.Component {
  constructor(props) {
    super(props);
    this.input = "";
  }

  handleChange (ev) {
    this.input = ev.target.value;
  }

  handleSubmit (ev) {
    ev.preventDefault();
    this.props.validationFunc(this.input)
      .then();
    this.props.mainScreenCallback(this.input);
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            Enter github username:
            <input type="text" name="username" onChange={this.handleChange.bind(this)} />
          </label>
          <input type="submit" value="go" />
        </form>
      {this.props.msg && (function ({ text, ...rest })
        {return <div {...rest}>text</div>})(this.props.msg)}
    </div>
    );
  }
}

export default InputBar;

InputBar.propTypes = {
  mainScreenCallback: PropTypes.func.isRequired,
  errorFunc: PropTypes.func,
  validationFunc: PropTypes.func
}
