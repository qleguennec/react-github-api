import fp from "lodash/fp";

const n_repos_per_page = 30;

const repoListPage = page =>
  fp.slice((page - 1) * n_repos_per_page, page * n_repos_per_page);

const repoListState = state => repoListPage(state.ui.page)(state.users.repos);

export { n_repos_per_page, repoListPage, repoListState };
