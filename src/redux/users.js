import { merge, assign, get } from "lodash/fp";
import _ from "lodash";
import { currentState, logExec } from "../util/util";

const initialState = [];

const users = (state = initialState, action) => {
  if (!action) return state;
  const arg = action.payload;
  switch (action.type) {
    case "USERS_ADD":
      return {
        ...state,
        arg
      };
    default:
      return state;
  }
};

export default users;
