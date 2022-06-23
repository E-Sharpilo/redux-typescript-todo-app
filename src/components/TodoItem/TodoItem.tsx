import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setCheck, deleteTodo, changeTitleTodo } from "../../reducers/todosSlice";
import { Todo } from "../../interfaces/todos";
import classNames from 'classnames';

export const TodoItem: React.FC<Todo> = ({ title, isCompleted, id }) => {
  const [newTitle, setNewTitle] = useState(title)
  const [isEditing, setIsEditing] = useState('0')
  const inputElement = useRef<HTMLInputElement>(null)


  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus()
    }
  })

  const dispatch = useDispatch()
  const handleCheck = useCallback(() => {
    dispatch(setCheck(id))
  }, [dispatch, id])

  const handleDelete = useCallback(() => {
    dispatch(deleteTodo(id))
  }, [dispatch, id])

  const changeTitleEnter = (event: React.KeyboardEvent, todoId: string) => {
    if (event.key === 'Enter') {
      dispatch(changeTitleTodo({
        id: todoId,
        title: newTitle
      }))
      setIsEditing('0')
    }
  };

  const changeTitleOnBlur = (todoId: string) => {
    dispatch(changeTitleTodo({
      id: todoId,
      title: newTitle
    }))
    setIsEditing('0')
  }



  return (
    <li
      className={classNames({
        'completed': isCompleted,
        'editing': isEditing === id,
      })}
      onDoubleClick={(event) => {
        event.preventDefault();
        setIsEditing(id);
      }}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={isCompleted}
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
        onChange={(e) => setNewTitle(e.target.value)}
        onKeyDown={(e) => changeTitleEnter(e, id)}
        onBlur={() => { changeTitleOnBlur(id) }}
        type="text"
        className="edit"
      />
    </li>
  )
}
