import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { debounce } from "debounce";
import todosReducer from "./todosSlice";
import { loadState, saveState } from "./localStorage";

const WRITE_FREQ_MS = 800;

const reducers = combineReducers({
  todos: todosReducer,
});

export const store = configureStore({
  devTools: true,
  reducer: reducers,
  preloadedState: loadState(),
});

store.subscribe(
  debounce(() => {
    saveState(store.getState());
  }, WRITE_FREQ_MS)
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;