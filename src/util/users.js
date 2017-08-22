import _ from "lodash";

const getCurrentUser = users => _.get(users.userData, users.currentUser);

export default getCurrentUser;
