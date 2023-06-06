import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { loginApi } from "./api/loginQuery";
export const store = configureStore({
  reducer: {
    login: loginReducer,

    [loginApi.reducerPath]: loginApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApi.middleware),
});
setupListeners(store.dispatch);
export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
