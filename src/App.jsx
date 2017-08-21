import React from 'react';
import './App.css';

import NavBar from './components/NavBar';
import MainScreen from './screens/MainScreen';

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
