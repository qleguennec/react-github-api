import React from 'react'

class InputBar extends React.Component {
  handleSubmit () {
    console.log("handleSubmit")
  }
  handleChange () {
    console.log("handleChange")
  }
  render () {
    return (<form onSubmit={this.submitInput}>
      <label>
        Enter username:
        <input type="text" onChange={this.handleChange} />
      </label>
    </form>)
  }
}

export default InputBar;
