import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { loginApi } from "./api/loginMutation";
import { chatroomApi } from "./api/chatroomAPI";
import { propertyApi } from "./api/propertyAPI";
import { eventApi } from "./api/eventAPI";
import { jojoAPI } from "./api/jojoAPI";
const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["apiProductSlice"],
};
export const rootReducers = combineReducers({
  auth: authReducer,
  [jojoAPI.reducerPath]: jojoAPI.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducers);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(jojoAPI.middleware),
});
setupListeners(store.dispatch);
export default store;
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
