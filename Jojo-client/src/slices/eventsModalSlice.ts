import { createSlice } from "@reduxjs/toolkit";
import { ModalSlice } from "../pages/types";

const initialState: ModalSlice = {
  isShow: false,
};

export const eventsModalSlice = createSlice({
  name: "eventsModal",
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

export const { onPresent, onDismiss } = eventsModalSlice.actions;

export default eventsModalSlice.reducer;
