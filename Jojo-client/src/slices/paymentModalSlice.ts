import { createSlice } from "@reduxjs/toolkit";
import { ModalSlice } from "../pages/types";

const initialState: ModalSlice = {
  isShow: false,
};

export const paymentModalSlice = createSlice({
  name: "paymentsModal",
  initialState,
  reducers: {
    onPaymentsPresent: (state) => {
      state.isShow = true;
    },
    onPaymentsDismiss: (state) => {
      state.isShow = false;
    },
  },
});

export const { onPaymentsPresent, onPaymentsDismiss } =
  paymentModalSlice.actions;

export default paymentModalSlice.reducer;
