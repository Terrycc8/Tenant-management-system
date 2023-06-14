import { createSlice } from "@reduxjs/toolkit";
import { routes } from "../routes";

export interface AuthState {
  token: null | string;
}

const initialState: AuthState = {
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload: { token } }) => {
      state.token = token;
    },
    logout: (state) => {
      state.token = null;
      window.location.href = routes.home;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
