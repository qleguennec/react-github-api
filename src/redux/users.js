const users = (state = [], action) => {
	if (!action) return state;
	const arg = action.payload;
	switch (action.type) {
		case "USERS_ADD":
			return [...state, arg];
		default:
			return state;
	}
};

export default users;
