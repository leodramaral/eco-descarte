import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import { createSeedState, type AppDataState } from "../data/mockData";

const STORAGE_KEY = "eco-descarte-redux";

type PersistedState = {
  appData: AppDataState;
};

function isValidPersistedState(value: unknown): value is PersistedState {
  if (!value || typeof value !== "object") {
    return false;
  }

  const appData = (value as PersistedState).appData;

  return (
    !!appData &&
    Array.isArray(appData.items) &&
    Array.isArray(appData.users) &&
    (typeof appData.currentUserId === "string" || appData.currentUserId === null)
  );
}

function saveState(state: PersistedState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState(): PersistedState | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const storedState = window.localStorage.getItem(STORAGE_KEY);

    if (storedState) {
      const parsedState = JSON.parse(storedState);

      if (isValidPersistedState(parsedState)) {
        return parsedState;
      }
    }
  } catch (error) {
    console.warn("Nao foi possivel carregar o estado persistido.", error);
  }

  const seedState = { appData: createSeedState() };
  saveState(seedState);
  return seedState;
}

export const store = configureStore({
  reducer: {
    appData: appReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState({ appData: store.getState().appData });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
