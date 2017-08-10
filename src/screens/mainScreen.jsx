import React from 'react'
import PropTypes from 'prop-types'

import InputBar from '../components/inputBar'

const frame_types = {
  'user_search': function () {
    return <InputBar
      mainScreenCallback={
          (input) => {return this.setState({inputFromBar: input})}
      }
    />
  },
  'none': () => {
    return <div>none</div>
  }
}

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFromBar: ""
    }
  }

  fetchGithubUsernameInfo () {
    const usernameInfoOrError =
      fetch(`https://api.github.com/users/${this.state.inputFromBar}/repos`)
        .then((response) => response.json());
    console.log(usernameInfoOrError);
  }

  componentWillUpdate (nextProps, nextState) {
    
  }

  render () {
    return (frame_types[this.props.frame_type]).call(this);
  }
}

MainScreen.propTypes = {
  frame_type: PropTypes.string.isRequired
}

export default MainScreen;
