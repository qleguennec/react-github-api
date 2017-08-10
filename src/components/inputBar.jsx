import React from 'react'
// import PropTypes from 'prop-types'

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
    this.props.mainScreenCallback(this.input);
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          Enter github username:
          <input type="text" name="username" onChange={this.handleChange.bind(this)} />
        </label>
        <input type="submit" value="go" />
      </form>
    );
  }
}

export default InputBar;

InputBar.propTypes = {
  // mainScreenCallback: PropTypes. ? must be function type
}
