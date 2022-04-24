import * as Actions from "../actions";

const initialState = false;

const backButton = function (state = initialState, action) {
  switch (action.type) {
    case Actions.TURN_BACK_FROM_CHAT: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default backButton;