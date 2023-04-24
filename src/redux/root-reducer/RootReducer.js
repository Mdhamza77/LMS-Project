import { combineReducers } from "redux";
import userReducers from "../reducer/UserReducer";

const RootReducer = combineReducers({
  data: userReducers,
});

export default RootReducer;
