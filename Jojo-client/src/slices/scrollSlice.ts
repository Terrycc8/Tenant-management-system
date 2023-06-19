import { createSlice } from "@reduxjs/toolkit";
import { routes } from "../routes";
import { jojoAPI } from "../api/jojoAPI";
import storage from "redux-persist/es/storage";

export interface ScrollState {
  disabled: boolean;
}

const initialState: ScrollState = {
  disabled: false,
};

export const scrollSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setScroll: (state, { payload: { disabled } }) => {
      state.disabled = disabled;
    },
  },
});

export const { setScroll } = scrollSlice.actions;

export default scrollSlice.reducer;
