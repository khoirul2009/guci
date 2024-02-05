import { createSlice } from "@reduxjs/toolkit";

export interface GrandTotalState {
  value: number;
}

const initialState = {
  value: 0,
};

export const grandTotalSlice = createSlice({
  name: "grandTotal",
  initialState,
  reducers: {
    setGrandTotalState(state, action) {
      state.value = action.payload.value;
    },
  },
});

export const { setGrandTotalState } = grandTotalSlice.actions;

export default grandTotalSlice.reducer;
