
const errors = (state = [], action = {}) => {
  switch (action.type) {
    case 'ADD_ERROR':
      return [...state, action.payload.error];
    case 'RESET_ERROR':
      return [];
    default:
      return state;
  }
}

export default errors;
