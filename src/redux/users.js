const initialState = {
  currentUser: undefined,
  userData: {}
};

const users = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'USER_ADD':
      return {currentUser: action.payload.login, userData: {...state.userData, ...action.payload.data}};
    default:
      return state;
  }
};

export default users;
