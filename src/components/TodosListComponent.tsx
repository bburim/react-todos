import React, {ChangeEvent} from 'react'
import { useSelector } from "react-redux";
import { useAppDispatch } from "../storage/hooks";
import {
  selectTodos,
  setTodoCompleted as setCompletedAction,
  setTodoPending as setPendingAction
} from "../storage/todosSlice";
import TodosListItemComponent from "./TodosListItemComponent";
import { ListFilter } from "../types/ListFilter";

interface Props {
  filter?: ListFilter;
}

const TodosListComponent: React.FC<Props> = ({ filter = ListFilter.All }) => {
  const todos = useSelector(selectTodos);
  const dispatch = useAppDispatch();
  const filtered = todos.filter(function(obj) {
    return (obj.completed && filter === ListFilter.Completed)
      || (filter === ListFilter.Active && !obj.completed)
      || filter === ListFilter.All;
  });
  const toggleAllCompleted = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      filtered.forEach(function (todo) {
        dispatch(setCompletedAction(todo.id))
      })
    } else {
      filtered.forEach(function (todo) {
        dispatch(setPendingAction(todo.id))
      })
    }
  };
  if (todos.length === 0) {
    return <div className="card text-center pt-5 pb-5">No tasks yet...</div>
  }
  const renderTodos = filtered.map((todo) => (
    <TodosListItemComponent key={todo.id} todo={todo}></TodosListItemComponent>
  ));
  return (
    <div className="card mb-5" id="main">
      <div className="card-header">
        <div className="row">
          <div className="col-1">
            <input
              type="checkbox"
              onChange={toggleAllCompleted}
            />
          </div>
          <div className="col-11">
            What needs to be done?
          </div>
        </div>
      </div>
      <ul className="list-group" id="todoList">
        {renderTodos}
      </ul>
    </div>
  );
};

export default TodosListComponent;