import React, {
  useState,
  useEffect,
  useRef
} from 'react'
import { useAppDispatch } from "../storage/hooks";
import {
  deleteTodo as deleteAction,
  toggleTodoCompleted as toggleAction,
  renameTodo as renameAction,
} from "../storage/todosSlice";
import { ITodo } from "../types/ITodo";

interface Props {
  todo: ITodo;
}

const TodosListItemComponent: React.FC<Props> = ({ todo }) => {
  let itemClassName: string = "list-group-item justify-content-between align-items-start ";
  const [value, setValue] = useState("");
  const [hovered, setHovered] = useState(false);
  const [doubleClicked, setDoubleClicked] = useState(false);
  const dispatch = useAppDispatch();
  const inputReference = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setValue(todo.title);
    inputReference.current?.focus();
  }, [doubleClicked, todo.title]);
  const handleValueEditDone = () => {
    setDoubleClicked(false);
    if (typeof todo.id !== "number") return;
    if (value === "") {
      dispatch(deleteAction(todo.id));
      return;
    }
    dispatch(renameAction({
      ...todo,
      title: value.trim(),
    }));
  };
  const handleClickDelete = () => {
    if (typeof todo.id !== "number") return;
    dispatch(deleteAction(todo.id));
  };
  const handleClickEdit = (e: React.MouseEvent<HTMLElement>) => {
    switch (e.detail) {
      case 2:
        setDoubleClicked(true);
        break;
    }
  };
  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Escape") {
      setDoubleClicked(false);
    }
  };
  const handleEditKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      handleValueEditDone();
    }
  };
  const toggleDone = () => {
    if (typeof todo.id !== "number") return;
    dispatch(toggleAction(todo.id));
  };
  if (doubleClicked) {
    itemClassName += ' editing';
  }
  if (hovered) {
    itemClassName += ' hover destroy';
  }
  if (todo.completed) {
    itemClassName += ' completed';
  } else {
    itemClassName += ' pending';
  }
  const handleMouseOver = (): void => {
    setHovered(true);
  }
  const handleMouseOut = (): void => {
    setHovered(false);
  }
  const handleEditBlur = (): void => {
    handleValueEditDone();
  }
  const handleEditChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setValue(e.currentTarget.value);
  }
  const displayTitle = !doubleClicked
    ? <div className="todo-name mb-2" onClick={handleClickEdit}>{todo.title}</div>
    : <input
        type="text"
        className="form-control"
        ref={inputReference}
        onKeyPress={handleEditKeyPress}
        onKeyDown={handleEditKeyDown}
        onBlur={handleEditBlur}
        onChange={handleEditChange}
        value={value}
      />
  return (
    <li
      className={itemClassName}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className="row">
        <div className="col-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={toggleDone}
          />
        </div>
        <div className="col-8">
          {displayTitle}
        </div>
        <div className="col-3 text-end">
          <button className="btn btn-danger btn-sm" onClick={handleClickDelete}>
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodosListItemComponent;