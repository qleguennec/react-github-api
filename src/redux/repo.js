const initialState = {
  currentRepo: undefined
};
const repo = (state = initialState, action = {}) => {
  switch (action.type) {
    case "REPO_SET_CURRENT":
      return { ...state, currentRepo: action.payload };
    default:
      return state;
  }
};

export default repo;
