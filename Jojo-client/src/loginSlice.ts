import { createSlice } from "@reduxjs/toolkit";

export interface LoginSlice {
  value: number;
}

const initialState: LoginSlice = {
  value: 0,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
});

export const {} = loginSlice.actions;

export default loginSlice.reducer;
