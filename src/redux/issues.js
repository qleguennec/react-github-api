const issues = (state = [], action) => {
  if (!action) return state;
  const arg = action.payload;
  switch (action.type) {
    case "ISSUES_ADD":
      return [...state, arg];
    default:
      return state;
  }
};

export default issues;
