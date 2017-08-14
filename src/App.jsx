import React from 'react';
import './App.css';

import NavBar from './components/navBar';
import MainScreen from './screens/mainScreen';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <NavBar title="github-test-api" />
      <MainScreen />
      </div>
    );
  }
}

export default App;
