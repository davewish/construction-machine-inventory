import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IntialState {
  deviceWidth: number;
}
const initialState: IntialState = {
  deviceWidth: 800,
};
const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    updateDeviceWidth: (state, action: PayloadAction<number>) => {
      state.deviceWidth = action.payload;
    },
  },
});

export const { updateDeviceWidth } = settingSlice.actions;

export default settingSlice.reducer;
