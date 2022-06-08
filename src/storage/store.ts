import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import todosReducer from "./todosSlice";
import { loadState, saveState } from "./localStorage";

const combinedReducers = combineReducers({
  todos: todosReducer,
  /* Not vital for our case, but we keep it for future extending & transparency. */
});

export const store = configureStore({
  devTools: true,
  reducer: combinedReducers,
  preloadedState: loadState(),
});


store.subscribe(() => {
  /* TODO: Debounce in case of intensive I/O. */
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;