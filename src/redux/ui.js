const initialState = {
  currentFrame: 'repo_list'
}

const ui = (state = initialState, action = {}) => {
  const { name, userData } = action.payload || {};

  switch (action.type) {
    case 'CHANGE_ROUTE':
      return {...state, currentFrame: action.payload.route};
    default:
      return state;
  }
}

export default ui;
