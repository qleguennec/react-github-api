import React from "react";
import PropTypes from "prop-types";
import Repo from "../containers/Repo.js";
import config from "../util/config";
import List from "../containers/List.js";
import _ from "lodash";

class RepoList extends React.Component {
	componentWillReceiveProps(nextProps) {
		if (
			this.props.page !== nextProps.page ||
			!(
				this.props.user &&
				nextProps.user.login === this.props.user.login
			)
		)
			nextProps.fetchPage(nextProps.page);
	}

	onRepoClick = key => {
		const {
			user,
			page,
			changeFrame,
			changeRepo,
			getIssues,
			repos
		} = this.props;
		const repoClicked = repos.filter(
			x => x.owner.id === user.id && x.page === page
		)[key];

		fetch(
			`http://api.github.com/repos/${user.login}/${repoClicked.name}\
/issues?per_page=${config.issues.per_page}`
		).then(resp => {
			changeRepo({repos: repoClicked.id});
			const link = resp.headers.get("link");

			if (link) {
				const n_pages = parseInt(
					resp.headers
						.get("link")
						.match(/page=([0-9]+)>; rel="last"/)[1],
					10
				);
				_.range(1, n_pages + 1).map(getIssues);
			}
			changeFrame(<Repo />);
		});
	};

	render() {
		const {changePage, user, page, repos} = this.props;
		const repoList = user
			? repos.filter(x => x.owner.id === user.id && x.page === page)
			: undefined;

		return (
			<div>
				{repoList &&
					<List
						changePage={changePage}
						onItemClick={this.onRepoClick}
						data={repoList}
						n_pages={user.public_repos / config.repos.per_page}
					/>}
			</div>
		);
	}
}

RepoList.propTypes = {
	user: PropTypes.object,
	repo: PropTypes.array,
	page: PropTypes.number,
	changePage: PropTypes.func.isRequired,
	fetchPage: PropTypes.func.isRequired
};

export default RepoList;
