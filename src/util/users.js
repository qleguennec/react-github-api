import _ from "lodash";

const getCurrentUser = state =>
  _.get(state.users.userData, state.users.currentUser);

export default getCurrentUser;
