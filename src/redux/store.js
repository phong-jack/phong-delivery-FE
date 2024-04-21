import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "./authSlice";
import orderReducer from "./orderSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
