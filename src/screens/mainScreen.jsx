import React from 'react'
import PropTypes from 'prop-types'

import InputBar from '../components/inputBar'

const frame_types = {
  'user_search': function() {
    return (
      <InputBar
        updateFunc={this.setState.bind(this)}
        mainScreenCallback={(updater, input) => {
            updater({inputFromBar: input})}
        }
        errorFunc={(updater, err) => {
            updater({errorMsg: err})}
        }
        validationFunc={(input) => {
            return fetch(`https://api.github.com/users/${input}/repos`)
              .then((resp) => resp.ok ? resp.json() : Promise.reject("username not found"));
          }
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
    console.log(nextState);
  }

  render() {
    return (
      <div>
        <div>
          {frame_types[this.props.frame_type].call(this)}
          {this.state.errorMsg}
        </div>
      </div>
    );

  }
}

export default MainScreen;

MainScreen.propTypes = {
  frame_type: PropTypes.string.isRequired
}
