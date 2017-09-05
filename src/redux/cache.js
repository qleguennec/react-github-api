const cache = (state = [], action = {}) => {
	switch (action.type) {
		case "USERS_ADD":
			return [
				...state,
				{id: action.payload.id, request: action.request}
			];
		case "REPOS_ADD":
			return [
				...state,
				{id: action.payload.id, request: action.request}
			];
		default:
			return state;
	}
};

export default cache;
