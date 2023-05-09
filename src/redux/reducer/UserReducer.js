import * as types from "../ActionType/ActionType";

const initialState = {
  users: [],
  user: {},
  loading: true,
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    case types.ADD_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case types.EDIT_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case types.GET_SINGLE_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case types.DELETE_USER:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducers;
