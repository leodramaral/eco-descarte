import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createSeedState, type AppDataState, type Item } from "../data/mockData";
import { normalizePhone } from "../utils/phone";

const initialState = createSeedState();

const appSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    loginByPhone(state, action: PayloadAction<string>) {
      const normalizedPhone = normalizePhone(action.payload);
      const user = state.users.find((candidate) => normalizePhone(candidate.phone) === normalizedPhone);

      state.currentUserId = user?.id ?? null;
    },
    setCurrentUser(state, action: PayloadAction<string | null>) {
      state.currentUserId = action.payload;
    },
    logout(state) {
      state.currentUserId = null;
    },
    addItem(state, action: PayloadAction<Item>) {
      state.items.unshift(action.payload);
    },
  },
});

export const { addItem, loginByPhone, logout, setCurrentUser } = appSlice.actions;
export { initialState as appInitialState };
export default appSlice.reducer;
