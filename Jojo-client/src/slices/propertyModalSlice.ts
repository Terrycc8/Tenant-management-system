import { createSlice } from "@reduxjs/toolkit";
import { ModalSlice } from "../pages/types";

const initialState: ModalSlice = {
  isShow: false,
};

export const propertyModalSlice = createSlice({
  name: "propertyModal",
  initialState,
  reducers: {
    onPropertyPresent: (state) => {
      state.isShow = true;
    },
    onPropertyDismiss: (state) => {
      state.isShow = false;
    },
  },
});

export const { onPropertyPresent, onPropertyDismiss } =
  propertyModalSlice.actions;

export default propertyModalSlice.reducer;
