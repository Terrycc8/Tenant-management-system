import { createSlice } from "@reduxjs/toolkit";
import { routes } from "../routes";

export interface authSlice {
  token: null | string;
}

const initialState: authSlice = {
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
      location.href = routes.login;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
