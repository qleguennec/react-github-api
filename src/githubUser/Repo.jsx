import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Repo extends React.Component {
  render() {
    const { repo } = this.props;
    return (
      repo &&
      <div>
        {repo.name}
      </div>
    );
  }
}

const mapState = state => ({
  repo: state.repo.currentRepo
});

Repo.propTypes = {
  repo: PropTypes.object
};

export default connect(mapState)(Repo);
