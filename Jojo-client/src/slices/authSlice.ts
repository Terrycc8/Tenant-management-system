import { createSlice } from "@reduxjs/toolkit";
import { routes } from "../routes";
import { jojoAPI } from "../api/jojoAPI";
import storage from "redux-persist/es/storage";

export interface AuthState {
  token: null | string;
  role: null | string;
}

const initialState: AuthState = {
  token: null,
  role: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload: { token, role } }) => {
      state.token = token;
      state.role = role;
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      storage.removeItem("persist:root");
      window.location.href = routes.home;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
