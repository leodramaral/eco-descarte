import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import { createSeedState, type AppDataState } from "../data/mockData";

const STORAGE_KEY = "recolhe-ai-redux";
const LEGACY_STORAGE_KEY = "eco-descarte-redux";

type PersistedState = {
  appData: Omit<AppDataState, "appInitialized"> & Partial<Pick<AppDataState, "appInitialized">>;
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

function migratePersistedState(state: PersistedState): { appData: AppDataState } {
  const isLegacyState = typeof state.appData.appInitialized !== "boolean";

  return {
    appData: {
      ...state.appData,
      appInitialized: true,
      currentUserId: isLegacyState ? null : state.appData.currentUserId,
    },
  };
}

function saveState(state: { appData: AppDataState }) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function readStoredState(key: string): { appData: AppDataState } | undefined {
  const storedState = window.localStorage.getItem(key);

  if (!storedState) {
    return undefined;
  }

  const parsedState = JSON.parse(storedState);

  if (!isValidPersistedState(parsedState)) {
    return undefined;
  }

  return migratePersistedState(parsedState);
}

function loadState(): { appData: AppDataState } | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const currentState = readStoredState(STORAGE_KEY);

    if (currentState) {
      return currentState;
    }

    const legacyState = readStoredState(LEGACY_STORAGE_KEY);

    if (legacyState) {
      saveState(legacyState);
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
      return legacyState;
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
