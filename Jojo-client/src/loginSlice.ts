import { createSlice } from "@reduxjs/toolkit";

export interface LoginSlice {
  token: null | string;
}

const initialState: LoginSlice = {
  token: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setCredentials: (state, { payload: { token } }) => {
      state.token = token;
    },
  },
});

export const { setCredentials } = loginSlice.actions;

export default loginSlice.reducer;
