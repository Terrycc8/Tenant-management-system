import { createSlice } from "@reduxjs/toolkit";
import { ModalSlice } from "../pages/types";

const initialState: ModalSlice = {
  isShow: false,
};

export const createModalSlice = createSlice({
  name: "createModal",
  initialState,
  reducers: {
    onPresent: (state) => {
      state.isShow = true;
    },
    onDismiss: (state) => {
      state.isShow = false;
    },
  },
});

export const { onPresent, onDismiss } = createModalSlice.actions;

export default createModalSlice.reducer;
