import React from "react";
import PropTypes from "prop-types";
import Repo from "./Repo.jsx";
import { connect } from "react-redux";
import { fetchRepo } from "../redux/users.api";
import { getCurrentUserState } from "../util/users";
import { getRepoPage, repos_per_page } from "../util/repos";
import {
  withDispatch,
  bindDispatch,
  bindProps,
  logExec
} from "../util/util.js";
import List from "../components/List.jsx";
import _ from "lodash";
import fp from "lodash/fp";

class RepoList extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (
      this.props.page !== nextProps.page ||
      !(this.props.user && nextProps.user.login === this.props.user.login)
    )
      nextProps.getRepoList(nextProps.page);
  }

  onRepoClick(key) {
    const { user, page, changeFrame, changeRepo } = this.props;
    const repoClicked = getRepoPage(page, user)[key];

    changeRepo(repoClicked);
    changeFrame(<Repo />);
  }

  render() {
    const { changePage, user, page } = this.props;
    const repo = getRepoPage(page, user);
    return (
      <div>
        {repo &&
          <List
            changePage={changePage}
            onItemClick={this.onRepoClick.bind(this)}
            data={repo}
            n_pages={user.public_repos / repos_per_page}
          />}
      </div>
    );
  }
}

const mapState = bindProps({
  user: getCurrentUserState,
  page: fp.get("ui.page")
});

const mapDispatch = bindProps({
  changePage: bindDispatch("UI_CHANGE_PAGE"),
  changeFrame: bindDispatch("UI_CHANGE_FRAME"),
  changeRepo: bindDispatch("REPO_SET_CURRENT"),
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
