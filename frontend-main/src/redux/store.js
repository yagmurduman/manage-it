import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import companyReducer from "./features/companySlice";
import backlogSlice from "./features/backlogSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import projectSlice from "./features/projectSlice";
import consultantsSlice from "./features/consultantsSlice";

const reducers = combineReducers({
  user: userReducer,
  company: companyReducer,
  backlog: backlogSlice,
  project: projectSlice,
  consultant: consultantsSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
