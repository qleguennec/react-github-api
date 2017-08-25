import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchRepo } from "../redux/users.api";
import { getCurrentUser, getCurrentUserState } from "../util/users";
import { repoListState } from "../util/repos";
import { withDispatch, bindDispatch, bindProps } from "../util/util.js";
import _ from "lodash";
import fp from "lodash/fp";

class RepoList extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.user != this.props.user) nextProps.getRepoList(1);
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

const mapState = bindProps({
  user: _.flow(fp.get("users"), getCurrentUser),
  repo: repoListState,
  page: fp.get("ui.page")
});

const mapDispatch = bindProps({
  changePage: bindDispatch("UI_CHANGE_PAGE"),
  getRepoList: withDispatch(fetchRepo)
});

RepoList.propTypes = {
  user: PropTypes.object,
  repo: PropTypes.array,
  page: PropTypes.number,
  changePage: PropTypes.func.isRequired,
  getRepoList: PropTypes.func.isRequired
};

export default connect(mapState, mapDispatch)(RepoList);
