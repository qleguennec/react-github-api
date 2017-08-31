const repos = (state = [], action) => {
  if (!action) return state;
  const arg = action.payload;
  switch (action.type) {
    case "REPOS_ADD":
      return state.concat(arg);
    default:
      return state;
  }
};

export default repos;
