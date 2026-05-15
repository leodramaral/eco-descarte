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
    toggleFavorite(state, action: PayloadAction<string>) {
      const itemId = action.payload;
      const index = state.favoriteItems?.indexOf(itemId) ?? -1;

      if (!state.favoriteItems) {
        state.favoriteItems = [];
      }

      if (index > -1) {
        state.favoriteItems.splice(index, 1);
      } else {
        state.favoriteItems.push(itemId);
      }
    },
    updateImpactNudgeShown(state, action: PayloadAction<string>) {
      state.lastImpactNudgeDate = action.payload;
    },
    addToSearchHistory(state, action: PayloadAction<string>) {
      if (!state.searchHistory) {
        state.searchHistory = [];
      }

      const searchQuery = action.payload.trim().toLowerCase();
      if (!searchQuery) return;

      // Remove if already exists
      const existingIndex = state.searchHistory.indexOf(searchQuery);
      if (existingIndex > -1) {
        state.searchHistory.splice(existingIndex, 1);
      }

      // Add to beginning
      state.searchHistory.unshift(searchQuery);

      // Keep only last 5 searches
      if (state.searchHistory.length > 5) {
        state.searchHistory = state.searchHistory.slice(0, 5);
      }
    },
    clearSearchHistory(state) {
      state.searchHistory = [];
    },
    markOnboardingSeen(state) {
      state.hasSeenOnboarding = true;
    },
    updateStreak(state) {
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();

      if (!state.streakData) {
        state.streakData = {
          lastActiveDate: today,
          streakCount: 1,
        };
        return;
      }

      if (state.streakData.lastActiveDate === today) {
        // Already logged in today, do nothing
        return;
      } else if (state.streakData.lastActiveDate === yesterday) {
        // Consecutive day, increment streak
        state.streakData.streakCount += 1;
        state.streakData.lastActiveDate = today;
      } else {
        // Streak broken, reset to 1
        state.streakData.streakCount = 1;
        state.streakData.lastActiveDate = today;
      }
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

export const { addItem, loginByPhone, logout, setCurrentUser, createUser, toggleFavorite, updateImpactNudgeShown, addToSearchHistory, clearSearchHistory, markOnboardingSeen, updateStreak } = appSlice.actions;
export { initialState as appInitialState };
export default appSlice.reducer;
