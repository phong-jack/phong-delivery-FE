import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    currentOrder: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    startOrderFetching: (state) => {
      state.isFetching = true;
    },
    fetchOrderSuccess: (state, action) => {
      state.currentOrder = action.payload;
      state.isFetching = false;
      state.error = false;
    },
    fetchOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    clearOrder: (state) => {
      state.currentOrder = null;
      state.error = false;
    },
  },
});

export const {
  startOrderFetching,
  fetchOrderSuccess,
  fetchOrderFailure,
  clearOrder,
  fetchOrderFoodDetailsSuccess,
} = orderSlice.actions;

export default orderSlice.reducer;
