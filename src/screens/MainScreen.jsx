import React from "react";

import InputBar from "../components/InputBar";

import GithubUser from "../githubUser/GithubUser";

class MainScreen extends React.Component {
  render() {
    return (
      <div>
        <InputBar />
        <GithubUser />
      </div>
    );
  }
}

export default MainScreen;
