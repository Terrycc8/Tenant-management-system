import { createSlice } from "@reduxjs/toolkit";

export interface ModalSlice {
  isShow: boolean;
}

const initialState: ModalSlice = {
  isShow: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsShow: (state) => {
      state.isShow = !state.isShow;
    },
  },
});

export const { setIsShow } = modalSlice.actions;

export default modalSlice.reducer;
