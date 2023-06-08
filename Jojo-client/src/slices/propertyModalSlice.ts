import { createSlice } from "@reduxjs/toolkit";
import { ModalSlice } from "../pages/types";

const initialState: ModalSlice = {
  isShow: false,
};

export const propertyModalSlice = createSlice({
  name: "propertyModal",
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

export const { onPresent, onDismiss } = propertyModalSlice.actions;

export default propertyModalSlice.reducer;
