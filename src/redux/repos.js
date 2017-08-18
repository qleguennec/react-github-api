const repos = (state = {}, action = {}) => {
  switch (action.type) {
    case 'ADD_REPO':
      return {currentUser: action.payload.login, repoCache: {...state.repoCache, ...action.payload.data}};
    default:
      return state;
  }
}

export default repos;
