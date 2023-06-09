import { createSlice } from "@reduxjs/toolkit";
import { ModalSlice } from "../pages/types";

const initialState: ModalSlice = {
  isShow: false,
};

export const eventsModalSlice = createSlice({
  name: "eventsModal",
  initialState,
  reducers: {
    onEventsPresent: (state) => {
      state.isShow = true;
    },
    onEventsDismiss: (state) => {
      state.isShow = false;
    },
  },
});

export const { onEventsPresent, onEventsDismiss } = eventsModalSlice.actions;

export default eventsModalSlice.reducer;
