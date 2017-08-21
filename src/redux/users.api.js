import fp from "lodash/fp";
import _ from "lodash";

const fetchUserApi = args => dispatch =>
  args.checkout()
    ? args.checkoutDispatch()
    : fetch(args.request)
        .then(fp.invoke("json"))
        .then(
          result =>
            result.message && result.message === "Not Found"
              ? Promise.reject("user not found")
              : Promise.resolve(result)
        )
        .catch(err => {
          dispatch({ type: "ERROR_ADD", payload: err });
        })
        .then(args.okDispatch);

const fetchUser = input => (dispatch, getState) =>
  dispatch(
    fetchUserApi({
      checkout: () => _.get(getState().users.userData, input) !== undefined,
      checkoutDispatch: () =>
        dispatch({
          type: "USER_SET_CURRENT",
          payload: input
        }),
      request: "http://api.github.com/users/" + input,
      okDispatch: result =>
        dispatch({
          type: "USER_ADD",
          payload: { login: result.login, data: result }
        })
    })
  );

// const fetchRepo = (user, page) => fetchUserApi({
//   cacheKey:
// });

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
