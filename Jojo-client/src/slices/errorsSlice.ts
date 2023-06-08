import { createSlice } from "@reduxjs/toolkit";

export interface ErrorSlice {
  errors: string[];
}

const initialState: ErrorSlice = {
  errors: [],
};

export const errorSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    setErrors: (state, actions) => {
      if (typeof actions.payload == "string") {
        state.errors = [actions.payload];
      }
      if (Array.isArray(actions.payload)) {
        state.errors = [...actions.payload];
      }
    },
  },
});

export const { setErrors } = errorSlice.actions;

export default errorSlice.reducer;
