import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchRepo } from "../redux/users.api";
import getCurrentUser from "../util/users";
import { repoListState } from "../util/repos";
import { bindDispatch } from "../util/util.js";
import _ from "lodash";
import fp from "lodash/fp";

class RepoList extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.repo.length) {
      nextProps.getRepoList(nextProps.page);
    }
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        {user &&
          <h2>
            Found {user.public_repos} repositories
          </h2>}
      </div>
    );
  }
}

const mapState = state => ({
  user: getCurrentUser(state),
  repo: repoListState(state),
  page: state.ui.page
});

const mapDispatch = _.mapValues({
  changePage: bindDispatch("UI_CHANGE_PAGE"),
  getRepoList: _.flow(fetchRepo)
});

RepoList.propTypes = {
  user: PropTypes.object,
  repo: PropTypes.array,
  page: PropTypes.number,
  changePage: PropTypes.func.isRequired,
  getRepoList: PropTypes.func.isRequired
};

export default connect(mapState, mapDispatch)(RepoList);
