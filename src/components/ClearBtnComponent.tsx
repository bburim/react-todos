import React from 'react'
import { useSelector } from "react-redux"
import { deleteTodo as deleteAction, selectTodos } from "../storage/todosSlice"
import { useAppDispatch } from "../storage/hooks";

const ClearBtnComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useSelector(selectTodos);
  let countCompleted = items.filter(item => item.completed).length;
  const handleClick = () => {
    items.forEach((item) => {
      if (typeof item.id !== "number") return;
      if (item.completed) {
        dispatch(deleteAction(item.id));
      }
    });
  };
  if (countCompleted === 0) {
    return <React.Fragment />
  }
  return (
    <button className="btn btn-link" onClick={handleClick}>Clean completed</button>
  );
};

export default ClearBtnComponent;