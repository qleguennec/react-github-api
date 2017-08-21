const errors = (state = [], action = {}) => {
  switch (action.type) {
    case "ERROR_ADD":
      return [...state, action.payload];
    case "ERROR_RESET":
      return [];
    default:
      return state;
  }
};

export default errors;
