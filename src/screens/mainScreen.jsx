import React from 'react'
import PropTypes from 'prop-types'

import InputBar from '../components/inputBar'

const frame_types = {
  'user_search': function() {
    return (
      <InputBar
        mainScreenCallback={(input) => {
            return this.setState({inputFromBar: input})}
        }
        errorFunc={(err) => {
            return this.setState({errorMsg: "username not found, err: " + err})}
        }
        validationFunc={
          /* (input) => {
              return fetch(`https://api.github.com/users/${input}/repos`)
              .then((resp) => resp.json());
             } */
          () => {throw "test";}
        }
      />
    )
  },
  'none': () => {
    return <div>none</div>
  }
}

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFromBar: "",
      errorMsg: ""
    }
  }

  componentWillUpdate(nextProps, nextState) {

  }

  render() {
    return (
      <div>
        {frame_types[this.props.frame_type].call(this)}
        {this.errorMsg}
      </div>
    );

  }
}

export default MainScreen;

MainScreen.propTypes = {
  frame_type: PropTypes.string.isRequired
}
