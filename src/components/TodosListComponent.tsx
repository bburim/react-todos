import React from 'react'
import { useSelector } from "react-redux";
import { selectTodos } from "../storage/todosSlice";
import TodosListItemComponent from "./TodosListItemComponent";

interface Props {
  filter?: string;
}

const TodosListComponent: React.FC<Props> = ({ filter = 'all' }) => {
  const todos = useSelector(selectTodos);
  const filtered = todos.filter(function(obj) {
    return (obj.completed && filter === 'completed')
      || (filter === 'active' && !obj.completed)
      || filter === 'all';
  });
  if (todos.length === 0) {
      return <div className="card text-center pt-5 pb-5">No tasks yet...</div>
  }
  const renderTodos = filtered.map((todo) => (
    <TodosListItemComponent key={todo.id} todo={todo}></TodosListItemComponent>
  ));
  return (
    <div className="card mb-5" id="main">
      <div className="card-header">
        What needs to be done?
      </div>
      <ul className="list-group" id="todoList">
        {renderTodos}
      </ul>
    </div>
  );
};

export default TodosListComponent;