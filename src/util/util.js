import _ from "lodash";
import fp from "lodash/fp";

const bindProps = props => x => fp.mapValues(f => f(x), props);

const bindDispatch = type => dispatch => x => dispatch({ type, payload: x });

const withDispatch = f => dispatch => _.flow(f, dispatch);

const logExec = f => x => {
  const res = f(x);
  console.log(f, x, res);
  return res;
};

const getSelected = prop => state =>
  state.ui.selected[prop]
    ? _.find(state[prop], x => x.id == state.ui.selected[prop])
    : undefined;

const currentState = state => state.data[state.current];

const getCurrent = prop => state =>
  state[prop] ? currentState(state[prop]) : undefined;

export {
  getCurrent,
  getSelected,
  bindDispatch,
  logExec,
  bindProps,
  withDispatch,
  currentState
};
