import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createSeedState, type AppDataState, type Item, type User } from "../data/mockData";
import { normalizePhone } from "../utils/phone";

const initialState = createSeedState();

const DEFAULT_USER_PHOTO = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxMTl8fHx8fHwxfHwxfHw&ixlib=rb-4.0.3&q=80&w=400";

function generateUserId(): string {
  return crypto.randomUUID();
}

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
    createUser(
      state,
      action: PayloadAction<{
        name: string;
        phone: string;
        photo?: string;
      }>
    ) {
      const normalizedPhone = normalizePhone(action.payload.phone);

      // Check if user already exists
      const existingUser = state.users.find(
        (candidate) =>
          normalizePhone(candidate.phone) === normalizedPhone
      );

      if (existingUser) {
        throw new Error("Usuário com este telefone já existe.");
      }

      const newUser: User = {
        id: generateUserId(),
        name: action.payload.name,
        phone: action.payload.phone,
        photo: action.payload.photo || DEFAULT_USER_PHOTO,
        rating: 5,
        reviewCount: 0,
        verified: false,
        respondsQuickly: true,
        itemsDiscarded: 0,
        itemsCollected: 0,
        wasteAvoided: 0,
        badges: [],
        memberSince: new Date().toLocaleDateString("pt-BR", {
          month: "short",
          year: "numeric",
        }),
      };

      state.users.push(newUser);
      state.currentUserId = newUser.id;
    },
  },
});

export const { addItem, loginByPhone, logout, setCurrentUser, createUser } = appSlice.actions;
export { initialState as appInitialState };
export default appSlice.reducer;
