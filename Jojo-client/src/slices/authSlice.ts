import { createSlice } from "@reduxjs/toolkit";
import { routes } from "../routes";
import { jojoAPI } from "../api/jojoAPI";
import storage from "redux-persist/es/storage";

export interface AuthState {
  token: null | string;
  role: null | string;
  avatar: null | string;
}

const initialState: AuthState = {
  token: null,
  role: null,
  avatar: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload: { token, role, avatar } }) => {
      state.token = token;
      state.role = role;
      state.avatar = avatar;
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.avatar = null;
      storage.removeItem("persist:root");
      localStorage.clear();
      window.location.href = routes.home;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
