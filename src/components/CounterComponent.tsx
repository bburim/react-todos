import React from 'react'
import { useSelector } from "react-redux"
import { selectTodos } from "../storage/todosSlice"

const CounterComponent: React.FC = () => {
  const todos = useSelector(selectTodos);
  let countPending = todos.filter(item => !item.completed).length;
  return (
    <div>
      {countPending} {countPending === 1 ? 'item' : 'items'} left
    </div>
  );
};

export default CounterComponent;