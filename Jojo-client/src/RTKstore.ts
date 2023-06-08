import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { combineReducers } from "@reduxjs/toolkit";
import createModalReducer from "./slices/createModalSlice";
import paymentModalReducer from "./slices/paymentModalSlice";
import propertyModalReducer from "./slices/propertyModalSlice";
import eventsModalReducer from "./slices/eventsModalSlice";
import authReducer from "./slices/authSlice";
import errorsReducer from "./slices/errorsSlice";
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
import { loginApi } from "./api/loginQuery";
const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["apiProductSlice"],
};
export const rootReducers = combineReducers({
  createModal: createModalReducer,
  paymentModal: paymentModalReducer,
  eventsModal: eventsModalReducer,
  propertyModalReducer: propertyModalReducer,
  auth: authReducer,
  errors: errorsReducer,
  [loginApi.reducerPath]: loginApi.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducers);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(loginApi.middleware),
});
setupListeners(store.dispatch);
export default store;
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;