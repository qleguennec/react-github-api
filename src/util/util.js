import _ from "lodash";
import fp from "lodash/fp";

const bindDispatch = (type, dispatch) => x => dispatch({ type, payload: x });

const logExec = (f, x) => {
  const res = f(x);
  console.log(f, x, res);
  return res;
};

const bindReducer = (action, bindings, reducer) => state => {
  console.log("bindReducer");
  console.log(action && _.has(reducer, action.type));
  console.log(fp.merge(fp.mapValues(state, bindings), reducer));
  return (!(action && _.has(reducer, action.type))
    ? _.identity
    : state =>
        fp
          .merge(fp.mapValues(state, bindings), reducer)
          [action.type](action.payload)(state))(state);
};

export { bindDispatch, logExec, bindReducer };
