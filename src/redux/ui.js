const initialState = {
  frame: 'none',
  page: 0
};

const ui = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'CHANGE_ROUTE':
        return {...state, frame: action.payload};
    case 'CHANGE_LIST_PAGE':
        return {...state, page: action.payload};
    default:
        return state;
  }
};

export default ui;
