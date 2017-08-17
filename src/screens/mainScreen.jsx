import React from 'react'

import InputBar from '../components/inputBar'

import UserScreen from '../screens/userScreen'

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: undefined,
      inputFromBar: undefined,
      currentUserScreenFrame: undefined
    }
  }

  /* componentWillUpdate(nextProps, nextState) {
   *   console.log(nextState);
   * }
   */
  render() {
    return (
      <div>
        <InputBar
         updateFunc={this.setState.bind(this)}
         mainScreenCallback={(updater, input) => {
             updater({errorMsg: undefined, inputFromBar: input, currentUserScreenFrame: 'repo_list'})}
         }
         errorFunc={(updater, err) => {
             updater({errorMsg: err})}
         }
         validationFunc={(input) => {
           return fetch(`https://api.github.com/users/${input}`)
            .then((resp) => resp.ok ? resp.json() : Promise.reject("username not found"));
         }}
        />
        {this.state.errorMsg}
        {this.state.currentUserScreenFrame &&
          <UserScreen
            currentFrame={this.state.currentUserScreenFrame}
            userInfo={this.state.inputFromBar}
          />}
      </div>
    );
  }
}

export default MainScreen;
