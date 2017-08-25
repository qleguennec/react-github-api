import _ from "lodash";
import fp from "lodash/fp";

const bindProps = props => x => fp.mapValues(f => f(x), props);

const bindDispatch = type => dispatch => x => dispatch({ type, payload: x });

const withDispatch = f => dispatch => _.flow(f, dispatch);

const logExec = (f, x) => {
  const res = f(x);
  console.log(f, x, res);
  return res;
};

const bindReducer = (action, bindings, reducer) =>
  !action || !_.has(reducer, action.type)
    ? _.identity
    : _.flow(bindProps(bindings), fp.merge(reducer), props =>
        props[action.type].call(props, action.payload)
      );

export { bindDispatch, logExec, bindReducer, bindProps, withDispatch };
