const initialState = {
  current: undefined
};
const repos = (state = initialState, action = {}) => {
  switch (action.type) {
    case "REPOS_SET_CURRENT":
      return {
        ...state,
        current: action.payload
      };
    case "ISSUES_ADD":
      return { ...state };
    default:
      return state;
  }
};

export default repos;
