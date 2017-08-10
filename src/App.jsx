import React from 'react';
import './App.css';

import NavBar from './components/navbar'
import MainScreen from './screens/mainScreen'

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <NavBar title="github-test-api" />
      <MainScreen frame_type="user_search" />
      </div>
    );
  }
}

export default App;
