import React from "react";
import PropTypes from "prop-types";
import Repo from "./Repo.jsx";
import { connect } from "react-redux";
import { fetchRepo } from "../redux/users.api";
import {
  withDispatch as withD,
  bindDispatch as bindD,
  bindProps,
  getSelected
} from "../util/util.js";
import { dataPerPage } from "../util/config";
import List from "../components/List.jsx";
import _ from "lodash";
import fp from "lodash/fp";

class RepoList extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (
      this.props.page !== nextProps.page ||
      !(this.props.user && nextProps.user.login === this.props.user.login)
    )
      nextProps.fetchPage(nextProps.page);
  }

  onRepoClick(key) {
    const { user, page, changeFrame, changeRepo } = this.props;
    const repoClicked = user.repos[page][key];

    changeRepo(repoClicked);
    changeFrame(<Repo />);
  }

  render() {
    const { changePage, user, page } = this.props;
    const repo = _.get(user, "repos." + page);
    return (
      <div>
        {repo &&
          <List
            changePage={changePage}
            onItemClick={this.onRepoClick.bind(this)}
            data={repo}
            n_pages={user.public_repos / dataPerPage}
          />}
      </div>
    );
  }
}

const mapState = bindProps({
  user: getSelected("users"),
  page: fp.get("ui.page")
});

const mapDispatch = bindProps({
  changePage: bindD("UI_CHANGE_PAGE"),
  changeFrame: bindD("UI_CHANGE_FRAME"),
  changeRepo: bindD("REPOS_SET_CURRENT"),
  fetchPage: withD(fetchRepo)
});

RepoList.propTypes = {
  user: PropTypes.object,
  repo: PropTypes.array,
  page: PropTypes.number,
  changePage: PropTypes.func.isRequired,
  fetchPage: PropTypes.func.isRequired
};

export default connect(mapState, mapDispatch)(RepoList);
