import React from 'react'

import InputBar from '../components/inputBar'

import UserScreen from '../screens/userScreen'

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {errorMsg: undefined}
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(nextState);
  }

  render() {
    return (
      <div>
        <InputBar
         updateFunc={this.setState.bind(this)}
         mainScreenCallback={(updater, input) => {
             updater({errorMsg: undefined})}
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
        {this.state.errorMsg}
        <UserScreen currentFrame="none" />
      </div>
    );

  }
}

export default MainScreen;
