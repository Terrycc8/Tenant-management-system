import { createSlice } from "@reduxjs/toolkit";
import { ModalSlice } from "../pages/types";

const initialState: ModalSlice = {
  isShow: false,
};

export const paymentModalSlice = createSlice({
  name: "paymentModal",
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

export const { onPresent, onDismiss } = paymentModalSlice.actions;

export default paymentModalSlice.reducer;
