import React from "react";
import { useDispatch } from "react-redux";
import { setCheck, deleteTodo } from "../../reducers/todosSlice";

export const TodoItem: React.FC<Todo> = ({ title, isCompleted, id }) => {
  const dispatch = useDispatch()
  const handleCheck = () => {
    dispatch(setCheck(id))
  }

  const handleDelete = () => {
    dispatch(deleteTodo(id))
  }

  return (
    <li
      className={isCompleted ? 'completed' : ''}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={isCompleted}
          onChange={handleCheck}

        />
        <label htmlFor={id}>
          {title}
          <input hidden />
        </label>
        <button
          type="button"
          className="destroy"
          onClick={handleDelete}
        ></button>
      </div>
      <input
        type="text"
        className="edit"
      />
    </li>
  )
}