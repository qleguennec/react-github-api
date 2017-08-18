const initialState = {
  currentUser: undefined,
  userCache: {},
}
const users = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'ADD_USER':
      return {currentUser: action.payload.login, userCache: {...state.userCache, ...action.payload.data}};
    default:
      return state;
  }
}

export default users;
