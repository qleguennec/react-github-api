import fp from "lodash/fp";

const fetchUserApi = (args) => (dispatch, getState) => {
  return (getState().users[args.cacheKey])
    ? dispatch({type: 'USER_DATA_ALREADY_THERE'})
    : fetch(args.buildRequest)
    .then(fp.invoke('json'))
    .catch((err) =>
           dispatch({type: 'ADD_ERROR', payload: {error: err}}))
    .then((result) =>
          dispatch({type: args.action, payload: args.buildPayload(result)}));
};

const fetchUser = (input) => fetchUserApi({
  cacheKey: input,
  buildRequest: "https://api.github.com/users/" + input,
  action: 'USER_ADD',
  buildPayload: (result) => ({login: result.login
                             , data: {[result.login]: result}})
});


// const fetchUser = (input) => async (dispatch, getState) => {
//   if (getState().users[input])
//     return dispatch({type: 'none'});
//   try {
//     const resp = await fetch(`https://api.github.com/users/${input}`);
//     const result = await resp.json();
//     dispatch({type: 'USER_ADD', payload: {login: result.login, data: {[result.login]: result}}});
//   }
//   catch (exp) {
//     dispatch({type: 'ERROR_ADD', payload: {error: exp}});
//   }
// };


//////////////////////////////////////////////////////////////////////////////////////////////
// const fetchUserRepo = (user, page) => async (dispatch, getstate) = {                     //
//   if (getState().users[page])                                                            //
//     return (dispatch({type: 'none'}));                                                   //
//   try {                                                                                  //
//     const resp = await fetch(`https://api.github.com/users/${user}/repos?page=${page}`); //
//     const result = await repo.json();                                                    //
//     dispatch({type: 'ADD_USER_REPO'});                                                   //
//   }                                                                                      //
//   catch (exp) {                                                                          //
//     dispatch({type: 'ADD_ERROR', payload: {error: exp}});                                //
//   }                                                                                      //
// };                                                                                       //
//////////////////////////////////////////////////////////////////////////////////////////////

export default fetchUser;
