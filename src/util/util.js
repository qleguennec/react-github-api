const bindDispatch = (dispatch, type) => x => dispatch({ type, payload: x });

const logExec = (f, x) => {
  console.log(x);
  return f(x);
};

export { bindDispatch, logExec };
