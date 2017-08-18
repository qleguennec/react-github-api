const fetchUser = (input) => async (dispatch, getState) => {
  if (getState().users[input])
    return dispatch({type: 'none'});
  try {
    const resp = await fetch(`https://api.github.com/users/${input}`);
    const result = await resp.json();
    dispatch({type: 'ADD_USER', payload: {login: result.login, data: {[result.login]: result}}});
  }
  catch (exp) {
    dispatch({type: 'ADD_ERROR', payload: {error: exp}});
  }
}

export default fetchUser;
