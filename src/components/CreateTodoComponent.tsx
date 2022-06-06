import React from 'react'
import { FormEventHandler, useState } from "react";
import { useAppDispatch } from "../storage/hooks";
import { createTodo } from "../storage/todosSlice";

interface State {
  title: string;
}

const initialState: State = {
    title: "",
}

const CreateTodoComponent: React.FC = () => {
  const [state, setState] = useState<State>(initialState);
  const dispatch = useAppDispatch();
  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    state.title = state.title.trim();

    if (state.title === "") {
      return;
    }
    dispatch(
      createTodo({
        ...state,
        completed: false
      })
    );
    setState({
      ...state,
      title: "",
    });
  };
  const handleChange = async (e: any) => {
    setState({
      ...state,
      title: e.target.value,
    });
  };
  return (
    <div className="mb-3">
      <form onSubmit={submit}>
        <input
          id="todo-name"
          type="text"
          placeholder="Enter task name"
          className="form-control"
          required={true}
          autoFocus={true}
          value={state.title}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default CreateTodoComponent;