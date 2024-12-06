import { createSlice } from "@reduxjs/toolkit";

type GlobalOrderState = {
  globalOrderStatus: boolean;
};

const initialState: GlobalOrderState = {
  globalOrderStatus: true,
};

export const globalReducer = createSlice({
  name: "globalOrderStatus",
  initialState,
  reducers: {

    setOrderStatus(state, action) {
        state.globalOrderStatus = action.payload;
    }
  }
});

export const { setOrderStatus } = globalReducer.actions;

export default globalReducer.reducer;