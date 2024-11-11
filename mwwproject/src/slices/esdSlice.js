import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  esdData: [],
};

export const esdSlice = createSlice({
  name: "esd",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.esdData = action.payload;
    },
  },
});
export const { setData } = esdSlice.actions;
export default esdSlice.reducer;
