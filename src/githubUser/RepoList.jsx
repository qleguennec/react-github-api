import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchRepo } from "../redux/users.api";
import getCurrentUser from "../util/users";
import { repoListState } from "../util/repos";
import _ from "lodash";

class RepoList extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.page == nextProps.page) {
      nextProps.getRepoList(nextProps.page);
      nextProps.changePage(1);
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
  user: getCurrentUser(state.users),
  repo: repoListState(state),
  page: state.ui.page
});

const mapDispatch = dispatch => ({
  changePage: page => {
    dispatch({ type: "UI_CHANGE_PAGE", payload: page });
  },
  getRepoList: page => dispatch(fetchRepo(page))
});

RepoList.propTypes = {
  user: PropTypes.object,
  repo: PropTypes.array,
  page: PropTypes.number,
  changePage: PropTypes.func.isRequired,
  getRepoList: PropTypes.func.isRequired
};

export default connect(mapState, mapDispatch)(RepoList);
