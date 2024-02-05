import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface ToastState {
  isShown: boolean;
  message: string;
  type: string;
}

const initialState: ToastState = {
  isShown: false,
  message: "",
  type: "",
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    // action to set the state toast message
    setToastState(state, action) {
      state.isShown = action.payload.isShown;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.toast,
      };
    },
  },
});

export const { setToastState } = toastSlice.actions;

export default toastSlice.reducer;
