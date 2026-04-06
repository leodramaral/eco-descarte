import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createSeedState, type AppDataState, type Item } from "../data/mockData";

const initialState = createSeedState();

const appSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Item>) {
      state.items.unshift(action.payload);
    },
  },
});

export const { addItem } = appSlice.actions;
export { initialState as appInitialState };
export default appSlice.reducer;
