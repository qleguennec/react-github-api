import _ from "lodash";

const getCurrentUser = users => _.get(users.userData, users.currentUser);

const initialState = {
  currentUser: undefined,
  userData: {}
};

const users = (state = initialState, action = {}) => {
  switch (action.type) {
    case "USER_ADD":
      return {
        currentUser: action.payload.login,
        userData: {
          ...state.userData,
          ...{ [action.payload.login]: action.payload.data }
        }
      };
    case "USER_SET_CURRENT":
      return { currentUser: action.payload };
    default:
      return state;
  }
};

export { users, getCurrentUser };
