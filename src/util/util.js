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

// const bindReducer = (action, bindings, reducer) =>
//   !action || !_.has(reducer, action.type)
//     ? _.identity
//     : st =>
//         _.flow(
//           bindProps(bindings),
//           fp.merge(reducer),
//           fp.merge(action.payload),
//           payload => payload[action.type](payload)(st)
//         )(st);

export { bindDispatch, logExec, bindProps, withDispatch };
