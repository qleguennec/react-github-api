import RepoList from "../containers/RepoList.js";
import React from "react";

const initialState = {
	frame: <RepoList />,
	page: 1,
	selected: {}
};

const ui = (state = initialState, action = {}) => {
	const arg = action.payload;
	switch (action.type) {
		case "UI_CHANGE_PAGE":
			return {...state, page: arg};
		case "UI_CHANGE_FRAME":
			return {...state, frame: arg, page: 1};
		case "USERS_ADD":
			return {
				...initialState,
				selected: {users: arg.id}
			};
		case "USERS_CACHED":
			return {
				...initialState,
				selected: {users: arg.id}
			};
		case "UI_SELECT":
			return {...state, selected: {...state.selected, ...arg}};
		case "ERROR_FETCH_NOT_FOUND":
			return {...state, frame: <p>User not found</p>, page: 1};
		default:
			return state;
	}
};

export default ui;
