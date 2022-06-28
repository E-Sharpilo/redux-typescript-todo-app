import React, { useCallback, useEffect, useRef, useState } from "react";
import { Task } from "../../types/task";
import classNames from 'classnames';
import { useAppDispatch } from "../../store";
import { changeTitleTask, deleteTask, toggleStatus } from "../../api/api";

const TodoItem: React.FC<Task> = ({ title, completed, id }) => {
  const [newTitle, setNewTitle] = useState(title)
  const [isEditing, setIsEditing] = useState(false)
  const inputElement = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()


  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus()
    }
  })


  const handleCheck = useCallback(() => {
    dispatch(toggleStatus(id))
  }, [dispatch, id])

  const handleDelete = useCallback(() => {
    dispatch(deleteTask(id))
  }, [dispatch, id])

  const changeTitleEnter = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      dispatch(changeTitleTask({
        id,
        title: newTitle
      }))
      setIsEditing(false)
    }
  }, [dispatch, id, newTitle])

  const changeTitleOnBlur = useCallback(() => {
    dispatch(changeTitleTask({
      id,
      title: newTitle
    }))
    setIsEditing(false)
  }, [dispatch, id, newTitle])

  const handleDblClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    setIsEditing(true);
  }, [])


  const handleNewTitle = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setNewTitle(event.currentTarget.value)
  }, [])



  return (
    (isEditing) ? (
      <li
        className={classNames({
          'editing': isEditing,
        })}
        onDoubleClick={handleDblClick}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={completed}
            onChange={handleCheck}
          />
          <label>
            {title}
            <input
              hidden
            />
          </label>
          <button
            type="button"
            className="destroy"
            onClick={handleDelete}
          ></button>
        </div>
        <input
          ref={inputElement}
          value={newTitle || title}
          onChange={handleNewTitle}
          onKeyDown={changeTitleEnter}
          onBlur={changeTitleOnBlur}
          type="text"
          className="edit"
        />
      </li>
    ) : (
      <li
        className={classNames({
          'completed': completed,
        })}
        onDoubleClick={handleDblClick}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={completed}
            onChange={handleCheck}
          />
          <label>
            {title}
            <input
              hidden
            />
          </label>
          <button
            type="button"
            className="destroy"
            onClick={handleDelete}
          ></button>
        </div>
      </li>
    )
  )
}

export default React.memo(TodoItem)
