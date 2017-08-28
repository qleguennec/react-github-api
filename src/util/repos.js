import fp from "lodash/fp";

const repos_per_page = 30;

const getRepoPage = (page, user) => {
  if (!user) return undefined;
  return user.repos[page.toString()];
};

export { repos_per_page, getRepoPage };
