import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "../root-reducer/RootReducer";

const store = configureStore({
  reducer: RootReducer
});

export default store;
