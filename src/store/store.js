import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./transactionsSlice";
import userReducer from "./userSlice";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("aeroState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("aeroState", serializedState);
  } catch (err) {
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    user: userReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    transactions: store.getState().transactions,
    user: store.getState().user,
  });
});
