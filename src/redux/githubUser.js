const githubUser = (state = undefined, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [...state, { name: action.payload.name }];
    default:
      return state;
  }
}

export default persons;
