import _ from "lodash";

const getCurrentUser = users => {
  console.log(users);
  return users.currentUser ? users.userData[users.currentUser] : undefined;
};

const getCurrentUserState = state => getCurrentUser(state.users);

export { getCurrentUser, getCurrentUserState };
