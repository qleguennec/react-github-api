import _ from "lodash";
import fp from "lodash/fp";
import {connect} from "react-redux";

const bindProps = props => x => fp.mapValues(f => f(x), props);

const bindDispatch = type => dispatch => x =>
	dispatch({type, payload: x});

const logExec = f => x => {
	const res = f(x);
	console.log(f, x, res);
	return res;
};

const withDispatch = f => dispatch => _.flow(f, dispatch);

const getSelected = prop => state =>
	state.ui.selected[prop]
		? _.find(state[prop], x => x.id === state.ui.selected[prop])
		: undefined;

const bind = (mapState, mapDispatch) =>
	connect(bindProps(mapState), bindProps(mapDispatch));

export {
	getSelected,
	bindDispatch,
	logExec,
	bindProps,
	withDispatch,
	bind
};
