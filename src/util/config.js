const config = {
	users: {
		per_page: 30,
		request: function(name) {
			return `http://api.github.com/users/${name}?per_page=${this
				.per_page}`;
		}
	},
	repos: {
		per_page: 30,
		request: function(page, user) {
			return `${user.repos_url}?page=${page}&per_page=${config.repos
				.per_page}`;
		}
	},
	issues: {
		per_page: 100,
		request: function(page, user, repo) {
			return `http://api.github.com/repos/${user.login}/${repo.name}/issues?page=${page}&per_page=${this
				.per_page}`;
		}
	}
};

export default config;
