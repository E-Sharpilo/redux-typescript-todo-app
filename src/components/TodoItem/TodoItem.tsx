import React from "react";

export const TodoItem: React.FC<Todo> = ({ title, isCompleted, id }) => {
  return (
    <li
      className={isCompleted ? 'completed' : ''}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          readOnly
          checked={isCompleted} />
        <label htmlFor={id}>
          {title}
          <input hidden />
        </label>
        <button
          type="button"
          className="destroy"
        ></button>
      </div>
      <input
        type="text"
        className="edit"
      />
    </li>
  )
}