import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ITodosState } from "../types/ITodosState";
import { ITodo } from "../types/ITodo";

const initialState: ITodosState = {
  todos: [],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    createTodo: (state, action: PayloadAction<ITodo>) => {
      let id = state.todos.length;
      state.todos.forEach((todo) => {
        if (typeof todo.id !== "undefined" && todo.id >= id) {
          id = todo.id + 1;
        }
      });
      state.todos.push({ ...action.payload, id });
    },
    deleteTodo: (
      state,
      action: PayloadAction<Exclude<ITodo["id"], undefined>>
    ) => {
      state.todos.forEach((todo, idx) => {
        if (todo.id === action.payload) {
          state.todos.splice(idx, 1);
        }
      });
    },
    toggleTodoCompleted: (
      state,
      action: PayloadAction<Exclude<ITodo["id"], undefined>>
    ) => {
      state.todos.forEach((todo, idx) => {
        if (todo.id === action.payload) {
          state.todos[idx].completed = !state.todos[idx].completed;
        }
      });
    },
    renameTodo: (
      state,
      action: PayloadAction<ITodo>
    ) => {
      state.todos.forEach((todo, idx) => {
        if (todo.id === action.payload.id) {
          state.todos[idx].title = action.payload.title;
        }
      });
    },
  },
});

export const { createTodo, deleteTodo, toggleTodoCompleted, renameTodo } = todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos.todos;

export default todosSlice.reducer;